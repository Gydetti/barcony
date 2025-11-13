/**
 * Barcony Contact Form API Endpoint
 * Handles form submissions via Vercel Serverless Function
 */

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, phone, city, model, message, honeypot } = req.body;

        // Honeypot spam protection
        if (honeypot) {
            return res.status(200).json({ success: true }); // Silent fail for bots
        }

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Naam, e-mail en bericht zijn verplicht' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Ongeldig e-mailadres' });
        }

        // Prepare email content
        const emailContent = `
Nieuw contactformulier bericht van Barcony.nl

Naam: ${name}
E-mail: ${email}
Telefoon: ${phone || 'Niet opgegeven'}
Woonplaats: ${city || 'Niet opgegeven'}
Model interesse: ${model || 'Niet opgegeven'}

Bericht:
${message}

---
Verzonden op: ${new Date().toLocaleString('nl-NL')}
IP-adres: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}
        `.trim();

        // Send email using SendGrid, Resend, or another email service
        // For now, we'll use a simple approach - you can integrate with your preferred service
        
        // Option 1: Use Resend (recommended for Vercel)
        // Option 2: Use SendGrid
        // Option 3: Use Nodemailer with SMTP
        
        // For now, log the submission (replace with actual email sending)
        console.log('Contact form submission:', {
            name,
            email,
            phone,
            message: message.substring(0, 100) + '...',
            timestamp: new Date().toISOString()
        });

        // TODO: Replace with actual email sending service
        // Example with Resend:
        /*
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: 'Barcony <noreply@barcony.nl>',
            to: 'barconyamsterdam@gmail.com',
            replyTo: email,
            subject: `Nieuw contactformulier bericht van ${name}`,
            text: emailContent
        });
        */

        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Bedankt voor je bericht! We nemen binnen 24 uur contact met je op.'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        return res.status(500).json({
            error: 'Er is iets misgegaan. Probeer het later opnieuw of neem direct contact met ons op.'
        });
    }
}

