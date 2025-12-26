import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create email transporter
const createTransporter = () => {
    if (process.env.EMAIL_SERVICE === 'sendgrid') {
        return nodemailer.createTransport({
            service: 'SendGrid',
            auth: {
                user: 'apikey',
                pass: process.env.SENDGRID_API_KEY
            }
        });
    } else {
        // Default to Gmail or other SMTP
        return nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }
};

const transporter = createTransporter();

/**
 * Send contact form notification email
 * @param {Object} contactData - Contact form data
 * @returns {Promise} - Email send result
 */
export const sendContactNotification = async (contactData) => {
    const { name, email, service, message } = contactData;

    const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@gla-design.com',
        to: process.env.EMAIL_TO || 'contato@gla-design.com',
        subject: `🚀 Novo Contato GLA - ${service}`,
        html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Arial', sans-serif; background-color: #181611; color: #ffffff; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #232018; border: 1px solid #393528; border-radius: 12px; padding: 30px; }
          .header { background-color: #ecb613; color: #181611; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px; }
          .header h1 { margin: 0; font-size: 24px; font-weight: bold; }
          .field { margin-bottom: 20px; }
          .label { color: #ecb613; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
          .value { color: #ffffff; font-size: 16px; padding: 10px; background-color: #181611; border-radius: 6px; }
          .message-box { background-color: #181611; padding: 15px; border-radius: 6px; border-left: 4px solid #ecb613; }
          .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✨ Novo Contato Recebido</h1>
          </div>
          
          <div class="field">
            <div class="label">Nome</div>
            <div class="value">${name}</div>
          </div>
          
          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${email}" style="color: #ecb613; text-decoration: none;">${email}</a></div>
          </div>
          
          <div class="field">
            <div class="label">Serviço de Interesse</div>
            <div class="value">${service}</div>
          </div>
          
          <div class="field">
            <div class="label">Mensagem</div>
            <div class="message-box">${message}</div>
          </div>
          
          <div class="footer">
            <p>GLA - Design Futurista, Estratégia Real</p>
            <p>São Paulo, Brasil</p>
          </div>
        </div>
      </body>
      </html>
    `,
        text: `
      Novo Contato GLA
      
      Nome: ${name}
      Email: ${email}
      Serviço: ${service}
      
      Mensagem:
      ${message}
    `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Email error:', error);
        throw error;
    }
};

export default { sendContactNotification };
