import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize Google GenAI with server-side API key
const getAI = () => {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY;
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY or GOOGLE_GENAI_API_KEY not configured');
    }
    return new GoogleGenAI({ apiKey });
};

/**
 * POST /api/ai/chat
 * Proxy AI consultant requests to Google GenAI
 */
router.post('/chat', async (req, res) => {
    try {
        const { message, lang } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Mensagem é obrigatória'
            });
        }

        const ai = getAI();

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: message,
            config: {
                systemInstruction: `You are the AI Consultant for GLA, a futuristic design and technology agency. 
        Your tone is sophisticated, innovative, and helpful. 
        The agency specializes in: Landing Pages, AI-generated Photography, 3D Prototype Design, and Digital Mascots.
        If asked about projects, mention we are in São Paulo but serve the world.
        Language: Respond in ${lang === 'PT' ? 'Portuguese' : 'English'}.`,
            }
        });

        const botText = response.text || (lang === 'PT' ? 'Desculpe, tive um erro ao processar sua visão.' : 'Sorry, I had an error processing your vision.');

        res.json({
            success: true,
            response: botText
        });

    } catch (error) {
        console.error('AI Chat error:', error);

        // Check if it's an API key error
        if (error.message.includes('API_KEY')) {
            return res.status(500).json({
                success: false,
                error: 'Configuração da API não encontrada'
            });
        }

        res.status(500).json({
            success: false,
            error: 'Erro ao processar sua mensagem'
        });
    }
});

export default router;
