import { businessConfig } from "@/config/business";

export const metadata = {
  title: `Complaints & Feedback | ${businessConfig.companyName}`,
  description: "How to lodge a complaint or provide feedback about our services.",
};

export default function ComplaintsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 lg:px-8 prose">
      <h1 className="text-4xl font-bold font-heading mb-6">Complaints & Feedback</h1>
      <p className="text-lg font-bold text-red-600">[LEGAL REVIEW REQUIRED]</p>
      <p>
        We value your feedback. If you are unhappy with any aspect of our services, you have the right to make a complaint. 
        We guarantee that making a complaint will not adversely affect the care you receive.
      </p>
      <p className="mt-4 text-text-secondary">
        (Draft placeholder - client to provide exact legally reviewed complaints procedure, including NDIS Quality and Safeguards Commission contact details).
      </p>
    </div>
  );
}
