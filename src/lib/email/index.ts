import { Resend } from "resend";
import { businessConfig } from "@/config/business";

// Ensure this file is only ever imported on the server
import "server-only";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactEmailParams {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

interface ReferralEmailParams {
  referrerName: string;
  referrerEmail: string;
  participantName: string;
  serviceRequired: string;
}

export async function sendContactNotification(data: ContactEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not configured. Email skipped.");
    return;
  }

  try {
    await resend.emails.send({
      from: `Website Contact <noreply@${process.env.NEXT_PUBLIC_SITE_DOMAIN || "serviceforlifecare.com.au"}>`,
      to: [process.env.ADMIN_EMAIL || businessConfig.contact.email],
      replyTo: data.email,
      subject: `New Contact Request from ${data.name}`,
      text: `You have received a new contact submission.\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "Not provided"}\n\nMessage:\n${data.message}`,
    });
  } catch (error) {
    console.error("Failed to send contact notification email:", error);
    // We don't throw here to avoid exposing internal email errors to the client
  }
}

export async function sendReferralNotification(data: ReferralEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not configured. Email skipped.");
    return;
  }

  try {
    await resend.emails.send({
      from: `Website Referrals <noreply@${process.env.NEXT_PUBLIC_SITE_DOMAIN || "serviceforlifecare.com.au"}>`,
      to: [process.env.ADMIN_EMAIL || businessConfig.contact.email],
      replyTo: data.referrerEmail,
      subject: `New Secure Referral Submitted`,
      text: `A new referral has been submitted via the website.\n\nReferrer: ${data.referrerName}\nEmail: ${data.referrerEmail}\nParticipant: ${data.participantName}\nService: ${data.serviceRequired}\n\nPlease check the secure admin dashboard for full details.`,
    });
  } catch (error) {
    console.error("Failed to send referral notification email:", error);
  }
}
