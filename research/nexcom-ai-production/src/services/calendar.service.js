const { google } = require('googleapis');
const path = require('path');

class CalendarService {
  constructor() {
    this.calendarId = process.env.GOOGLE_CALENDAR_ID || 'jordanhd@gmail.com';
    this.serviceAccountPath = process.env.GOOGLE_SERVICE_ACCOUNT_JSON || './config/service-account.json';
    this.auth = null;
  }

  async getAuth() {
    if (this.auth) return this.auth;
    try {
      // Try JSON string from env var first (for Render)
      const jsonEnv = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
      let credentials;
      if (jsonEnv && jsonEnv.startsWith('{')) {
        credentials = JSON.parse(jsonEnv);
      } else {
        // Fall back to file path
        const fs = require('fs');
        const filePath = path.resolve(jsonEnv || './config/service-account.json');
        credentials = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      }
      this.auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/calendar']
      });
      return this.auth;
    } catch (error) {
      console.error('❌ Calendar auth error:', error.message);
      return null;
    }
  }

  /**
   * Get available slots for a given date
   * Returns array of available 30-min slots between 9am-5pm
   */
  async getAvailableSlots(dateStr) {
    try {
      const auth = await this.getAuth();
      if (!auth) return null;

      const calendar = google.calendar({ version: 'v3', auth });

      // Parse the date
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        // Try natural language parsing
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        date.setTime(tomorrow.getTime());
      }

      // Set to start of business day (9am EST)
      const startOfDay = new Date(date);
      startOfDay.setHours(9, 0, 0, 0);

      // Set to end of business day (5pm EST)
      const endOfDay = new Date(date);
      endOfDay.setHours(17, 0, 0, 0);

      // Get existing events for that day
      const response = await calendar.events.list({
        calendarId: this.calendarId,
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        singleEvents: true,
        orderBy: 'startTime'
      });

      const events = response.data.items || [];
      const busySlots = events.map(e => ({
        start: new Date(e.start.dateTime || e.start.date),
        end: new Date(e.end.dateTime || e.end.date)
      }));

      // Generate 30-min slots from 9am to 5pm
      const availableSlots = [];
      let current = new Date(startOfDay);

      while (current < endOfDay) {
        const slotEnd = new Date(current.getTime() + 30 * 60000);
        const isBusy = busySlots.some(b => 
          (current >= b.start && current < b.end) ||
          (slotEnd > b.start && slotEnd <= b.end)
        );

        if (!isBusy) {
          const hours = current.getHours();
          const mins = current.getMinutes();
          const ampm = hours >= 12 ? 'pm' : 'am';
          const displayHour = hours > 12 ? hours - 12 : hours;
          const displayMins = mins === 0 ? '' : `:${mins}`;
          availableSlots.push({
            time: `${displayHour}${displayMins}${ampm}`,
            dateTime: new Date(current)
          });
        }

        current = slotEnd;
      }

      return availableSlots.slice(0, 5); // Return first 5 available slots
    } catch (error) {
      console.error('❌ Calendar availability error:', error.message);
      return null;
    }
  }

  /**
   * Book a demo appointment
   */
  async bookAppointment(data) {
    try {
      const auth = await this.getAuth();
      if (!auth) return false;

      const calendar = google.calendar({ version: 'v3', auth });

      const startTime = new Date(data.dateTime);
      const endTime = new Date(startTime.getTime() + 30 * 60000);

      const event = {
        summary: `NexcomAI Demo - ${data.name} (${data.business})`,
        description: `
Demo Call

Name: ${data.name}
Business: ${data.business}
Phone: ${data.phone}
Interested in: ${data.packages || 'TBD'}

ACTION: Call ${data.phone} at the scheduled time.
        `.trim(),
        start: {
          dateTime: startTime.toISOString(),
          timeZone: 'America/New_York'
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: 'America/New_York'
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'popup', minutes: 60 },
            { method: 'popup', minutes: 15 }
          ]
        }
      };

      const response = await calendar.events.insert({
        calendarId: this.calendarId,
        resource: event
      });

      console.log(`✅ Demo booked: ${response.data.htmlLink}`);
      return response.data;
    } catch (error) {
      console.error('❌ Booking error:', error.message);
      return false;
    }
  }

  /**
   * Create a simple booking (without availability check)
   */
  async createDemoBooking(data) {
    return this.bookAppointment(data);
  }
}

module.exports = new CalendarService();
