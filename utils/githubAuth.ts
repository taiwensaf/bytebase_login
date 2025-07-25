//检查 GitHub Client ID 是否设置
if (!process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID) {
  console.error('GitHub Client ID is not set. Please check your environment variables.');
}

//GitHub OAuth 客户端 ID
export const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID;

//检查 GitHub Client ID 是否为空
if (!GITHUB_CLIENT_ID) {
  console.error('GitHub Client ID is empty. OAuth will not work.');
}

//GitHub OAuth 授权 URL
export const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email`;

/**
 * 获取 GitHub 用户信息
 * @param code - GitHub OAuth 回调返回的授权码
 * @returns Promise<GitHubUser> - GitHub 用户信息
 */
export const getGitHubUser = async (code: string) => {
  try {
    const response = await fetch('/api/github-auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error('Failed to get GitHub user');
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting GitHub user:', error);
    throw error;
  }
}; 