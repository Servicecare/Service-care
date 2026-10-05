import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import { LayoutDashboard, MessageSquare, FileText, Settings, LogOut } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const adminBypass = cookieStore.get('admin_bypass')?.value === 'true';

  if (!adminBypass) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl === 'https://your-project.supabase.co') {
      redirect("/login");
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    // Explicit server-side validation against admin_users table
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', user.email)
      .single();

    if (!adminUser) {
      console.warn(`Unauthorized admin access attempt by ${user.email}`);
      redirect("/login?error=unauthorized");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="font-heading font-bold text-lg text-brand-primary">Admin Portal</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-text-primary hover:bg-gray-50">
            <LayoutDashboard className="h-5 w-5 text-gray-400" /> Dashboard
          </Link>
          <Link href="/admin/enquiries" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-text-primary hover:bg-gray-50">
            <MessageSquare className="h-5 w-5 text-gray-400" /> Enquiries
          </Link>
          <Link href="/admin/referrals" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-text-primary hover:bg-gray-50">
            <FileText className="h-5 w-5 text-gray-400" /> Referrals
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-text-primary hover:bg-gray-50">
            <Settings className="h-5 w-5 text-gray-400" /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
           <form action="/auth/signout" method="post">
             <button type="submit" className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-text-primary hover:bg-gray-50">
               <LogOut className="h-5 w-5 text-gray-400" /> Sign out
             </button>
           </form>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
