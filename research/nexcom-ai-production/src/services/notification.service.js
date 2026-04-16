const axios = require('axios');
const nodemailer = require('nodemailer');

class NotificationService {
  constructor() {
    this.discordWebhook = process.env.DISCORD_WEBHOOK;
    this.setupEmail();
  }

  /**
   * Setup email transporter (SendGrid or SMTP)
   */
  setupEmail() {
    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      // Gmail SMTP
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
        }
      });
      this.fromEmail = process.env.GMAIL_USER;
      console.log('✅ Gmail email configured');
    } else if (process.env.SENDGRID_API_KEY) {
      // SendGrid fallback
      this.transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        auth: {
          user: 'apikey',
          pass: process.env.SENDGRID_API_KEY
        }
      });
      this.fromEmail = 'noreply@nexcomai.ai';
    } else {
      console.warn('⚠️ No email service configured');
    }
  }

  /**
   * Send Discord notification
   */
  async notifyDiscord(data) {
    if (!this.discordWebhook) return;

    try {
      const platformEmoji = {
        sms: '📱',
        whatsapp: '📲',
        facebook: '💬',
        telegram: '✈️'
      }[data.type] || '💬';

      const embed = {
        title: `🔥 NEW MESSAGE via ${platformEmoji} ${data.type.toUpperCase()}`,
        color: 5814783,
        fields: [
          {
            name: 'From',
            value: data.from || data.visitorPhone || '—',
            inline: true
          },
          {
            name: 'Message',
            value: data.message || '—',
            inline: false
          },
          {
            name: 'AI Response',
            value: data.response ? data.response.substring(0, 200) + '...' : '—',
            inline: false
          },
          {
            name: 'Conversation ID',
            value: `\`${data.conversationId}\``,
            inline: true
          }
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: 'NexcomAI Notifications'
        }
      };

      await axios.post(this.discordWebhook, {
        username: '🤖 NexcomAI',
        embeds: [embed]
      });

      console.log(`✅ Discord notified`);
    } catch (error) {
      console.error('❌ Discord notification error:', error.message);
    }
  }

  /**
   * Send appointment confirmation email
   */
  async sendAppointmentConfirmation(email, data) {
    if (!this.transporter) {
      console.warn('⚠️ Email service not configured');
      return false;
    }

    try {
      const mailOptions = {
        from: this.fromEmail || 'nexcomaiai@gmail.com',
        to: email,
        subject: `Appointment Confirmed: ${data.businessName}`,
        html: `
          <h2>✅ Your Appointment is Confirmed!</h2>
          <p>Hi ${data.visitorName},</p>
          <p>Your appointment with <strong>${data.businessName}</strong> has been scheduled.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
            <p><strong>📅 Date & Time:</strong> ${data.appointmentTime}</p>
            <p><strong>⏱️ Duration:</strong> ${data.duration} minutes</p>
            <p><strong>📞 Callback:</strong> ${data.callbackPhone}</p>
          </div>

          <p>If you need to reschedule or cancel, reply to this email.</p>
          <p>Looking forward to speaking with you!</p>
          
          <hr>
          <p style="font-size: 12px; color: #999;">
            Powered by NexcomAI | nexcomai.ai
          </p>
        `
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Confirmation email sent: ${info.response}`);
      return true;
    } catch (error) {
      console.error('❌ Email error:', error.message);
      return false;
    }
  }

  /**
   * Send lead notification to business owner
   */
  async notifyBusinessOwner(email, data) {
    if (!this.transporter) {
      console.warn('⚠️ Email service not configured');
      return false;
    }

    try {
      const mailOptions = {
        from: this.fromEmail || 'nexcomaiai@gmail.com',
        to: email,
        subject: `🔥 NEW LEAD: ${data.visitorName}`,
        html: `
          <h2>New Lead Received!</h2>
          
          <div style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107;">
            <h3 style="margin-top: 0;">${data.visitorName}</h3>
            <p><strong>Business:</strong> ${data.visitorBusiness || '—'}</p>
            <p><strong>Phone:</strong> ${data.visitorPhone || '—'}</p>
            <p><strong>Email:</strong> ${data.visitorEmail || '—'}</p>
            <p><strong>Preferred Time:</strong> ${data.preferredTime || '—'}</p>
          </div>

          <p>Call them back ASAP to close the deal!</p>
          
          <hr>
          <p style="font-size: 12px; color: #999;">
            NexcomAI Dashboard | nexcomai.ai
          </p>
        `
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Owner notification sent: ${info.response}`);
      return true;
    } catch (error) {
      console.error('❌ Email error:', error.message);
      return false;
    }
  }
}

module.exports = new NotificationService();
