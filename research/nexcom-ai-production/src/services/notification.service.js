const { Resend } = require('resend');

class NotificationService {
  constructor() {
    if (process.env.RESEND_API_KEY) {
      this.resend = new Resend(process.env.RESEND_API_KEY);
      console.log('✅ Resend email configured');
    } else {
      console.warn('⚠️ RESEND_API_KEY not set — emails disabled');
    }
  }

  /**
   * Send lead notification to business owner
   */
  async notifyBusinessOwner(email, data) {
    if (!this.resend) {
      console.warn('⚠️ Email service not configured');
      return false;
    }

    try {
      const { error } = await this.resend.emails.send({
        from: 'NexcomAI <onboarding@resend.dev>',
        to: email,
        subject: `🔥 NEW LEAD: ${data.visitorName}`,
        html: `
          <h2>🔥 New Lead from NexcomAI!</h2>

          <div style="background:#fff3cd;padding:15px;border-left:4px solid #ffc107;border-radius:4px;">
            <h3 style="margin-top:0">${data.visitorName}</h3>
            <p><strong>Business:</strong> ${data.visitorBusiness || '—'}</p>
            <p><strong>Phone:</strong> ${data.visitorPhone || '—'}</p>
            <p><strong>Email:</strong> ${data.visitorEmail || '—'}</p>
            <p><strong>Demo Time:</strong> ${data.preferredTime || '—'}</p>
          </div>

          <p style="margin-top:20px"><strong>📞 Call them back ASAP to close the deal!</strong></p>

          <hr>
          <p style="font-size:12px;color:#999">NexcomAI · nexcomai.ai</p>
        `
      });

      if (error) {
        console.error('❌ Resend error:', error);
        return false;
      }

      console.log('✅ Lead notification sent via Resend');
      return true;
    } catch (err) {
      console.error('❌ Email error:', err.message);
      return false;
    }
  }

  /**
   * Send appointment confirmation to visitor
   */
  async sendAppointmentConfirmation(email, data) {
    if (!this.resend) {
      console.warn('⚠️ Email service not configured');
      return false;
    }

    try {
      const { error } = await this.resend.emails.send({
        from: 'NexcomAI <onboarding@resend.dev>',
        to: email,
        subject: `✅ Demo Confirmed: ${data.appointmentTime}`,
        html: `
          <h2>✅ Your Demo is Confirmed!</h2>
          <p>Hi ${data.visitorName},</p>
          <p>Your NexcomAI demo has been scheduled.</p>

          <div style="background:#f5f5f5;padding:20px;border-radius:8px;">
            <p><strong>📅 Date & Time:</strong> ${data.appointmentTime}</p>
            <p><strong>📞 We'll call:</strong> ${data.callbackPhone}</p>
          </div>

          <p>Looking forward to showing you what NexcomAI can do!</p>
          <hr>
          <p style="font-size:12px;color:#999">NexcomAI · nexcomai.ai</p>
        `
      });

      if (error) {
        console.error('❌ Resend error:', error);
        return false;
      }

      console.log('✅ Confirmation email sent via Resend');
      return true;
    } catch (err) {
      console.error('❌ Email error:', err.message);
      return false;
    }
  }
}

module.exports = new NotificationService();
