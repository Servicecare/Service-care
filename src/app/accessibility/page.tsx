import { businessConfig } from "@/config/business";

export const metadata = {
  title: `Accessibility Statement | ${businessConfig.companyName}`,
  description: "Our commitment to digital and physical accessibility.",
};

export default function AccessibilityPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 lg:px-8 prose">
      <h1 className="text-4xl font-bold font-heading mb-6">Accessibility Statement</h1>
      <p>
        {businessConfig.companyName} is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards (WCAG 2.2 AA).
      </p>
      <p className="mt-4 text-text-secondary">
        If you encounter any barriers while using our website, please contact us at {businessConfig.contact.email}.
      </p>
    </div>
  );
}
