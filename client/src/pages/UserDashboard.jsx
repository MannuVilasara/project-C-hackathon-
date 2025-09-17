import React, { useContext } from 'react';
import appContext from '../context/AppContext';

const UserDashboard = () => {
  const { user } = useContext(appContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {user?.username || 'User'}!
            </h1>
            <p className="text-gray-400">
              Manage your SecureAuth account and security settings
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Account Overview */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Account Overview</h3>
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-2">
                <p className="text-gray-300">Email: <span className="text-white">{user?.email}</span></p>
                <p className="text-gray-300">Status: <span className="text-green-400">Active</span></p>
                <p className="text-gray-300">Member Since: <span className="text-white">Sep 2025</span></p>
              </div>
            </div>

            {/* Security Status */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Security Status</h3>
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="space-y-2">
                <p className="text-gray-300">Two-Factor Auth: <span className="text-green-400">Enabled</span></p>
                <p className="text-gray-300">Last Login: <span className="text-white">Today</span></p>
                <p className="text-gray-300">Login Alerts: <span className="text-green-400">On</span></p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-2">
                <p className="text-gray-300">Login from new device</p>
                <p className="text-gray-300">Password updated</p>
                <p className="text-gray-300">Email verified</p>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            
            {/* Quick Actions */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 text-white">
                  Update Profile Information
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 text-white">
                  Change Password
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 text-white">
                  Download Security Report
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Notifications</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <p className="text-blue-400 text-sm">Welcome to SecureAuth!</p>
                  <p className="text-gray-300 text-xs mt-1">Your account has been successfully created.</p>
                </div>
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                  <p className="text-green-400 text-sm">Security Check Passed</p>
                  <p className="text-gray-300 text-xs mt-1">All security protocols are active.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
