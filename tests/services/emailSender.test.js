require('dotenv').config();
const { emailSender } = require('../../services');

describe.skip('Email Sending', () => {
	it('should send email', async () => {
		const receiver = 'samuelmayna@gmail.com';
		await emailSender({
			subject: 'Test',
			replyTo: 'Samuel Maina',
			text: 'I am sending an email from nodemailer!',
			to: receiver,
			from: process.env.EMAIL,
		});
	});
});
