import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { MessageSquare, Activity, FileText } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard | Service for Life Care",
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user: supaUser } } = await supabase.auth.getUser();

  if (!supaUser) {
    redirect("/login");
  }
  
  const userEmail = supaUser.email || "Unknown User";

  // Explicitly verify authorization before data fetch
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('id')
    .eq('email', supaUser.email)
    .single();

  if (!adminUser) {
    redirect("/login?error=unauthorized");
  }

  // Fetch summary data securely
  const { count: cCount } = await supabase
    .from('contact_submissions')
    .select('*', { count: 'exact', head: true });
  
  const { count: rCount } = await supabase
    .from('referrals')
    .select('*', { count: 'exact', head: true });
    
  const contactCount = cCount || 0;
  const referralCount = rCount || 0;

  // Fetch recent activity securely
  const { data: recentContacts } = await supabase
    .from('contact_submissions')
    .select('id, name, message, created_at')
    .order('created_at', { ascending: false })
    .limit(3);

  const { data: recentReferrals } = await supabase
    .from('referrals')
    .select('id, participant_name, service_required, created_at')
    .order('created_at', { ascending: false })
    .limit(3);

  // Combine and sort recent activity
  const activities = [
    ...(recentContacts || []).map(c => ({
      id: `contact-${c.id}`,
      type: 'contact',
      title: `New contact enquiry from ${c.name}`,
      subtitle: `"${c.message.substring(0, 50)}${c.message.length > 50 ? '...' : ''}"`,
      date: new Date(c.created_at)
    })),
    ...(recentReferrals || []).map(r => ({
      id: `referral-${r.id}`,
      type: 'referral',
      title: `New referral received for ${r.participant_name}`,
      subtitle: `Service Requested: ${r.service_required}`,
      date: new Date(r.created_at)
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-text-primary">Overview</h1>
        <p className="text-text-secondary mt-1">Welcome back, {userEmail}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <FileText className="w-16 h-16 text-brand-primary" />
          </div>
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="p-2 bg-brand-surface-blue rounded-lg">
              <FileText className="w-5 h-5 text-brand-primary" />
            </div>
            <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Total Referrals</h2>
          </div>
          <p className="text-4xl font-bold text-text-primary relative z-10">{referralCount}</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <MessageSquare className="w-16 h-16 text-brand-magenta" />
          </div>
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="p-2 bg-brand-magenta rounded-lg">
              <MessageSquare className="w-5 h-5 text-brand-magenta" />
            </div>
            <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Contact Enquiries</h2>
          </div>
          <p className="text-4xl font-bold text-text-primary relative z-10">{contactCount}</p>
        </div>
      </div>
      
      <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
            <Activity className="w-5 h-5 text-gray-400" />
            Recent Activity
          </h3>
        </div>
        
        {/* Beautiful Activity Feed */}
        <div className="divide-y divide-gray-100">
          {activities.length === 0 ? (
            <div className="px-6 py-8 text-center text-text-secondary">
              No recent activity found.
            </div>
          ) : (
            activities.map(activity => (
              <div key={activity.id} className="px-6 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  activity.type === 'referral' ? 'bg-brand-surface-blue' : 'bg-brand-surface-pink'
                }`}>
                  {activity.type === 'referral' ? (
                    <FileText className="w-5 h-5 text-brand-primary" />
                  ) : (
                    <MessageSquare className="w-5 h-5 text-brand-magenta" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary">
                    {activity.title}
                  </p>
                  <p className="text-sm text-text-secondary mt-0.5">{activity.subtitle}</p>
                </div>
                <div className="text-xs text-text-muted whitespace-nowrap">{activity.date.toLocaleString()}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
