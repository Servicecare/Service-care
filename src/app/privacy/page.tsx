import { businessConfig } from "@/config/business";

export const metadata = {
  title: `Privacy Policy | ${businessConfig.companyName}`,
  description: "Privacy Policy and data handling procedures.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 lg:px-8 prose">
      <h1 className="text-4xl font-bold font-heading mb-6">Privacy Policy</h1>
      <p className="text-lg font-bold text-red-600">[LEGAL REVIEW REQUIRED]</p>
      <p>
        This privacy policy sets out how {businessConfig.companyName} uses and protects any information that you give us when you use this website and our services.
        We are committed to ensuring that your privacy is protected and compliant with Australian Privacy Principles and NDIS requirements.
      </p>
      <p className="mt-4 text-text-secondary">
        (Draft placeholder - client to provide exact legally reviewed privacy policy).
      </p>
    </div>
  );
}
