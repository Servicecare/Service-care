import { businessConfig } from "@/config/business";

export const metadata = {
  title: `Terms of Service | ${businessConfig.companyName}`,
  description: "Terms and conditions of using our services.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 lg:px-8 prose">
      <h1 className="text-4xl font-bold font-heading mb-6">Terms of Service</h1>
      <p className="text-lg font-bold text-red-600">[LEGAL REVIEW REQUIRED]</p>
      <p>
        These terms and conditions govern your use of the {businessConfig.companyName} website and the provision of our services.
      </p>
      <p className="mt-4 text-text-secondary">
        (Draft placeholder - client to provide exact legally reviewed terms of service).
      </p>
    </div>
  );
}
