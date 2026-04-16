const { google } = require('googleapis');
const path = require('path');

class CalendarService {
  constructor() {
    this.calendarId = process.env.GOOGLE_CALENDAR_ID || 'jordanhd@gmail.com';
    this.serviceAccountPath = process.env.GOOGLE_SERVICE_ACCOUNT_JSON || './config/service-account.json';
  }

  async getAuth() {
    try {
      const auth = new google.auth.GoogleAuth({
        keyFile: path.resolve(this.serviceAccountPath),
        scopes: ['https://www.googleapis.com/auth/calendar']
      });
      return auth;
    } catch (error) {
      console.error('❌ Calendar auth error:', error.message);
      return null;
    }
  }

  /**
   * Create a demo booking event on Google Calendar
   */
  async createDemoBooking(data) {
    try {
      const auth = await this.getAuth();
      if (!auth) return false;

      const calendar = google.calendar({ version: 'v3', auth });

      // Schedule for next business day at 10am EST
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(10, 0, 0, 0);

      const endTime = new Date(tomorrow);
      endTime.setMinutes(endTime.getMinutes() + 30);

      const event = {
        summary: `NexcomAI Demo - ${data.name} (${data.business || data.businessType})`,
        description: `
Demo Request from Website

Name: ${data.name}
Business: ${data.business || '—'}
Type: ${data.businessType || '—'}
Phone: ${data.phone}
Packages Interested: ${(data.packages || []).join(', ') || 'TBD'}

Action: Call ${data.phone} to confirm demo time and details.
        `.trim(),
        start: {
          dateTime: tomorrow.toISOString(),
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

      console.log(`✅ Calendar event created: ${response.data.htmlLink}`);
      return response.data;
    } catch (error) {
      console.error('❌ Calendar error:', error.message);
      return false;
    }
  }
}

module.exports = new CalendarService();
