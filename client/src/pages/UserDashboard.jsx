import React, { useContext, useState } from 'react';
import appContext from '../context/AppContext';
import toast from 'react-hot-toast';

const UserDashboard = () => {
  const { user } = useContext(appContext);
  const [connectedRepos, setConnectedRepos] = useState([]);

  
  const handleGitHubAuth = () => {
    
    toast.success('GitHub OAuth integration coming soon!');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 pt-16 relative">
      <div className="fixed inset-0 z-0">
        <img 
          src="/background-auth.webp" 
          alt="Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          
          
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {user?.username || 'User'}!
            </h1>
            <p className="text-gray-400">
              Manage your repositories and monitor security across your services
            </p>
          </div>

          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              

              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Profile Details</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm">Username</p>
                    <p className="text-white font-medium">{user?.username || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-medium">{user?.email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Role</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 capitalize">
                      {user?.role || 'user'}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Member Since</p>
                    <p className="text-white font-medium">
                      {user?.createdAt ? formatDate(user.createdAt) : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>


              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Security Status</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Account Status</span>
                    <span className="text-green-400 font-medium">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Protected Repos</span>
                    <span className="text-white font-medium">{connectedRepos.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">GitHub Connected</span>
                    <span className="text-red-400 font-medium">Not Connected</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Last Security Scan</span>
                    <span className="text-gray-400 font-medium">Never</span>
                  </div>
                </div>
              </div>


              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Protection Stats</h3>
                </div>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400">0</div>
                    <div className="text-gray-400 text-sm">Vulnerabilities Fixed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">0</div>
                    <div className="text-gray-400 text-sm">Pending Patches</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">100%</div>
                    <div className="text-gray-400 text-sm">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Login Activity</h2>
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black/20">
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-4 px-6 text-gray-300 font-medium">Date & Time</th>
                      <th className="text-left py-4 px-6 text-gray-300 font-medium">Location</th>
                      <th className="text-left py-4 px-6 text-gray-300 font-medium">Device</th>
                      <th className="text-left py-4 px-6 text-gray-300 font-medium">IP Address</th>
                      <th className="text-left py-4 px-6 text-gray-300 font-medium">ISP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user?.loginHistory && user.loginHistory.length > 0 ? (
                      user.loginHistory.slice(0, 5).map((login, index) => (
                        <tr key={index} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-6 text-white">
                            {login.loggedInAt ? formatDate(login.loggedInAt) : 'N/A'}
                          </td>
                          <td className="py-4 px-6 text-gray-300">
                            {login.location ? 
                              `${login.location.city || ''}, ${login.location.region || ''}, ${login.location.country || ''}`.replace(/^,\s*|,\s*$/g, '') 
                              : 'Unknown'
                            }
                          </td>
                          <td className="py-4 px-6 text-gray-300">
                            {login.device ? 
                              `${login.device.browser || 'Unknown'} on ${login.device.os || 'Unknown'}` 
                              : 'Unknown Device'
                            }
                          </td>
                          <td className="py-4 px-6 text-gray-300 font-mono">
                            {login.ip || 'N/A'}
                          </td>
                          <td className="py-4 px-6 text-gray-300">
                            {login.isp || 'Unknown'}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-8 px-6 text-center text-gray-400">
                          No login history available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>


          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Repository Protection</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
            
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">GitHub Integration</h3>
                    <p className="text-gray-400 text-sm">Connect your repositories for automatic protection</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
                      <span className="text-red-400 font-medium">Not Connected</span>
                    </div>
                    <button 
                      onClick={handleGitHubAuth}
                      className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Authorize GitHub
                    </button>
                  </div>

                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <h4 className="text-blue-400 font-medium mb-2">Why Connect GitHub?</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• Automatic vulnerability scanning</li>
                      <li>• Instant security patch deployment</li>
                      <li>• Real-time threat monitoring</li>
                      <li>• Zero-day protection via Pull Requests</li>
                    </ul>
                  </div>
                </div>
              </div>


              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Protected Repositories</h3>
                      <p className="text-gray-400 text-sm">Repositories under SecureAuth protection</p>
                    </div>
                  </div>
                </div>

                {connectedRepos.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="text-gray-400 mb-4">No repositories connected yet</p>
                    <p className="text-gray-500 text-sm">Connect your GitHub account to start protecting your repositories</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {connectedRepos.map((repo, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{repo.name}</p>
                          <p className="text-gray-400 text-sm">{repo.description}</p>
                        </div>
                        <div className="flex items-center text-green-400">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          <span className="text-sm font-medium">Protected</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;