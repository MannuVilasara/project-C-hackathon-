import { App } from "octokit";
import dotenv from "dotenv";

dotenv.config();

class GitHubAppService {
  constructor() {
    if (!process.env.GITHUB_APP_ID || !process.env.GITHUB_PRIVATE_KEY) {
      throw new Error(
        "GitHub App configuration missing. Please set GITHUB_APP_ID and GITHUB_PRIVATE_KEY in your .env file"
      );
    }

    this.githubApp = new App({
      appId: process.env.GITHUB_APP_ID,
      privateKey: process.env.GITHUB_PRIVATE_KEY,
    });
  }

  /**
   * Get all installations of the GitHub App
   */
  async getInstallations() {
    try {
      const { data: installations } =
        await this.githubApp.octokit.rest.apps.listInstallations();
      return installations.map((installation) => ({
        id: installation.id,
        account: {
          login: installation.account.login,
          type: installation.account.type,
          avatar_url: installation.account.avatar_url,
        },
        created_at: installation.created_at,
        updated_at: installation.updated_at,
      }));
    } catch (error) {
      throw new Error(`Failed to get installations: ${error.message}`);
    }
  }

  /**
   * Check if the app is installed for a specific user/organization
   */
  async isAppInstalled(username) {
    try {
      const installations = await this.getInstallations();
      return installations.some(
        (installation) =>
          installation.account.login.toLowerCase() === username.toLowerCase()
      );
    } catch (error) {
      throw new Error(`Failed to check app installation: ${error.message}`);
    }
  }

  /**
   * Get installation by username
   */
  async getInstallationByUsername(username) {
    try {
      const installations = await this.getInstallations();
      return installations.find(
        (installation) =>
          installation.account.login.toLowerCase() === username.toLowerCase()
      );
    } catch (error) {
      throw new Error(
        `Failed to get installation for ${username}: ${error.message}`
      );
    }
  }

  /**
   * Get repositories accessible to a specific installation
   */
  async getRepositoriesForInstallation(installationId) {
    try {
      const octokit = await this.githubApp.getInstallationOctokit(
        installationId
      );
      const { data: repoData } =
        await octokit.rest.apps.listReposAccessibleToInstallation();

      return repoData.repositories.map((repo) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        private: repo.private,
        html_url: repo.html_url,
        clone_url: repo.clone_url,
        default_branch: repo.default_branch,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
      }));
    } catch (error) {
      throw new Error(
        `Failed to get repositories for installation ${installationId}: ${error.message}`
      );
    }
  }

  /**
   * Get all repositories across all installations
   */
  async getAllRepositories() {
    try {
      const installations = await this.getInstallations();
      const allRepositories = [];

      for (const installation of installations) {
        try {
          const repositories = await this.getRepositoriesForInstallation(
            installation.id
          );
          allRepositories.push({
            installation,
            repositories,
          });
        } catch (installationError) {
          console.error(
            `Error fetching repos for installation ${installation.id}:`,
            installationError.message
          );
        }
      }

      return allRepositories;
    } catch (error) {
      throw new Error(`Failed to get all repositories: ${error.message}`);
    }
  }

  /**
   * Find a repository by ID across all installations
   */
  async findRepositoryById(repoId) {
    try {
      const installations = await this.getInstallations();

      for (const installation of installations) {
        try {
          const repositories = await this.getRepositoriesForInstallation(
            installation.id
          );
          const foundRepo = repositories.find((repo) => repo.id === repoId);

          if (foundRepo) {
            return {
              repository: foundRepo,
              installation: installation,
            };
          }
        } catch (installationError) {
          console.error(
            `Error searching in installation ${installation.id}:`,
            installationError.message
          );
        }
      }

      return null;
    } catch (error) {
      throw new Error(`Failed to find repository ${repoId}: ${error.message}`);
    }
  }

  /**
   * Get installation access token for authenticated API calls
   */
  async getInstallationToken(installationId) {
    try {
      const octokit = await this.githubApp.getInstallationOctokit(
        installationId
      );
      const { data: tokenData } =
        await octokit.rest.apps.createInstallationAccessToken({
          installation_id: installationId,
        });

      return tokenData.token;
    } catch (error) {
      throw new Error(`Failed to get installation token: ${error.message}`);
    }
  }

  /**
   * Get installation octokit instance
   */
  async getInstallationOctokit(installationId) {
    try {
      return await this.githubApp.getInstallationOctokit(installationId);
    } catch (error) {
      throw new Error(`Failed to get installation octokit: ${error.message}`);
    }
  }

  /**
   * Create a pull request
   */
  async createPullRequest(
    installationId,
    owner,
    repo,
    { title, head, base, body }
  ) {
    try {
      const octokit = await this.getInstallationOctokit(installationId);

      const { data: pullRequest } = await octokit.rest.pulls.create({
        owner,
        repo,
        title,
        head,
        base,
        body,
      });

      return pullRequest;
    } catch (error) {
      throw new Error(`Failed to create pull request: ${error.message}`);
    }
  }

  /**
   * Get app installation URL
   */
  getInstallationUrl() {
    return (
      process.env.GITHUB_APP_INSTALL_URL ||
      `https://github.com/apps/${process.env.GITHUB_APP_ID}/installations/new`
    );
  }
}

export default GitHubAppService;
