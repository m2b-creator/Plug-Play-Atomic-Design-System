'use client';

import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { Header, Sidebar, Footer } from '../organisms';
import type { NavigationItem, UserMenuAction, SidebarSection } from '../organisms';
import type { ComponentSize } from '@/types';
import { cn } from '@/utils';

export interface DashboardLayoutProps {
  /** Main content to render */
  children: ReactNode;
  /** Header configuration */
  header?: {
    logo?: ReactNode;
    navigation?: NavigationItem[];
    user?: {
      name: string;
      email?: string;
      avatar?: string;
    };
    userMenuActions?: UserMenuAction[];
    actions?: ReactNode;
    size?: ComponentSize;
  };
  /** Sidebar configuration */
  sidebar?: {
    sections: SidebarSection[];
    collapsed?: boolean;
    collapsible?: boolean;
    onCollapseChange?: (collapsed: boolean) => void;
    header?: ReactNode;
    footer?: ReactNode;
    width?: 'sm' | 'md' | 'lg' | 'xl';
  };
  /** Footer configuration */
  footer?: {
    brand?: ReactNode;
    description?: string;
    copyright?: string;
    variant?: 'simple' | 'detailed' | 'minimal';
  };
  /** Whether sidebar is always hidden */
  hideSidebar?: boolean;
  /** Whether footer is hidden */
  hideFooter?: boolean;
  /** Layout size variant */
  size?: ComponentSize;
  /** Whether layout has fixed header */
  stickyHeader?: boolean;
  /** Background color variant */
  background?: 'white' | 'gray' | 'slate';
  /** Whether to show mobile sidebar overlay */
  mobileOverlay?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const backgroundClasses = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  slate: 'bg-slate-50',
};

export const DashboardLayout = ({
  children,
  header,
  sidebar,
  footer,
  hideSidebar = false,
  hideFooter = false,
  size = 'md',
  stickyHeader = true,
  background = 'gray',
  mobileOverlay = true,
  className,
  'data-test-id': testId,
}: DashboardLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Handle sidebar collapse
  const handleSidebarCollapse = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
    sidebar?.onCollapseChange?.(collapsed);
  };

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerClasses = cn(
    'min-h-screen flex flex-col',
    backgroundClasses[background],
    className
  );

  const mainLayoutClasses = cn(
    'flex flex-1',
    !hideSidebar && 'relative'
  );

  const contentClasses = cn(
    'flex-1 flex flex-col',
    'transition-all duration-300 ease-in-out',
    !hideSidebar && !sidebarCollapsed && 'lg:pl-0',
    !hideSidebar && sidebarCollapsed && 'lg:pl-0'
  );

  const mainContentClasses = cn(
    'flex-1 p-6 lg:p-8',
    'overflow-x-auto'
  );

  const renderHeader = () => {
    if (!header) return null;

    return (
      <Header
        {...header}
        sticky={stickyHeader}
        showMobileMenu={!hideSidebar}
        onMobileMenuToggle={setIsMobileMenuOpen}
        mobileMenuOpen={isMobileMenuOpen}
        size={header.size || size}
      />
    );
  };

  const renderSidebar = () => {
    if (hideSidebar || !sidebar) return null;

    return (
      <>
        {/* Desktop Sidebar */}
        <div className="hidden lg:block fixed inset-y-0 left-0 z-30">
          <Sidebar
            {...sidebar}
            collapsed={sidebar.collapsed !== undefined ? sidebar.collapsed : sidebarCollapsed}
            onCollapseChange={handleSidebarCollapse}
            size={size}
            className={cn(
              'h-full',
              stickyHeader && 'pt-16'
            )}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileOverlay && (
          <>
            {/* Backdrop */}
            {isMobileMenuOpen && (
              <div
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
              />
            )}

            {/* Mobile Sidebar */}
            <div
              className={cn(
                'lg:hidden fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out',
                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
              )}
            >
              <Sidebar
                {...sidebar}
                collapsed={false}
                collapsible={false}
                size={size}
                className={cn(
                  'h-full shadow-xl',
                  stickyHeader && 'pt-16'
                )}
              />
            </div>
          </>
        )}
      </>
    );
  };

  const renderFooter = () => {
    if (hideFooter || !footer) return null;

    return (
      <Footer
        {...footer}
        size={size}
      />
    );
  };

  return (
    <div className={containerClasses} data-test-id={testId}>
      {renderHeader()}
      
      <div className={mainLayoutClasses}>
        {renderSidebar()}
        
        <div
          className={cn(
            contentClasses,
            !hideSidebar && !sidebarCollapsed && 'lg:ml-64',
            !hideSidebar && sidebarCollapsed && 'lg:ml-16'
          )}
        >
          <main
            className={mainContentClasses}
            role="main"
            aria-label="Main content"
          >
            {children}
          </main>
          
          {renderFooter()}
        </div>
      </div>
    </div>
  );
};

DashboardLayout.displayName = 'DashboardLayout';