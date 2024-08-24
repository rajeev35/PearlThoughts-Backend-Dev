import { emailService } from './services/emailService';

const emailOptions = {
    to: 'recipient@example.com',
    subject: 'Test Email',
    text: 'Hello, this is a test email.',
};

emailService.sendMail(emailOptions).catch((error) => {
    console.error('Failed to send email:', error);
});
