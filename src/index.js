"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emailService_1 = require("./services/emailService");
const emailOptions = {
    to: 'recipient@example.com',
    subject: 'Test Email',
    text: 'Hello, this is a test email.',
};
emailService_1.emailService.sendMail(emailOptions).catch((error) => {
    console.error('Failed to send email:', error);
});
