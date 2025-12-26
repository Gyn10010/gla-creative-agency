# GLA Backend Server

Backend API server for the GLA Creative Agency website.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env` with your actual configuration:

```env
# Server
PORT=5000
NODE_ENV=development

# Email (Gmail example)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_FROM=noreply@gla-design.com
EMAIL_TO=contato@gla-design.com

# Google GenAI
GOOGLE_GENAI_API_KEY=your-api-key-here

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

#### Gmail Setup

To use Gmail for sending emails:
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an "App Password" for this application
4. Use that app password in `EMAIL_PASS`

### 3. Start the Server

```bash
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Health Check
```
GET /health
```
Returns server status

### Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "service": "Web Development",
  "message": "Olá, gostaria de um orçamento..."
}
```

### AI Consultant
```
POST /api/ai/chat
Content-Type: application/json

{
  "message": "Quais serviços vocês oferecem?",
  "lang": "PT"
}
```

### Contact Stats (Optional)
```
GET /api/contact/stats
```
Returns contact form statistics

## 🗄️ Database

The server uses SQLite for data storage. The database file is created automatically at:
```
server/database/contacts.db
```

### Schema

**contacts** table:
- `id` - Auto-increment primary key
- `name` - Contact name
- `email` - Contact email
- `service` - Service of interest
- `message` - Contact message
- `created_at` - Timestamp
- `ip_address` - Client IP
- `user_agent` - Client user agent

## 🔧 Development

### Run with auto-reload
```bash
npm run dev
```

### Project Structure
```
server/
├── index.js              # Main server file
├── package.json          # Dependencies
├── .env.example          # Environment template
├── database/
│   └── init.js          # Database initialization
├── routes/
│   ├── contact.js       # Contact form endpoints
│   └── ai.js            # AI consultant endpoints
└── services/
    └── email.js         # Email service
```

## 🚢 Production Deployment

### Environment Variables

Make sure to set these in your production environment:
- `NODE_ENV=production`
- `PORT` (if different from 5000)
- `FRONTEND_URL` (your production frontend URL)
- All email credentials
- `GOOGLE_GENAI_API_KEY`

### Build & Run

```bash
# Install dependencies
cd server
npm install --production

# Start server
npm start
```

### Recommended Hosting

- **Vercel** - Easy deployment for Node.js
- **Railway** - Simple deployment with database support
- **Heroku** - Classic PaaS option
- **DigitalOcean App Platform** - Full control

## 🔒 Security Notes

- Never commit `.env` file to git
- Use environment variables for all sensitive data
- Keep your API keys secure
- Enable CORS only for your frontend domain in production
- Consider rate limiting for production

## 📝 Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | `5000` |
| `NODE_ENV` | Environment | No | `development` |
| `EMAIL_SERVICE` | Email provider | Yes | `gmail` |
| `EMAIL_USER` | Email username | Yes | `user@gmail.com` |
| `EMAIL_PASS` | Email password | Yes | `app-password` |
| `EMAIL_FROM` | From address | Yes | `noreply@gla.com` |
| `EMAIL_TO` | Recipient address | Yes | `contact@gla.com` |
| `GOOGLE_GENAI_API_KEY` | GenAI API key | Yes | `AIza...` |
| `FRONTEND_URL` | Frontend URL | Yes | `http://localhost:3000` |
| `DATABASE_PATH` | Database path | No | `./database/contacts.db` |

## 🆘 Troubleshooting

### Email not sending
- Check your email credentials
- For Gmail, make sure you're using an App Password, not your regular password
- Check spam folder

### Database errors
- Make sure `server/database/` directory exists
- Check file permissions

### CORS errors
- Verify `FRONTEND_URL` matches your frontend URL exactly
- Check browser console for specific CORS error messages

### AI Consultant not working
- Verify `GOOGLE_GENAI_API_KEY` is set correctly
- Check API key has proper permissions
- Review server logs for specific error messages

## 📞 Support

For issues or questions, contact the GLA team.
