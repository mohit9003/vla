export default function Profile() {
  return (
    <div className="min-h-screen bg-light dark:bg-dark p-8 font-poppins">
      <h1 className="text-3xl font-bold mb-6 text-primary">👤 My Profile</h1>
      <div className="bg-white dark:bg-gray-900 shadow-smooth rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-sm opacity-70">Name</label>
          <input className="w-full p-2 rounded-xl border bg-gray-50 dark:bg-gray-800" value="Mohit Tiwari" readOnly />
        </div>
        <div>
          <label className="block text-sm opacity-70">Email</label>
          <input className="w-full p-2 rounded-xl border bg-gray-50 dark:bg-gray-800" value="mohit@example.com" readOnly />
        </div>
        <div>
          <label className="block text-sm opacity-70">Role</label>
          <input className="w-full p-2 rounded-xl border bg-gray-50 dark:bg-gray-800" value="Student" readOnly />
        </div>
      </div>
    </div>
  );
}
