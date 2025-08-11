'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { Button, Icon, Link, Avatar } from '../atoms';
import { Dropdown, MenuItem } from '../molecules';
import type { ComponentSize } from '@/types';
import { cn, transitionClasses } from '@/utils';

export interface NavigationItem {
  /** Navigation item label */
  label: string;
  /** Navigation item URL */
  href: string;
  /** Whether the item is active */
  active?: boolean;
  /** Optional icon */
  icon?: ReactNode;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Sub-navigation items */
  children?: NavigationItem[];
}

export interface UserMenuAction {
  /** Action label */
  label: string;
  /** Action handler */
  onClick?: () => void;
  /** Optional href for navigation */
  href?: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Whether the action is destructive */
  destructive?: boolean;
  /** Whether to show a divider after this item */
  divider?: boolean;
}

export interface HeaderProps {
  /** Logo content or brand name */
  logo?: ReactNode;
  /** Navigation items */
  navigation?: NavigationItem[];
  /** User information */
  user?: {
    name: string;
    email?: string;
    avatar?: string;
  };
  /** User menu actions */
  userMenuActions?: UserMenuAction[];
  /** Header size variant */
  size?: ComponentSize;
  /** Whether the header is sticky */
  sticky?: boolean;
  /** Whether to show mobile menu button */
  showMobileMenu?: boolean;
  /** Callback when mobile menu is toggled */
  onMobileMenuToggle?: (open: boolean) => void;
  /** Whether mobile menu is open */
  mobileMenuOpen?: boolean;
  /** Additional actions on the right side */
  actions?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const headerSizeClasses = {
  xs: 'h-12 px-3',
  sm: 'h-14 px-4',
  md: 'h-16 px-6',
  lg: 'h-18 px-8',
  xl: 'h-20 px-10',
};

const logoSizeClasses = {
  xs: 'text-lg',
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-4xl',
};

export const Header = ({
  logo,
  navigation = [],
  user,
  userMenuActions = [],
  size = 'md',
  sticky = true,
  showMobileMenu = true,
  onMobileMenuToggle,
  mobileMenuOpen = false,
  actions,
  className,
  'data-test-id': testId,
}: HeaderProps) => {
  const [internalMobileMenuOpen, setInternalMobileMenuOpen] = useState(false);

  // Use controlled or uncontrolled mobile menu state
  const isMobileMenuOpen = mobileMenuOpen !== undefined ? mobileMenuOpen : internalMobileMenuOpen;
  const setMobileMenuOpen = (open: boolean) => {
    if (mobileMenuOpen === undefined) {
      setInternalMobileMenuOpen(open);
    }
    onMobileMenuToggle?.(open);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const baseClasses = cn(
    'w-full bg-white border-b border-gray-200 z-40',
    sticky && 'sticky top-0',
    transitionClasses
  );

  const containerClasses = cn(
    'flex items-center justify-between',
    'max-w-7xl mx-auto',
    headerSizeClasses[size],
    className
  );

  const renderLogo = () => {
    if (!logo) return null;

    return (
      <div className={cn('flex-shrink-0 flex items-center', logoSizeClasses[size])}>
        {typeof logo === 'string' ? (
          <Link href="/" className="font-bold text-gray-900 hover:text-gray-700">
            {logo}
          </Link>
        ) : (
          logo
        )}
      </div>
    );
  };

  const renderNavigation = () => {
    if (!navigation.length) return null;

    return (
      <nav className="hidden md:flex md:space-x-8" aria-label="Main navigation">
        {navigation.map((item, index) => (
          <div key={index} className="relative">
            {item.children ? (
              <Dropdown
                trigger={
                  <Button
                    variant="ghost"
                    size={size}
                    disabled={item.disabled}
                    className={cn(
                      'text-gray-700 hover:text-gray-900',
                      item.active && 'text-blue-600 font-medium'
                    )}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                    <Icon name="ChevronDown" size="sm" className="ml-1" />
                  </Button>
                }
              >
                {item.children.map((subItem, subIndex) => (
                  <MenuItem
                    key={subIndex}
                    leftIcon={subItem.icon}
                    disabled={subItem.disabled}
                    selected={subItem.active}
                    onClick={() => !subItem.disabled && window.location.assign(subItem.href)}
                  >
                    {subItem.label}
                  </MenuItem>
                ))}
              </Dropdown>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  'inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors',
                  item.disabled 
                    ? 'text-gray-400 cursor-not-allowed'
                    : item.active
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-gray-900 hover:border-b-2 hover:border-gray-300'
                )}
                aria-current={item.active ? 'page' : undefined}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    );
  };

  const renderUserMenu = () => {
    if (!user) return null;

    const defaultActions: UserMenuAction[] = [
      { label: 'Profile', href: '/profile', icon: <Icon name="User" size="sm" /> },
      { label: 'Settings', href: '/settings', icon: <Icon name="Settings" size="sm" /> },
      { label: 'Sign Out', onClick: () => console.log('Sign out'), icon: <Icon name="LogOut" size="sm" />, destructive: true, divider: true },
    ];

    const menuActions = userMenuActions.length > 0 ? userMenuActions : defaultActions;

    return (
      <Dropdown
        trigger={
          <Button variant="ghost" size={size} className="p-1">
            <Avatar
              size={size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : 'md'}
              src={user.avatar}
              alt={user.name}
              fallback={user.name.charAt(0).toUpperCase()}
            />
          </Button>
        }
        placement="bottom-end"
      >
        <div className="px-4 py-3 border-b border-gray-200">
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
          {user.email && (
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          )}
        </div>
        {menuActions.map((action, index) => (
          <div key={index}>
            <MenuItem
              leftIcon={action.icon}
              onClick={action.href ? undefined : action.onClick}
              className={action.destructive ? 'text-red-600 hover:text-red-700' : undefined}
            >
              {action.href ? (
                <Link href={action.href}>{action.label}</Link>
              ) : (
                action.label
              )}
            </MenuItem>
            {action.divider && <div className="border-t border-gray-200 my-1" />}
          </div>
        ))}
      </Dropdown>
    );
  };

  const renderMobileMenu = () => {
    if (!showMobileMenu || !navigation.length) return null;

    return (
      <div className="md:hidden">
        <Button
          variant="ghost"
          size={size}
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} size="md" />
        </Button>
      </div>
    );
  };

  const renderMobileNavigation = () => {
    if (!isMobileMenuOpen || !navigation.length) return null;

    return (
      <div
        id="mobile-menu"
        className="md:hidden border-t border-gray-200 bg-white"
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          {navigation.map((item, index) => (
            <div key={index}>
              <Link
                href={item.href}
                className={cn(
                  'block px-3 py-2 text-base font-medium rounded-md transition-colors',
                  item.disabled 
                    ? 'text-gray-400 cursor-not-allowed'
                    : item.active
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon && <span className="mr-2 inline-flex">{item.icon}</span>}
                {item.label}
              </Link>
              {item.children && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.children.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.href}
                      className={cn(
                        'block px-3 py-2 text-sm rounded-md transition-colors',
                        subItem.disabled 
                          ? 'text-gray-400 cursor-not-allowed'
                          : subItem.active
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {subItem.icon && <span className="mr-2 inline-flex">{subItem.icon}</span>}
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <header className={baseClasses} data-test-id={testId}>
      <div className={containerClasses}>
        {renderLogo()}
        {renderNavigation()}
        
        <div className="flex items-center space-x-4">
          {actions}
          {renderUserMenu()}
          {renderMobileMenu()}
        </div>
      </div>
      {renderMobileNavigation()}
    </header>
  );
};

Header.displayName = 'Header';