const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');

const app = express();

// Configure CORS
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://gla-creative-agency.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            // Check if it matches Vercel preview deployments
            if (origin.endsWith('.vercel.app')) {
                return callback(null, true);
            }
            return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}));

// Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
);

// Middleware (CORS already configured above)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check endpoint - at /api
app.get('/api', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'GLA Backend API'
    });
});

// Debug endpoint - check env vars
app.get('/api/debug', (req, res) => {
    res.json({
        hasSupabaseUrl: !!process.env.SUPABASE_URL,
        hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        hasGenAIKey: !!process.env.GOOGLE_GENAI_API_KEY,
        hasGeminiKey: !!process.env.GEMINI_API_KEY,
        genAIKeyPrefix: process.env.GOOGLE_GENAI_API_KEY ? process.env.GOOGLE_GENAI_API_KEY.substring(0, 10) + '...' : 'NOT SET',
        geminiKeyPrefix: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 10) + '...' : 'NOT SET',
        nodeEnv: process.env.NODE_ENV
    });
});

// Contact endpoint - at /api/contact
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, service, message } = req.body;

        // Validation
        if (!name || !email || !service || !message) {
            return res.status(400).json({
                success: false,
                error: 'Todos os campos são obrigatórios'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Email inválido'
            });
        }

        // Get client info
        const ipAddress = req.ip || req.connection.remoteAddress;
        const userAgent = req.get('user-agent');

        // Save to Supabase
        const { data, error } = await supabase
            .from('contacts')
            .insert([
                {
                    name,
                    email,
                    service,
                    message,
                    ip_address: ipAddress,
                    user_agent: userAgent
                }
            ])
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }

        // Send email notification (optional)
        try {
            if (process.env.EMAIL_SERVICE && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                const transporter = nodemailer.createTransport({
                    service: process.env.EMAIL_SERVICE,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                });

                await transporter.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: process.env.EMAIL_TO,
                    subject: `Novo contato: ${name}`,
                    text: `Nome: ${name}\nEmail: ${email}\nServiço: ${service}\nMensagem: ${message}`
                });
            }
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
        }

        res.status(200).json({
            success: true,
            message: 'Mensagem enviada com sucesso!',
            id: data.id
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao processar sua mensagem. Tente novamente.'
        });
    }
});

// Stats endpoint - at /api/contact/stats
app.get('/api/contact/stats', async (req, res) => {
    try {
        const { count: total, error: countError } = await supabase
            .from('contacts')
            .select('*', { count: 'exact', head: true });

        if (countError) throw countError;

        const { data: uniqueEmails, error: uniqueError } = await supabase
            .from('contacts')
            .select('email');

        if (uniqueError) throw uniqueError;

        const uniqueEmailsCount = new Set(uniqueEmails.map(c => c.email)).size;

        const { data: contacts, error: statsError } = await supabase
            .from('contacts')
            .select('service');

        if (statsError) throw statsError;

        const serviceStats = contacts.reduce((acc, contact) => {
            acc[contact.service] = (acc[contact.service] || 0) + 1;
            return acc;
        }, {});

        const stats = Object.entries(serviceStats).map(([service, count]) => ({
            service,
            count
        }));

        res.json({
            success: true,
            stats: {
                total,
                unique_emails: uniqueEmailsCount,
                by_service: stats
            }
        });

    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao buscar estatísticas'
        });
    }
});

// AI Chat endpoint - at /api/ai/chat
app.post('/api/ai/chat', async (req, res) => {
    try {
        const { message, lang } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Mensagem é obrigatória'
            });
        }

        const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({
                success: false,
                error: 'Configuração da API não encontrada'
            });
        }

        // Direct REST API call implementation
        // Using v1beta and header authentication for maximum compatibility
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`;

        // ... context definition ...
        const systemContext = `You are the AI Consultant for GLA, a futuristic design and technology agency. Your tone is sophisticated, innovative, and helpful. The agency specializes in: Landing Pages, AI-generated Photography, 3D Prototype Design, and Digital Mascots. If asked about projects, mention we are in São Paulo but serve the world. Respond in ${lang === 'PT' ? 'Portuguese' : 'English'}.`;

        const requestBody = {
            contents: [{
                parts: [{ text: `${systemContext}\n\nUser: ${message}\nAssistant:` }]
            }]
        };

        const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey
            },
            body: JSON.stringify(requestBody)
        });

        // Always read the body
        const data = await apiResponse.json();

        if (!apiResponse.ok) {
            console.error('API Error Response:', JSON.stringify(data, null, 2));
            throw new Error(data.error?.message || JSON.stringify(data));
        }

        const botText = data.candidates[0].content.parts[0].text;

        res.json({
            success: true,
            response: botText
        });

    } catch (error) {
        console.error('AI Chat error:', error);
        console.error('Error string:', JSON.stringify(error, null, 2));

        res.status(500).json({
            success: false,
            error: 'Erro ao processar sua mensagem',
            details: error.message || 'Unknown error',
            fullError: JSON.stringify(error)
        });
    }
});

// Debug endpoint - list models
app.get('/api/ai/models', async (req, res) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY;
        const { GoogleGenAI } = require('@google/genai');
        const genAI = new GoogleGenAI({ apiKey });

        // This method might differ based on version, attempting standard list
        const response = await genAI.models.list();

        res.json({
            success: true,
            responseKeys: Object.keys(response || {}),
            fullResponseIsArray: Array.isArray(response),
            preview: JSON.stringify(response).substring(0, 200)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            fullError: JSON.stringify(error)
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint não encontrado'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
    });
});

// Export for Vercel serverless
module.exports = app;
