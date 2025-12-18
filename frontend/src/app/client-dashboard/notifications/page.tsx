export default function ClientNotificationsPage() {
  // Responsive scaffold for client notifications
  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">All Notifications</h1>
      <div className="space-y-3 sm:space-y-4">
        {/* Replace with real data when available */}
        {[1, 2, 3].map((id) => (
          <div
            key={id}
            className="p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          >
            <p className="text-sm sm:text-base text-gray-900 dark:text-white">Sample notification #{id}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 hours ago</p>
          </div>
        ))}
      </div>
    </div>
  )
}