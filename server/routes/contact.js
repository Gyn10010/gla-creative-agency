import express from 'express';
import { insert, getAll } from '../database/init.js';
import { sendContactNotification } from '../services/email.js';

const router = express.Router();

/**
 * POST /api/contact
 * Handle contact form submissions
 */
router.post('/contact', async (req, res) => {
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

        // Save to database
        const id = insert(
            `INSERT INTO contacts (name, email, service, message, ip_address, user_agent, created_at)
           VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`,
            [name, email, service, message, ipAddress, userAgent]
        );

        // Send email notification
        try {
            await sendContactNotification({ name, email, service, message });
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Don't fail the request if email fails, just log it
        }

        res.status(200).json({
            success: true,
            message: 'Mensagem enviada com sucesso!',
            id: id
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao processar sua mensagem. Tente novamente.'
        });
    }
});

/**
 * GET /api/contact/stats
 * Get contact form statistics (optional, for admin)
 */
router.get('/contact/stats', (req, res) => {
    try {
        const stats = getAll(`
      SELECT 
        COUNT(*) as total,
        COUNT(DISTINCT email) as unique_emails,
        service,
        COUNT(*) as count
      FROM contacts
      GROUP BY service
    `);

        res.json({ success: true, stats });
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({ success: false, error: 'Erro ao buscar estatísticas' });
    }
});

export default router;
