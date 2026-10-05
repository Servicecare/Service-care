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
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-text-primary">Sarah Jenkins</td>
                <td className="px-6 py-4 text-text-secondary">In-Home Support</td>
                <td className="px-6 py-4 text-text-secondary">Oct 4, 2026</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-brand-primary hover:text-brand-primary-dark font-medium text-sm">Review</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-text-primary">Michael Chen</td>
                <td className="px-6 py-4 text-text-secondary">Community Access</td>
                <td className="px-6 py-4 text-text-secondary">Oct 2, 2026</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-surface-teal text-brand-teal border border-brand-teal/20">
                    Approved
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-brand-primary hover:text-brand-primary-dark font-medium text-sm">Review</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-text-primary">Emma Thompson</td>
                <td className="px-6 py-4 text-text-secondary">Capacity Building</td>
                <td className="px-6 py-4 text-text-secondary">Sep 28, 2026</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Archived
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-brand-primary hover:text-brand-primary-dark font-medium text-sm">Review</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <span className="text-sm text-text-secondary">Showing 1 to 3 of 5 referrals</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-text-secondary bg-white hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-text-secondary bg-white hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
