"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitContactForm } from "@/app/actions/contact";
import { Turnstile } from "@marsidev/react-turnstile";
import { AnimatedFormAlert } from "@/components/ui/AnimatedFormAlert";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setServerError(null);
    
    if (!turnstileToken) {
      setServerError("Please complete the security check.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone || "");
    formData.append("message", data.message);
    formData.append("turnstileToken", turnstileToken);

    try {
      const result = await submitContactForm(formData);
      
      if (result.success) {
        setIsSuccess(true);
        reset();
      } else {
        setServerError(result.error || "An unexpected error occurred.");
        setTurnstileKey(prev => prev + 1);
      }
    } catch {
      setServerError("A network error occurred. Please try again.");
      setTurnstileKey(prev => prev + 1);
    }
  };

  if (isSuccess) {
    return (
      <AnimatedFormAlert isVisible={isSuccess} className="bg-brand-50 border border-brand-500 rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold text-brand-500 mb-2">Message Sent Successfully</h3>
        <p className="text-text-secondary">
          Thank you for reaching out. We have received your message and will get back to you shortly.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="mt-6 text-brand-500 font-medium hover:underline"
        >
          Send another message
        </button>
      </AnimatedFormAlert>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <AnimatedFormAlert isVisible={!!serverError} className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md" role="alert">
        {serverError}
      </AnimatedFormAlert>

      <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-text-primary">
          Your Name <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <input
            id="name"
            type="text"
            {...register("name")}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="block w-full rounded-md border-0 py-3 text-text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6"
          />
        </div>
        {errors.name && (
          <p id="name-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-text-primary">
          Your Email <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <input
            id="email"
            type="email"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="block w-full rounded-md border-0 py-3 text-text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6"
          />
        </div>
        {errors.email && (
          <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-text-primary">
          Phone Number (Optional)
        </label>
        <div className="mt-2">
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            className="block w-full rounded-md border-0 py-3 text-text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium leading-6 text-text-primary">
          Your Message <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <textarea
            id="message"
            rows={4}
            {...register("message")}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
            className="block w-full rounded-md border-0 py-3 text-text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6 resize-y"
          />
        </div>
        {errors.message && (
          <p id="message-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="flex justify-start">
        <Turnstile
          key={turnstileKey}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
          onSuccess={(token) => setTurnstileToken(token)}
          onError={() => setServerError("Security check failed.")}
          onExpire={() => setTurnstileToken(null)}
        />
      </div>

      <div>
        <AnimatedButton
          type="submit"
          disabled={isSubmitting || !turnstileToken}
          className="rounded-full bg-brand-500 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-500/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto flex items-center justify-center min-w-[140px]"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            "Send Message"
          )}
        </AnimatedButton>
      </div>
    </form>
  );
}
