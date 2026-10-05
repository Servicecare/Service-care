import { createClient } from "@/lib/supabase/server";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Referrals | Admin Dashboard",
};

export default async function ReferralsPage() {
  const supabase = await createClient();
  
  // Fetch from referrals
  const { data: referrals, error } = await supabase
    .from('referrals')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching referrals:", error);
  }

  const data = referrals || [];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-heading text-text-primary">Referrals</h1>
          <p className="text-text-secondary mt-1">Manage and process client referrals.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-surface-blue/30 border-b border-gray-200 text-sm uppercase tracking-wider text-text-secondary font-semibold">
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Service Required</th>
                <th className="px-6 py-4">Date Submitted</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-text-secondary">
                    No referrals found.
                  </td>
                </tr>
              ) : (
                data.map((referral) => (
                  <tr key={referral.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-text-primary">
                      {referral.participant_name}
                      <div className="text-xs text-text-muted mt-0.5">Referred by: {referral.referrer_name}</div>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{referral.service_required}</td>
                    <td className="px-6 py-4 text-text-secondary">
                      {new Date(referral.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        referral.status === 'new' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-brand-surface-teal text-brand-teal border border-brand-teal/20'
                      }`}>
                        {referral.status === 'new' ? 'Pending' : referral.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-brand-primary hover:text-brand-primary-dark font-medium text-sm">Review</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <span className="text-sm text-text-secondary">Showing {data.length} referrals</span>
        </div>
      </div>
    </div>
  );
}
