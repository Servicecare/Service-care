"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitReferralForm } from "@/app/actions/referral";
import { Turnstile } from "@marsidev/react-turnstile";
import { AnimatedFormAlert } from "@/components/ui/AnimatedFormAlert";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

const referralSchema = z.object({
  referrer_name: z.string().min(2, "Referrer Name is required"),
  referrer_email: z.string().email("Invalid email address"),
  referrer_phone: z.string().optional(),
  participant_name: z.string().min(2, "Participant Name is required"),
  service_required: z.string().min(2, "Please specify a service"),
  notes: z.string().optional(),
});

type ReferralFormValues = z.infer<typeof referralSchema>;

export function ReferralForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ReferralFormValues>({
    resolver: zodResolver(referralSchema),
  });

  const onSubmit = async (data: ReferralFormValues) => {
    setServerError(null);
    
    if (!turnstileToken) {
      setServerError("Please complete the security check.");
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value || "");
    });
    formData.append("turnstileToken", turnstileToken);

    try {
      const result = await submitReferralForm(formData);
      
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
        <h3 className="text-xl font-bold text-brand-500 mb-2">Referral Submitted</h3>
        <p className="text-text-secondary">
          Thank you for trusting us. We have received the referral and will reach out to discuss the next steps.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="mt-6 text-brand-500 font-medium hover:underline"
        >
          Submit another referral
        </button>
      </AnimatedFormAlert>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <AnimatedFormAlert isVisible={!!serverError} className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md" role="alert">
        {serverError}
      </AnimatedFormAlert>

      <div className="bg-orange-50 border border-orange-200 text-orange-800 px-4 py-4 rounded-md text-sm mb-6 flex gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 mt-0.5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <p>
          <strong>Important:</strong> Please do not submit emergency medical information or detailed diagnoses through this form. Our team will securely collect necessary health records during the formal intake process.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="referrer_name" className="block text-sm font-medium leading-6 text-text-primary">
            Your Name (Referrer) <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              id="referrer_name"
              type="text"
              {...register("referrer_name")}
              aria-invalid={errors.referrer_name ? "true" : "false"}
              aria-describedby={errors.referrer_name ? "referrer-name-error" : undefined}
              className="block w-full rounded-md border-0 py-3 text-text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6"
            />
          </div>
          {errors.referrer_name && (
            <p id="referrer-name-error" className="mt-2 text-sm text-red-600" role="alert">
              {errors.referrer_name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="referrer_email" className="block text-sm font-medium leading-6 text-text-primary">
            Your Email <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              id="referrer_email"
              type="email"
              {...register("referrer_email")}
              aria-invalid={errors.referrer_email ? "true" : "false"}
              aria-describedby={errors.referrer_email ? "referrer-email-error" : undefined}
              className="block w-full rounded-md border-0 py-3 text-text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6"
            />
          </div>
          {errors.referrer_email && (
            <p id="referrer-email-error" className="mt-2 text-sm text-red-600" role="alert">
              {errors.referrer_email.message}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="referrer_phone" className="block text-sm font-medium leading-6 text-text-primary">
            Your Phone (Optional)
          </label>
          <div className="mt-2">
            <input
              id="referrer_phone"
              type="tel"
              {...register("referrer_phone")}
              className="block w-full rounded-md border-0 py-3 text-text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6 mt-6">
        <h4 className="text-lg font-heading font-semibold text-text-primary mb-6">Participant Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="participant_name" className="block text-sm font-medium leading-6 text-text-primary">
              Participant Name <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                id="participant_name"
                type="text"
                {...register("participant_name")}
                aria-invalid={errors.participant_name ? "true" : "false"}
                aria-describedby={errors.participant_name ? "participant-name-error" : undefined}
                className="block w-full rounded-md border-0 py-3 text-text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.participant_name && (
              <p id="participant-name-error" className="mt-2 text-sm text-red-600" role="alert">
                {errors.participant_name.message}
              </p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="service_required" className="block text-sm font-medium leading-6 text-text-primary">
              Service Required <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <select
                id="service_required"
                {...register("service_required")}
                className="block w-full rounded-md border-0 py-3 text-text-primary shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6"
              >
                <option value="">Select a service...</option>
                <option value="In-Home Support">In-Home Support</option>
                <option value="Community Access">Community Access</option>
                <option value="Capacity Building">Capacity Building</option>
                <option value="Other">Other / Not Sure</option>
              </select>
            </div>
            {errors.service_required && (
              <p className="mt-2 text-sm text-red-600" role="alert">
                {errors.service_required.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="notes" className="block text-sm font-medium leading-6 text-text-primary">
              Brief Notes / Requirements (Optional)
            </label>
            <div className="mt-2">
              <textarea
                id="notes"
                rows={4}
                {...register("notes")}
                placeholder="Briefly describe the support needed without including sensitive health records."
                className="block w-full rounded-md border-0 py-3 text-text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6 resize-y"
              />
            </div>
          </div>
        </div>
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
              Submitting...
            </span>
          ) : (
            "Submit Referral"
          )}
        </AnimatedButton>
      </div>
    </form>
  );
}
