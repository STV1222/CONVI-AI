import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const changeLanguage = (lang: string) => {
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  const navItems = [
    { href: '/', label: t('dashboard') },
    { href: '/projects', label: t('projects') },
    { href: '/tasks', label: t('tasks') },
    { href: '/workers', label: t('workers') },
    { href: '/ai', label: t('ai_suggestions') },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">CONVI AI</h1>
        </div>
        <nav className="mt-6">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} legacyBehavior>
                  <a
                    className={`block px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 ${
                      router.pathname === item.href ? 'bg-gray-100 text-blue-600 font-semibold' : ''
                    }`}
                  >
                    {item.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200">
          <div className="flex space-x-2">
            <button
              onClick={() => changeLanguage('en')}
              className={`px-3 py-1 rounded ${
                router.locale === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage('zh-TW')}
              className={`px-3 py-1 rounded ${
                router.locale === 'zh-TW' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              繁中
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
