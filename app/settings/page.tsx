import Side from "@/src/components/Side";
import { AccountSettings } from "@stackframe/stack";

const Settings = async () => {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-50">
      <div className="order-1 w-full sm:w-64">
        <Side currentPath="/settings" />
      </div>

      <main className="order-2 flex-1 px-4 sm:px-6 lg:px-8 py-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500">
            Manage your account preferences, update profile information, and
            customize your dashboard settings.
          </p>
        </div>
        <div className="max-w-6xl">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <AccountSettings />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
