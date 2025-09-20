import GitHubAppService from "../services/githubAppService.js";

const checkAppInstallation = async (req, res, next) => {
  try {
    // Extract username from request (query param, header, or body)
    const username =
      req.query.username ||
      req.headers["x-github-username"] ||
      req.body.username;

    if (!username) {
      return res.status(400).json({
        success: false,
        error: "Username is required",
        message: "Please provide a GitHub username to check app installation",
      });
    }

    const githubAppService = new GitHubAppService();
    const isInstalled = await githubAppService.isAppInstalled(username);

    if (!isInstalled) {
      const installUrl = githubAppService.getInstallationUrl();

      return res.status(403).json({
        success: false,
        error: "GitHub App not installed",
        message: `SecureBot is not installed for user/organization: ${username}`,
        action_required: "Please install the GitHub App to continue",
        install_url: installUrl,
        username: username,
      });
    }

    // Add installation info to request for use in controllers
    const installation = await githubAppService.getInstallationByUsername(
      username
    );
    req.githubInstallation = installation;
    req.username = username;

    next();
  } catch (error) {
    console.error("Error checking app installation:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to check app installation",
      message: error.message,
    });
  }
};

export default checkAppInstallation;
