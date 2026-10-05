"use server";

import { z } from "zod";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendReferralNotification } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

const referralSchema = z.object({
  referrer_name: z.string().min(2, "Referrer Name is required"),
  referrer_email: z.string().email("Invalid email address"),
  referrer_phone: z.string().optional(),
  participant_name: z.string().min(2, "Participant Name is required"),
  service_required: z.string().min(2, "Please specify a service"),
  notes: z.string().optional(),
  turnstileToken: z.string().min(1, "Turnstile token is required"),
});

export async function submitReferralForm(formData: FormData) {
  try {
    const rawData = {
      referrer_name: formData.get("referrer_name"),
      referrer_email: formData.get("referrer_email"),
      referrer_phone: formData.get("referrer_phone"),
      participant_name: formData.get("participant_name"),
      service_required: formData.get("service_required"),
      notes: formData.get("notes"),
      turnstileToken: formData.get("turnstileToken"),
    };

    // 1. Validate Input
    const validatedData = referralSchema.safeParse(rawData);
    if (!validatedData.success) {
      return { success: false, error: "Invalid form data provided." };
    }

    const { turnstileToken, ...dbData } = validatedData.data;

    // 2. Validate Turnstile
    const isHuman = await verifyTurnstileToken(turnstileToken);
    if (!isHuman) {
      return { success: false, error: "Security check failed. Please try again." };
    }

    // 3. Rate Limiting
    const rateLimitResponse = await rateLimit("referral", validatedData.data.referrer_email);
    if (!rateLimitResponse.success) {
      return { success: false, error: "Too many requests. Please try again later." };
    }

    // 4. Insert into Supabase securely using Service Role (bypassing public insert)
    const supabase = createAdminClient();
    const { error: dbError } = await supabase
      .from("referrals")
      .insert([dbData]);

    if (dbError) {
      console.error("Database Error:", dbError);
      return { success: false, error: "Failed to submit request. Please try again later." };
    }

    // 5. Send Email Notification
    await sendReferralNotification({
      referrerName: dbData.referrer_name,
      referrerEmail: dbData.referrer_email,
      participantName: dbData.participant_name,
      serviceRequired: dbData.service_required,
    });

    return { success: true, message: "Thank you. The referral has been submitted securely." };
  } catch (error) {
    console.error("Submission Error:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
