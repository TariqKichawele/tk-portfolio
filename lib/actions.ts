'use server'

import { z } from "zod";
import { ContactFormSchema, NewsletterFormSchema } from "./schemas";
import { Resend } from "resend";
import ContactFormEmail from "@/emails/ContactFormEmail";

type ContactFormInputs = z.infer<typeof ContactFormSchema>;
type NewsletterFormInputs = z.infer<typeof NewsletterFormSchema>;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(data: ContactFormInputs) {
    const result = ContactFormSchema.safeParse(data);
    if (result.error) {
        return { error: result.error.format() };
    }

    try {
        const { name, email, message } = result.data;
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: [email],
            cc: ['onboarding@resend.dev'],
            subject: 'Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            react: await ContactFormEmail({ name, email, message })
        });

        if (!data || error) {
            throw new Error("Failed to send email");
        }

        return { success: true };
    } catch (error) {
        return { error }
    }
}

export async function subscribe(data: NewsletterFormInputs) {
    const result = NewsletterFormSchema.safeParse(data);
    if (result.error) {
        return { error: result.error.format() };
    }

    try {
        const { email } = result.data;
        const { data, error } = await resend.contacts.create({
            email: email,
            audienceId: process.env.RESEND_AUDIENCE_ID as string
        })

        if ( !data || error ) {
            throw new Error("Failed to subscribe")
        }

        return { success: true }
    } catch (error) {
        return { error }
    }
}