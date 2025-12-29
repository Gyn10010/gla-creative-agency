import express from 'express';
import supabase from '../database/supabase.js';
import { sendContactNotification } from '../services/email.js';

const router = express.Router();

/**
 * POST /api/contact
 * Handle contact form submissions with Supabase
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

/**
 * GET /api/contact/stats
 * Get contact form statistics from Supabase
 */
router.get('/contact/stats', async (req, res) => {
    try {
        // Get total count
        const { count: total, error: countError } = await supabase
            .from('contacts')
            .select('*', { count: 'exact', head: true });

        if (countError) throw countError;

        // Get unique emails count
        const { data: uniqueEmails, error: uniqueError } = await supabase
            .from('contacts')
            .select('email');

        if (uniqueError) throw uniqueError;

        const uniqueEmailsCount = new Set(uniqueEmails.map(c => c.email)).size;

        // Get stats by service
        const { data: contacts, error: statsError } = await supabase
            .from('contacts')
            .select('service');

        if (statsError) throw statsError;

        // Count by service
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

/**
 * GET /api/contact/list
 * List all contacts (admin only - requires service_role key)
 */
router.get('/contact/list', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('contacts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.json({
            success: true,
            contacts: data
        });

    } catch (error) {
        console.error('List contacts error:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao listar contatos'
        });
    }
});

export default router;
