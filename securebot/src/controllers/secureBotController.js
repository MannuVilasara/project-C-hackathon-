import GitHubAppService from "../services/githubAppService.js";
import RepositoryService from "../services/repositoryService.js";
import SecurityService from "../services/securityService.js";

class SecureBotController {
  constructor() {
    this.githubAppService = new GitHubAppService();
    this.repositoryService = new RepositoryService(this.githubAppService);
    this.securityService = new SecurityService();
  }

  /**
   * Get app installation status and available repositories
   */
  async getInstallationStatus(req, res) {
    try {
      const { username } = req.query;

      if (!username) {
        return res.status(400).json({
          success: false,
          error: "Username is required",
        });
      }

      const isInstalled = await this.githubAppService.isAppInstalled(username);

      if (!isInstalled) {
        const installUrl = this.githubAppService.getInstallationUrl();

        return res.json({
          success: false,
          installed: false,
          message: `SecureBot is not installed for ${username}`,
          install_url: installUrl,
          username: username,
        });
      }

      const installation =
        await this.githubAppService.getInstallationByUsername(username);
      const repositories =
        await this.githubAppService.getRepositoriesForInstallation(
          installation.id
        );

      return res.json({
        success: true,
        installed: true,
        installation: {
          id: installation.id,
          account: installation.account,
        },
        repositories: repositories,
        repository_count: repositories.length,
      });
    } catch (error) {
      console.error("Error checking installation status:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to check installation status",
        message: error.message,
      });
    }
  }

  /**
   * Get user repositories by GitHub username
   */
  async getUserRepositories(req, res) {
    try {
      const { username } = req.params;

      if (!username) {
        return res.status(400).json({
          success: false,
          error: "Username is required",
        });
      }

      // Check if app is installed for this user
      const isInstalled = await this.githubAppService.isAppInstalled(username);

      if (!isInstalled) {
        const installUrl = this.githubAppService.getInstallationUrl();

        return res.json({
          success: false,
          installed: false,
          message: `SecureBot is not installed for ${username}`,
          install_url: installUrl,
          username: username,
          repositories: [],
          repository_count: 0,
        });
      }

      // Get installation and repositories
      const installation =
        await this.githubAppService.getInstallationByUsername(username);
      const repositories =
        await this.githubAppService.getRepositoriesForInstallation(
          installation.id
        );

      // Format repositories with additional security info
      const formattedRepos = repositories.map((repo) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        private: repo.private,
        language: repo.language,
        html_url: repo.html_url,
        clone_url: repo.clone_url,
        ssh_url: repo.ssh_url,
        updated_at: repo.updated_at,
        created_at: repo.created_at,
        size: repo.size,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        default_branch: repo.default_branch,
        // Add security status indicators
        security_status: {
          scanned: false, // TODO: Check if repository has been scanned
          last_scan: null, // TODO: Get last scan date
          issues_found: 0, // TODO: Get number of security issues
          protection_enabled: true, // SecureBot is installed
        },
      }));

      return res.json({
        success: true,
        installed: true,
        username: username,
        installation: {
          id: installation.id,
          account: installation.account,
        },
        repositories: formattedRepos,
        repository_count: formattedRepos.length,
      });
    } catch (error) {
      console.error("Error getting user repositories:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to get user repositories",
        message: error.message,
      });
    }
  }

  /**
   * Scan a repository for security issues
   */
  async scanRepository(req, res) {
    try {
      const { repoId, username } = req.body;

      if (!repoId || !username) {
        return res.status(400).json({
          success: false,
          error: "Repository ID and username are required",
        });
      }

      // Check if app is installed
      const isInstalled = await this.githubAppService.isAppInstalled(username);
      if (!isInstalled) {
        const installUrl = this.githubAppService.getInstallationUrl();
        return res.status(403).json({
          success: false,
          error: "GitHub App not installed",
          install_url: installUrl,
        });
      }

      // Clone repository if not already cloned
      console.log(`🔄 Cloning repository with ID: ${repoId}`);
      const cloneResult = await this.repositoryService.cloneRepository(repoId);

      // Scan for security issues
      console.log(`🔍 Scanning repository: ${cloneResult.repository.name}`);
      const scanResults = await this.securityService.scanRepository(
        cloneResult.localPath
      );

      return res.json({
        success: true,
        message: "Repository scanned successfully",
        repository: {
          id: cloneResult.repository.id,
          name: cloneResult.repository.name,
          full_name: cloneResult.repository.full_name,
          local_path: cloneResult.localPath,
        },
        scan_results: scanResults,
        clone_action: cloneResult.action,
      });
    } catch (error) {
      console.error("Error scanning repository:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to scan repository",
        message: error.message,
      });
    }
  }

  /**
   * Fix security issues and create pull request
   */
  async fixAndCreatePR(req, res) {
    try {
      const { repoId, username } = req.body;

      if (!repoId || !username) {
        return res.status(400).json({
          success: false,
          error: "Repository ID and username are required",
        });
      }

      // Set long timeout for this operation
      req.setTimeout(600000); // 10 minutes
      res.setTimeout(600000);

      // Check if app is installed
      const isInstalled = await this.githubAppService.isAppInstalled(username);
      if (!isInstalled) {
        const installUrl = this.githubAppService.getInstallationUrl();
        return res.status(403).json({
          success: false,
          error: "GitHub App not installed",
          install_url: installUrl,
        });
      }

      // Clone repository if not already cloned
      console.log(`🔄 Preparing repository with ID: ${repoId}`);
      const cloneResult = await this.repositoryService.cloneRepository(repoId);

      // Scan for security issues
      console.log(`🔍 Scanning repository: ${cloneResult.repository.name}`);
      const scanResults = await this.securityService.scanRepository(
        cloneResult.localPath
      );

      if (scanResults.issues.length === 0) {
        return res.json({
          success: true,
          message: "No security issues found",
          repository: {
            id: cloneResult.repository.id,
            name: cloneResult.repository.name,
            full_name: cloneResult.repository.full_name,
          },
          scan_results: scanResults,
          fix_results: null,
          pull_request: null,
        });
      }

      // Apply fixes
      console.log(`🔧 Fixing ${scanResults.issues.length} security issues`);
      const fixResults = await this.securityService.fixRepository(
        cloneResult.localPath,
        scanResults.issues
      );

      if (fixResults.appliedFixes.length === 0) {
        return res.json({
          success: true,
          message: "No fixes could be applied automatically",
          repository: {
            id: cloneResult.repository.id,
            name: cloneResult.repository.name,
            full_name: cloneResult.repository.full_name,
          },
          scan_results: scanResults,
          fix_results: fixResults,
          pull_request: null,
        });
      }

      // Create branch and commit changes
      const branchName = `securebot-fixes-${Date.now()}`;
      console.log(`🌿 Creating branch: ${branchName}`);

      await this.repositoryService.createFixBranch(
        cloneResult.localPath,
        branchName
      );

      const commitResult = await this.repositoryService.commitAndPushChanges(
        cloneResult.localPath,
        branchName,
        `🔒 SecureBot: Fix ${
          fixResults.appliedFixes.length
        } security vulnerabilities

- Fixed ${fixResults.summary.successful} security issues
- Success rate: ${fixResults.summary.successRate}
- Issues addressed: ${fixResults.appliedFixes.map((f) => f.issue).join(", ")}

Automated security fixes by SecureBot`
      );

      if (!commitResult.hasChanges) {
        return res.json({
          success: true,
          message: "No changes to commit",
          repository: {
            id: cloneResult.repository.id,
            name: cloneResult.repository.name,
            full_name: cloneResult.repository.full_name,
          },
          scan_results: scanResults,
          fix_results: fixResults,
          pull_request: null,
        });
      }

      // Create pull request
      console.log(`📤 Creating pull request for fixes`);
      const pullRequest = await this.repositoryService.createPullRequest(
        cloneResult.repository,
        cloneResult.installation,
        branchName,
        fixResults
      );

      return res.json({
        success: true,
        message: "Security fixes applied and pull request created successfully",
        repository: {
          id: cloneResult.repository.id,
          name: cloneResult.repository.name,
          full_name: cloneResult.repository.full_name,
          local_path: cloneResult.localPath,
        },
        scan_results: scanResults,
        fix_results: fixResults,
        pull_request: {
          id: pullRequest.id,
          number: pullRequest.number,
          title: pullRequest.title,
          html_url: pullRequest.html_url,
          branch: branchName,
          state: pullRequest.state,
        },
        summary: {
          issues_found: scanResults.issues.length,
          fixes_applied: fixResults.appliedFixes.length,
          success_rate: fixResults.summary.successRate,
          pull_request_created: true,
        },
      });
    } catch (error) {
      console.error("Error fixing repository and creating PR:", error);

      // Handle specific error types
      if (error.message.includes("GOOGLE_AI_API_KEY")) {
        return res.status(500).json({
          success: false,
          error: "AI service configuration error",
          message: "Google AI API key is missing or invalid",
          solution: "Please set GOOGLE_AI_API_KEY in your .env file",
        });
      }

      if (
        error.message.includes("quota") ||
        error.message.includes("rate limit")
      ) {
        return res.status(429).json({
          success: false,
          error: "AI service rate limit exceeded",
          message: error.message,
          solution: "Please try again in a few minutes",
        });
      }

      return res.status(500).json({
        success: false,
        error: "Failed to fix repository and create PR",
        message: error.message,
      });
    }
  }

  /**
   * Get list of cloned repositories
   */
  async getClonedRepositories(req, res) {
    try {
      const clonedRepos = this.repositoryService.getClonedRepositories();

      return res.json({
        success: true,
        count: clonedRepos.length,
        cloned_repositories: clonedRepos,
      });
    } catch (error) {
      console.error("Error getting cloned repositories:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to get cloned repositories",
        message: error.message,
      });
    }
  }
}

export default SecureBotController;
