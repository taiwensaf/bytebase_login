'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback, Suspense } from 'react';
import { GITHUB_AUTH_URL, getGitHubUser } from '@/utils/githubAuth';
import Link from 'next/link';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubCallback = useCallback(async (code: string) => {
    try {
      setIsLoading(true);
      const user = await getGitHubUser(code);
      
      // 存储用户信息到 localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      // 重定向到首页
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
      // 处理错误
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (code) {
      handleGitHubCallback(code);
    }
  }, [code, handleGitHubCallback]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* 左侧背景图 - 在移动端隐藏 */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="/bytebase_login/image3.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* 右侧登录区域 - 在移动端占满宽度 */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 py-8 lg:px-16 xl:px-24">
        <div className="w-full max-w-sm lg:max-w-md">
          {/* Logo 和标题区域 */}
          <div className="text-center mb-6 lg:mb-8">
            <img
              src="/bytebase_login/image1.png"
              alt="Bytebase Logo"
              width={160}
              height={40}
              className="mx-auto mb-4 lg:mb-6 w-32 lg:w-40"
            />
            <h1 className="text-xl lg:text-2xl font-semibold mb-2">欢迎</h1>
            <p className="text-sm lg:text-base text-gray-600">
              登录 Bytebase 以继续使用 Bytebase Hub。
            </p>
          </div>

          {/* 登录按钮区域 */}
          <div className="space-y-3 lg:space-y-4">
          <button
              onClick={() => {}}
              className="w-full flex items-center justify-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm lg:text-base"
            >
              <img
                src="/bytebase_login/google.png"
                alt="Google"
                width={18}
                height={18}
                className="lg:w-5 lg:h-5"
              />
              <span>继续使用 Google</span>
            </button>
            <button
              onClick={() => window.location.href = GITHUB_AUTH_URL}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm lg:text-base"
            >
              <img
                src="/bytebase_login/github.png"
                alt="GitHub"
                width={18}
                height={18}
                className="lg:w-5 lg:h-5"
              />
              <span>{isLoading ? '登录中...' : '继续使用 GitHub'}</span>
            </button>
            <button
              onClick={() => {}}
              className="w-full flex items-center justify-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm lg:text-base"
            >
              <img
                src="/bytebase_login/microsoft.png"
                alt="Microsoft"
                width={18}
                height={18}
                className="lg:w-5 lg:h-5"
              />
              <span>继续使用 Microsoft Account</span>
            </button>

            {/* 分隔线 */}
            <div className="relative my-6 lg:my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs lg:text-sm">
                <span className="px-4 bg-white text-gray-500">或</span>
              </div>
            </div>

            {/* 邮箱登录表单 */}
            <form className="space-y-3 lg:space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="电子邮件地址*"
                  className="w-full px-3 lg:px-4 py-2.5 lg:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6938EF] focus:border-transparent text-sm lg:text-base"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 lg:py-3 px-3 lg:px-4 bg-[#6938EF] text-white rounded-md hover:bg-[#5F31E1] transition-colors text-sm lg:text-base"
              >
                继续
              </button>
            </form>

            {/* 注册链接 */}
            <p className="text-center text-xs lg:text-sm text-gray-600 mt-6 lg:mt-8">
              没有帐户？{' '}
              <Link href="/register" className="text-[#6938EF] hover:underline">
                注册
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
} 