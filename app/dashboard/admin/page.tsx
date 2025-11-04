import React from 'react';

export default function AdminPage() {
  return (
    <div className="w-full">
      <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4">
        <p className="text-sm text-green-800">
          ✅ You have admin access! This page is protected by RBAC middleware.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-3">Admin Features</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✅ User management</li>
            <li>✅ System configuration</li>
            <li>✅ Advanced analytics</li>
            <li>✅ Audit logs</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-3">Security Info</h2>
          <div className="space-y-2 text-sm">
            <p className="text-gray-700">
              <strong>Access Level:</strong> Admin
            </p>
            <p className="text-gray-700">
              <strong>RBAC:</strong> Middleware-based
            </p>
            <p className="text-gray-600">
              This route is protected at the middleware level.
              Users without admin role are automatically redirected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

