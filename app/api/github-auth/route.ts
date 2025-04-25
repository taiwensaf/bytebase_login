import { NextResponse } from 'next/server';

//GitHub 邮箱信息接口
interface GitHubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
}

/**
 * GitHub OAuth 回调处理
 * @param request - 包含授权码的请求
 * @returns NextResponse - 包含用户信息的响应
 */
export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    
    // 获取 access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        code,
      }),
    });

    const { access_token } = await tokenResponse.json();

    // 获取用户信息
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user = await userResponse.json();

    // 获取用户邮箱
    const emailResponse = await fetch('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const emails: GitHubEmail[] = await emailResponse.json();
    const primaryEmail = emails.find(email => email.primary)?.email;

    return NextResponse.json({
      ...user,
      email: primaryEmail,
    });
  } catch (error) {
    console.error('GitHub auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
} 