import { createClient } from "@/lib/supabase/server";
import { MessageSquare } from "lucide-react";

export const metadata = {
  title: "Enquiries | Admin Dashboard",
};

export default async function EnquiriesPage() {
  const supabase = await createClient();
  
  // Fetch from contact_submissions
  const { data: enquiries, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching enquiries:", error);
  }

  const data = enquiries || [];

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
              {data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-text-secondary">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                data.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-text-primary">
                      {enquiry.name}
                      <div className="text-xs text-text-muted mt-0.5">{enquiry.email}</div>
                    </td>
                    <td className="px-6 py-4 text-text-secondary truncate max-w-[250px]">
                      {enquiry.message}
                    </td>
                    <td className="px-6 py-4 text-text-secondary">
                      {new Date(enquiry.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        enquiry.status === 'new' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {enquiry.status === 'new' ? 'Unread' : 'Read'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-brand-magenta hover:text-brand-magenta/80 font-medium text-sm">View</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <span className="text-sm text-text-secondary">Showing {data.length} enquiries</span>
        </div>
      </div>
    </div>
  );
}
