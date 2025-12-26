<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# GLA - Creative & Technology Agency Website

Modern, futuristic website for GLA creative agency featuring AI consultant, contact forms, and dynamic animations.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to `http://localhost:3000`

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your credentials:
   - Email service configuration (Gmail/SendGrid)
   - Google GenAI API key
   - Frontend URL

4. **Start backend server:**
   ```bash
   npm start
   ```

   Server runs on `http://localhost:5000`

## 📁 Project Structure

```
gla---creative-&-technology-agency/
├── components/          # React components
│   ├── Hero.tsx        # Hero section with video background
│   ├── Contact.tsx     # Contact form
│   ├── AIConsultant.tsx # AI chat consultant
│   └── ...
├── server/             # Backend API
│   ├── index.js        # Express server
│   ├── routes/         # API endpoints
│   ├── services/       # Email service
│   └── database/       # SQLite database
├── public/             # Static assets
└── package.json        # Frontend dependencies
```

## 🔧 Features

- ✨ **Dynamic Animations** - Particle system with mouse interaction
- 🎬 **Video Background** - Customizable hero video
- 🤖 **AI Consultant** - Powered by Google GenAI
- 📧 **Contact Form** - With email notifications
- 🌐 **Bilingual** - Portuguese and English support
- 📱 **Responsive** - Mobile-first design

## 🌐 API Endpoints

See [server/README.md](server/README.md) for complete API documentation.

- `POST /api/contact` - Submit contact form
- `POST /api/ai/chat` - AI consultant chat
- `GET /health` - Server health check

## 🚢 Deployment

### Frontend (Vercel/Netlify)

1. Build production bundle:
   ```bash
   npm run build
   ```

2. Deploy `dist` folder to your hosting platform

### Backend (Railway/Heroku/DigitalOcean)

1. Set environment variables in your hosting platform
2. Deploy `server` directory
3. Update `FRONTEND_URL` in backend `.env`
4. Update API URLs in frontend components to point to production backend

## 📝 Environment Variables

### Frontend
- `VITE_API_URL` - Backend API URL (optional, defaults to localhost:5000)

### Backend
See [server/.env.example](server/.env.example) for complete list:
- `PORT` - Server port
- `EMAIL_SERVICE` - Email provider (gmail/sendgrid)
- `EMAIL_USER` - Email username
- `EMAIL_PASS` - Email password
- `GOOGLE_GENAI_API_KEY` - GenAI API key
- `FRONTEND_URL` - Frontend URL for CORS

## 🎨 Customization

### Video Background
1. Place your video in `public/` folder
2. Update video source in `components/Hero.tsx`

### Colors & Branding
- Primary color: `#ecb613` (defined in `index.html`)
- Update in Tailwind config for global changes

## 📄 License

MIT

## 🆘 Support

For detailed setup instructions and troubleshooting, see:
- [Backend Documentation](server/README.md)
- [Implementation Plan](.gemini/antigravity/brain/403e87db-ba22-4bc9-8af6-2e388b87ae00/implementation_plan.md)
