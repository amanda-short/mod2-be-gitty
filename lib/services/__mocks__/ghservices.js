const exchangeCodeForToken = async () => {
  return 'mock code';
};

const getGithubProfile = async () => {
  return {
    login: 'mock_github_user',
    avatar: 'https://www.placecage.com/gif',
    email: 'mock-email@example.com',
  };
};

module.exports = { exchangeCodeForToken, getGithubProfile };
