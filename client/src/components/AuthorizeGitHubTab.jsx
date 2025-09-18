import React from 'react';
import toast from 'react-hot-toast';

const AuthorizeGitHubTab = ({ connectedRepos }) => {
  const handleGitHubAuth = () => {
    toast.success('GitHub OAuth integration coming soon!');
  };

  return (
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
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
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
  );
};

export default AuthorizeGitHubTab;