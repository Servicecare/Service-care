"use server";

import { z } from "zod";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { createClient } from "@/lib/supabase/server";
import { sendContactNotification } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  turnstileToken: z.string().min(1, "Turnstile token is required"),
});

export async function submitContactForm(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      turnstileToken: formData.get("turnstileToken"),
    };

    // 1. Validate Input
    const validatedData = contactSchema.safeParse(rawData);
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
    const rateLimitResponse = await rateLimit("contact", validatedData.data.email);
    if (!rateLimitResponse.success) {
      return { success: false, error: "Too many requests. Please try again later." };
    }

    // 4. Insert into Supabase
    const supabase = await createClient();
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert([dbData]);

    if (dbError) {
      console.error("Database Error:", dbError);
      return { success: false, error: "Failed to submit request. Please try again later." };
    }

    // 5. Send Email Notification
    await sendContactNotification(dbData);

    return { success: true, message: "Thank you. Your message has been received." };
  } catch (error) {
    console.error("Submission Error:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
