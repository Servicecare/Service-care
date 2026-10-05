import { FileText } from "lucide-react";

export const metadata = {
  title: "Referrals | Admin Dashboard",
};

export default function ReferralsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-heading text-text-primary">Referrals</h1>
          <p className="text-text-secondary mt-1">Manage and process client referrals.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-brand-surface-blue rounded-full flex items-center justify-center mb-6">
            <FileText className="w-10 h-10 text-brand-300" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">No Referrals Yet</h2>
          <p className="text-text-secondary max-w-sm mb-6">
            When individuals or organizations submit the referral form on the website, they will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
