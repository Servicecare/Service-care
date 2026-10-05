import { Settings } from "lucide-react";

export const metadata = {
  title: "Settings | Admin Dashboard",
};

export default function SettingsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-heading text-text-primary">Platform Settings</h1>
          <p className="text-text-secondary mt-1">Manage admin configuration and settings.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200 p-6 flex flex-col gap-2">
          <button className="text-left px-4 py-2.5 rounded-lg text-sm font-semibold bg-brand-surface-blue text-brand-primary">
            General Profile
          </button>
          <button className="text-left px-4 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-gray-100 hover:text-text-primary transition-colors">
            Email Notifications
          </button>
          <button className="text-left px-4 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-gray-100 hover:text-text-primary transition-colors">
            Security & Login
          </button>
        </div>

        {/* Settings Form */}
        <div className="flex-1 p-8">
          <h3 className="text-xl font-bold text-text-primary mb-6">General Profile</h3>
          
          <form className="space-y-6 max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-text-primary">First Name</label>
                <input 
                  type="text" 
                  defaultValue="Admin" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-focus focus:border-brand-primary transition-all text-sm outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-text-primary">Last Name</label>
                <input 
                  type="text" 
                  defaultValue="User" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-focus focus:border-brand-primary transition-all text-sm outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-text-primary">Administrator Email</label>
              <input 
                type="email" 
                defaultValue="admin@lifecare.com" 
                disabled
                className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg text-sm text-text-muted outline-none cursor-not-allowed"
              />
              <p className="text-xs text-text-muted mt-1">Email cannot be changed directly. Contact IT support.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-text-primary">Timezone</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-focus focus:border-brand-primary transition-all text-sm outline-none bg-white">
                <option>Australia/Sydney (AEST/AEDT)</option>
                <option>Australia/Melbourne (AEST/AEDT)</option>
                <option>Australia/Brisbane (AEST)</option>
              </select>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
              <button type="button" className="px-5 py-2 rounded-lg font-medium text-sm text-text-secondary hover:bg-gray-100 transition-colors">
                Cancel
              </button>
              <button type="button" className="px-5 py-2 rounded-lg font-medium text-sm bg-brand-primary text-white hover:bg-brand-primary-dark transition-colors shadow-sm">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
