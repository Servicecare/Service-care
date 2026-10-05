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
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Settings className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">Settings Configuration</h2>
          <p className="text-text-secondary max-w-sm mb-6">
            Settings page is currently in development. Configuration options will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
