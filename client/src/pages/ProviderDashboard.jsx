import React, { useContext } from 'react';
import appContext from '../context/AppContext';

const ProviderDashboard = () => {
  const { user } = useContext(appContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Service Provider Dashboard
            </h1>
            <p className="text-gray-400">
              Manage your services, clients, and security integrations
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            
            {/* Active Services */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-400 text-sm font-medium">Active Services</p>
                  <p className="text-3xl font-bold text-white">24</p>
                </div>
                <div className="bg-cyan-500/30 p-3 rounded-full">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Clients */}
            <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 backdrop-blur-xl rounded-2xl p-6 border border-emerald-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-400 text-sm font-medium">Total Clients</p>
                  <p className="text-3xl font-bold text-white">156</p>
                </div>
                <div className="bg-emerald-500/30 p-3 rounded-full">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Monthly Revenue */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 backdrop-blur-xl rounded-2xl p-6 border border-yellow-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-400 text-sm font-medium">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-white">$12.5k</p>
                </div>
                <div className="bg-yellow-500/30 p-3 rounded-full">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>

            {/* API Calls */}
            <div className="bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 backdrop-blur-xl rounded-2xl p-6 border border-indigo-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-400 text-sm font-medium">API Calls Today</p>
                  <p className="text-3xl font-bold text-white">8.2k</p>
                </div>
                <div className="bg-indigo-500/30 p-3 rounded-full">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Management Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* Service Management */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                </svg>
                Service Management
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 text-white flex items-center justify-between">
                  <span>Deploy New Service</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 text-white flex items-center justify-between">
                  <span>Monitor Services</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 text-white flex items-center justify-between">
                  <span>API Documentation</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Client Management */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Client Management
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 text-white flex items-center justify-between">
                  <span>Client List</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 text-white flex items-center justify-between">
                  <span>Usage Analytics</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 text-white flex items-center justify-between">
                  <span>Billing & Invoices</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Service Activities</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div>
                  <p className="text-white">New client integration: TechCorp API</p>
                  <p className="text-gray-400 text-sm">15 minutes ago</p>
                </div>
                <span className="text-green-400 text-sm">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div>
                  <p className="text-white">Service update deployed: Auth Service v2.1</p>
                  <p className="text-gray-400 text-sm">1 hour ago</p>
                </div>
                <span className="text-blue-400 text-sm">Deployed</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div>
                  <p className="text-white">Monthly billing processed: $12,500</p>
                  <p className="text-gray-400 text-sm">2 hours ago</p>
                </div>
                <span className="text-yellow-400 text-sm">Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
