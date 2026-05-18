import express from 'express';
import { check, validationResult } from 'express-validator';
import Message from '../models/Message.js';
import { sendContactConfirmationEmail } from '../utils/emailService.js';
import axios from 'axios';

const router = express.Router();

router.post('/send', [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('subject', 'Subject is required').notEmpty(),
  check('message', 'Message is required').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, subject, message } = req.body;

  try {
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    await sendContactConfirmationEmail(email, name);

    try {
      await axios.post('https://formspree.io/f/xbddjndv', {
        name,
        email,
        subject,
        message
      });
    } catch (formspreeErr) {
      console.error('Formspree error:', formspreeErr.message);
    }

    res.json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
