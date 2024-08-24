import axios from 'axios';

export async function sendWithProviderA(options: { to: string; subject: string; text: string; html?: string; }) {
    try {
        await axios.post('https://api.providerA.com/send', {
            apiKey: 'your-providerA-api-key',
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
        });
        console.log('Email sent successfully with Provider A');
    } catch (error) {
        console.error('Failed to send email with Provider A:', error);
        throw error;
    }
}
