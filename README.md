Resilient Email Sending Service
A resilient email sending service built with TypeScript, designed to handle failover between multiple SMTP providers.

Table of Contents
Introduction
Features
Setup Instructions
Usage
Environment Variables
Assumptions
Troubleshooting
Contributing
License
Introduction
This project implements a resilient email sending service that can automatically switch to a backup SMTP provider if the primary provider fails. It is built using TypeScript and utilizes nodemailer for handling SMTP connections.

Features
Primary and Backup SMTP Providers: Automatically switches to a backup provider if the primary one fails.
Configurable via Environment Variables: SMTP credentials and other configurations are managed via .env file.
Logging: Detailed logging for troubleshooting and monitoring.
Setup Instructions
1. Prerequisites
Before setting up the project, ensure you have the following installed:

Node.js (version 18.17.0 or later)
npm (version 10.8.2 or later)

touch .env
Add the following environment variables to the .env file:

env
Copy code
# Primary SMTP Provider
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_primary_email@gmail.com
SMTP_PASS=your_primary_app_password

# Backup SMTP Provider
BACKUP_SMTP_HOST=smtp.mail.yahoo.com
BACKUP_SMTP_PORT=587
BACKUP_SMTP_USER=your_backup_email@yahoo.com
BACKUP_SMTP_PASS=your_backup_app_password
5. Compile TypeScript
Compile the TypeScript files to JavaScript:

bash
Copy code
npx tsc
6. Run the Service
You can run the service using ts-node:

bash
Copy code
npx ts-node src/index.ts
Or, if you prefer running the compiled JavaScript:

bash
Copy code
node dist/index.js
Usage
To use the service, simply invoke the sendEmail function defined in src/services/emailService.ts. The service will attempt to send an email using the primary SMTP provider and will failover to the backup provider if necessary.

Example usage:

typescript
Copy code
import { sendEmail } from './services/emailService';

sendEmail({
  from: 'your_email@gmail.com',
  to: 'recipient@example.com',
  subject: 'Test Email',
  text: 'Hello, this is a test email.',
});
Environment Variables
The following environment variables are required:

SMTP_HOST: Hostname of the primary SMTP server.
SMTP_PORT: Port number for the primary SMTP server.
SMTP_USER: Username for the primary SMTP server.
SMTP_PASS: Password (or App Password) for the primary SMTP server.
BACKUP_SMTP_HOST: Hostname of the backup SMTP server.
BACKUP_SMTP_PORT: Port number for the backup SMTP server.
BACKUP_SMTP_USER: Username for the backup SMTP server.
BACKUP_SMTP_PASS: Password (or App Password) for the backup SMTP server.
Assumptions
SMTP Credentials: You have valid credentials for both the primary and backup SMTP providers.
Network Accessibility: The service has network access to the SMTP servers.
Security Settings: If using Google, you've either enabled "Less secure app access" or generated an App Password for accounts with 2FA.
Node.js Version: The project assumes you're using Node.js version 18.17.0 or later, as required by the npm version.
Troubleshooting
Invalid login: 535 5.7.8 Username and Password not accepted:

Ensure that your credentials are correct.
If using Google, consider generating an App Password if you have 2FA enabled.
Error: getaddrinfo ENOTFOUND smtp.example.com:

Check that your SMTP host is correctly configured in the .env file.
Ensure there are no network connectivity issues.
Too many bad auth attempts:

You may need to wait before retrying due to account lockout.
Check your email provider’s security settings.
Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss any changes or improvements.

License
This project is licensed under the MIT License.
