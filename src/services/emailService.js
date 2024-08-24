"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = require("dotenv");
const providerA_1 = require("./providerA");
const providerB_1 = require("./providerB");
(0, dotenv_1.config)();
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }
    sendMail(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.transporter.sendMail({
                    from: `"No Reply" <${process.env.SMTP_USER}>`, // sender address
                    to: options.to,
                    subject: options.subject,
                    text: options.text,
                    html: options.html,
                });
                console.log('Email sent successfully');
            }
            catch (error) {
                console.error('Failed to send email with primary provider. Error:', error);
                yield this.retryWithBackupProvider(options);
            }
        });
    }
    retryWithBackupProvider(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // First fallback to another SMTP provider
                yield this.sendMailWithBackupSMTP(options);
            }
            catch (error) {
                console.error('Failed to send email with backup SMTP. Error:', error);
                // Second fallback to another email service provider API
                try {
                    yield (0, providerA_1.sendWithProviderA)(options);
                }
                catch (error) {
                    console.error('Failed with Provider A. Error:', error);
                    // Final fallback to another provider
                    try {
                        yield (0, providerB_1.sendWithProviderB)(options);
                    }
                    catch (finalError) {
                        console.error('All fallback options failed. Error:', finalError);
                    }
                }
            }
        });
    }
    sendMailWithBackupSMTP(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const backupTransporter = nodemailer_1.default.createTransport({
                host: process.env.BACKUP_SMTP_HOST,
                port: Number(process.env.BACKUP_SMTP_PORT),
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.BACKUP_SMTP_USER,
                    pass: process.env.BACKUP_SMTP_PASS,
                },
            });
            yield backupTransporter.sendMail({
                from: `"No Reply" <${process.env.BACKUP_SMTP_USER}>`, // sender address
                to: options.to,
                subject: options.subject,
                text: options.text,
                html: options.html,
            });
            console.log('Email sent successfully with backup SMTP');
        });
    }
}
exports.emailService = new EmailService();
