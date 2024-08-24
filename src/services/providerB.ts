import axios from 'axios';

export async function sendWithProviderB(options: { to: string; subject: string; text: string; html?: string; }) {
    try {
        await axios.post('https://api.providerB.com/send', {
            apiKey: 'your-providerB-api-key',
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
        });
        console.log('Email sent successfully with Provider B');
    } catch (error) {
        console.error('Failed to send email with Provider B:', error);
        throw error;
    }
}
