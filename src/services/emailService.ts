import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import { sendWithProviderA } from './providerA';
import { sendWithProviderB } from './providerB';

config();

interface EmailOptions {
    to: string;
    subject: string;
    text: string;
    html?: string;
}

class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    public async sendMail(options: EmailOptions): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: `"No Reply" <${process.env.SMTP_USER}>`, // sender address
                to: options.to,
                subject: options.subject,
                text: options.text,
                html: options.html,
            });
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Failed to send email with primary provider. Error:', error);
            await this.retryWithBackupProvider(options);
        }
    }

    private async retryWithBackupProvider(options: EmailOptions): Promise<void> {
        try {
            // First fallback to another SMTP provider
            await this.sendMailWithBackupSMTP(options);
        } catch (error) {
            console.error('Failed to send email with backup SMTP. Error:', error);
            
            // Second fallback to another email service provider API
            try {
                await sendWithProviderA(options);
            } catch (error) {
                console.error('Failed with Provider A. Error:', error);
                
                // Final fallback to another provider
                try {
                    await sendWithProviderB(options);
                } catch (finalError) {
                    console.error('All fallback options failed. Error:', finalError);
                }
            }
        }
    }

    private async sendMailWithBackupSMTP(options: EmailOptions): Promise<void> {
        const backupTransporter = nodemailer.createTransport({
            host: process.env.BACKUP_SMTP_HOST,
            port: Number(process.env.BACKUP_SMTP_PORT),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.BACKUP_SMTP_USER,
                pass: process.env.BACKUP_SMTP_PASS,
            },
        });

        await backupTransporter.sendMail({
            from: `"No Reply" <${process.env.BACKUP_SMTP_USER}>`, // sender address
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
        });

        console.log('Email sent successfully with backup SMTP');
    }
}

export const emailService = new EmailService();
