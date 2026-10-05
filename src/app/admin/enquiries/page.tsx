import { MessageSquare } from "lucide-react";

export const metadata = {
  title: "Enquiries | Admin Dashboard",
};

export default function EnquiriesPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-heading text-text-primary">Contact Enquiries</h1>
          <p className="text-text-secondary mt-1">Manage and respond to website contact form submissions.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-surface-pink/30 border-b border-gray-200 text-sm uppercase tracking-wider text-text-secondary font-semibold">
                <th className="px-6 py-4">Sender Name</th>
                <th className="px-6 py-4">Message Snippet</th>
                <th className="px-6 py-4">Date Received</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-text-primary">
                  David Mitchell
                  <div className="text-xs text-text-muted mt-0.5">david.m@example.com</div>
                </td>
                <td className="px-6 py-4 text-text-secondary truncate max-w-[250px]">
                  Hi, I'm looking for home support for my mother...
                </td>
                <td className="px-6 py-4 text-text-secondary">Today, 10:45 AM</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Unread
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-brand-magenta hover:text-brand-magenta/80 font-medium text-sm">Reply</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-text-primary">
                  Amanda Ross
                  <div className="text-xs text-text-muted mt-0.5">aross22@gmail.com</div>
                </td>
                <td className="px-6 py-4 text-text-secondary truncate max-w-[250px]">
                  Can you provide a quote for NDIS capacity building?
                </td>
                <td className="px-6 py-4 text-text-secondary">Yesterday</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Read
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-brand-magenta hover:text-brand-magenta/80 font-medium text-sm">View</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-text-primary">
                  James Wilson
                  <div className="text-xs text-text-muted mt-0.5">j.wilson99@outlook.com</div>
                </td>
                <td className="px-6 py-4 text-text-secondary truncate max-w-[250px]">
                  Thank you for the wonderful service your team provided...
                </td>
                <td className="px-6 py-4 text-text-secondary">Oct 1, 2026</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-surface-teal text-brand-teal border border-brand-teal/20">
                    Resolved
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-brand-magenta hover:text-brand-magenta/80 font-medium text-sm">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <span className="text-sm text-text-secondary">Showing 1 to 3 of 12 enquiries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-text-secondary bg-white hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-text-secondary bg-white hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
