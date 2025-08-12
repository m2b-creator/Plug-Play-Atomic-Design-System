/**
 * Demo Layout Component
 * Provides consistent navigation and layout for all demo pages
 */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Header, Button, Icon, Text } from '@/components';
import type { NavigationItem } from '@/components';

export interface DemoLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function DemoLayout({ children, title, description }: DemoLayoutProps) {
  const pathname = usePathname();

  const navigationItems: NavigationItem[] = [
    { label: 'Home', href: '/', active: pathname === '/' },
    { label: 'Playground', href: '/playground', active: pathname === '/playground' },
    { label: 'Molecules', href: '/molecules', active: pathname === '/molecules' },
    { label: 'Organisms', href: '/organisms', active: pathname === '/organisms' },
    { label: 'Templates', href: '/templates', active: pathname === '/templates' },
    { label: 'Documentation', href: '/docs', active: pathname === '/docs' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Demo Navigation Header */}
      <Header
        logo={
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Text className="text-white font-bold text-sm">AP</Text>
            </div>
            <Text variant="h6" className="font-bold text-gray-900">
              AtomicPNP
            </Text>
          </Link>
        }
        navigation={navigationItems}
        actions={
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <Link href="https://github.com/atomicpnp/atomic-design-system" target="_blank" rel="noopener noreferrer">
                <Icon name="Github" size="sm" />
                <span className="hidden sm:inline ml-2">GitHub</span>
              </Link>
            </Button>
            <Button variant="primary" size="sm">
              <Link href="/docs">
                <Icon name="Book" size="sm" />
                <span className="hidden sm:inline ml-2">Docs</span>
              </Link>
            </Button>
          </div>
        }
        className="border-b border-gray-200"
        size="md"
        sticky
      />

      {/* Page Content */}
      <main className="flex-1">
        {(title || description) && (
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="container mx-auto px-6 py-12">
              <div className="max-w-4xl mx-auto text-center">
                {title && (
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        {children}
      </main>

      {/* Demo Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Text className="text-white font-bold text-sm">AP</Text>
                </div>
                <Text variant="h6" className="font-bold text-gray-900">
                  AtomicPNP
                </Text>
              </div>
              <Text variant="body" className="text-gray-600">
                A comprehensive atomic design system for Next.js applications.
              </Text>
            </div>
            
            <div className="space-y-4">
              <Text variant="h6" className="font-semibold text-gray-900">
                Components
              </Text>
              <div className="space-y-2">
                <Link href="/playground" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Atoms
                </Link>
                <Link href="/molecules" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Molecules
                </Link>
                <Link href="/organisms" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Organisms
                </Link>
                <Link href="/templates" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Templates
                </Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <Text variant="h6" className="font-semibold text-gray-900">
                Resources
              </Text>
              <div className="space-y-2">
                <Link href="/docs" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Documentation
                </Link>
                <Link href="https://github.com/atomicpnp/atomic-design-system" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  GitHub
                </Link>
                <Link href="/" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Examples
                </Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <Text variant="h6" className="font-semibold text-gray-900">
                Support
              </Text>
              <div className="space-y-2">
                <Link href="https://github.com/atomicpnp/atomic-design-system/issues" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Issues
                </Link>
                <Link href="https://github.com/atomicpnp/atomic-design-system/discussions" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Discussions
                </Link>
                <Link href="https://github.com/atomicpnp/atomic-design-system/blob/main/CONTRIBUTING.md" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Contributing
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <Text variant="caption" className="text-gray-500">
              © 2025 AtomicPNP. Built with ❤️ for the Next.js community.
            </Text>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Text variant="caption" className="text-gray-500">
                Next.js 15
              </Text>
              <Text variant="caption" className="text-gray-500">
                React 19
              </Text>
              <Text variant="caption" className="text-gray-500">
                TypeScript
              </Text>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}