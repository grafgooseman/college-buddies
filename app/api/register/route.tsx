import { NextApiRequest, NextApiResponse } from 'next';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabase: SupabaseClient = createClient('SUPABASE_URL', 'SUPABASE_ANON_KEY');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (email.endsWith('@example.com')) {
      const temporaryPassword: string = 'temporary123'; // Generate a temporary password

      const { data, error } = await supabase.from('users').insert({ email, password: temporaryPassword });

      if (error) {
        console.error('Error inserting user:', error);
        return res.status(500).json({ error: 'Something went wrong' });
      }

      // Send the temporary password to the user's email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Your Temporary Password',
        text: `Your temporary password is ${temporaryPassword}`,
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      return res.status(200).json({ message: 'Registration successful' });
    } else {
      return res.status(400).json({ error: 'Invalid email domain' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
