import type { ReactNode } from 'react';
import { Button, Icon, Link, Text, Heading, Input } from '../atoms';
import type { ComponentSize } from '@/types';
import { cn } from '@/utils';

export interface FooterLink {
  /** Link label */
  label: string;
  /** Link URL */
  href: string;
  /** Whether the link opens in new tab */
  external?: boolean;
  /** Optional icon */
  icon?: ReactNode;
}

export interface FooterSection {
  /** Section title */
  title: string;
  /** Section links */
  links: FooterLink[];
}

export interface SocialLink {
  /** Platform name */
  platform: string;
  /** Social media URL */
  href: string;
  /** Platform icon */
  icon: ReactNode;
  /** Accessible label */
  label?: string;
}

export interface FooterProps {
  /** Company/brand name */
  brand?: ReactNode;
  /** Footer description */
  description?: string;
  /** Footer sections with links */
  sections?: FooterSection[];
  /** Social media links */
  socialLinks?: SocialLink[];
  /** Whether to show newsletter signup */
  showNewsletter?: boolean;
  /** Newsletter signup configuration */
  newsletter?: {
    title?: string;
    description?: string;
    placeholder?: string;
    buttonText?: string;
    onSubmit?: (email: string) => void;
  };
  /** Copyright text */
  copyright?: string;
  /** Legal links (Privacy, Terms, etc.) */
  legalLinks?: FooterLink[];
  /** Footer size variant */
  size?: ComponentSize;
  /** Footer layout variant */
  variant?: 'simple' | 'detailed' | 'minimal';
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const footerSizeClasses = {
  xs: 'py-6 px-4',
  sm: 'py-8 px-6',
  md: 'py-12 px-8',
  lg: 'py-16 px-10',
  xl: 'py-20 px-12',
};

const defaultSocialLinks: SocialLink[] = [
  {
    platform: 'Twitter',
    href: '#',
    icon: <Icon name="Twitter" size="sm" />,
    label: 'Follow us on Twitter',
  },
  {
    platform: 'GitHub',
    href: '#',
    icon: <Icon name="Github" size="sm" />,
    label: 'View our GitHub',
  },
  {
    platform: 'LinkedIn',
    href: '#',
    icon: <Icon name="Linkedin" size="sm" />,
    label: 'Connect on LinkedIn',
  },
];

export const Footer = ({
  brand,
  description,
  sections = [],
  socialLinks = [],
  showNewsletter = false,
  newsletter = {
    title: 'Stay updated',
    description: 'Subscribe to our newsletter for the latest updates.',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
  },
  copyright,
  legalLinks = [],
  size = 'md',
  variant = 'detailed',
  className,
  'data-test-id': testId,
}: FooterProps) => {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    if (email?.trim() && newsletter.onSubmit) {
      newsletter.onSubmit(email);
    }
  };

  const baseClasses = cn(
    'bg-gray-900 text-white',
    footerSizeClasses[size]
  );

  const containerClasses = cn(
    'max-w-7xl mx-auto',
    className
  );

  const renderBrand = () => {
    if (!brand) return null;

    return (
      <div className="space-y-4">
        <div className="text-2xl font-bold">
          {typeof brand === 'string' ? (
            <Link href="/" className="text-white hover:text-gray-300">
              {brand}
            </Link>
          ) : (
            brand
          )}
        </div>
        {description && (
          <Text className="text-gray-300 max-w-md">
            {description}
          </Text>
        )}
      </div>
    );
  };

  const renderSections = () => {
    if (!sections.length && variant === 'minimal') return null;

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sections.map((section, index) => (
          <div key={index}>
            <Heading as="h3" variant="h6" className="text-white mb-4">
              {section.title}
            </Heading>
            <ul className="space-y-3">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link
                    href={link.href}
                    external={link.external}
                    className="text-gray-300 hover:text-white transition-colors inline-flex items-center"
                  >
                    {link.icon && <span className="mr-2">{link.icon}</span>}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  const renderNewsletter = () => {
    if (!showNewsletter) return null;

    return (
      <div className="space-y-4">
        <div>
          <Heading as="h3" variant="h6" className="text-white mb-2">
            {newsletter.title}
          </Heading>
          {newsletter.description && (
            <Text className="text-gray-300">
              {newsletter.description}
            </Text>
          )}
        </div>
        <form onSubmit={handleNewsletterSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              name="email"
              type="email"
              placeholder={newsletter.placeholder}
              required
              className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500"
            />
            <Button
              type="submit"
              variant="primary"
              size={size}
              className="whitespace-nowrap"
            >
              {newsletter.buttonText}
            </Button>
          </div>
        </form>
      </div>
    );
  };

  const renderSocialLinks = () => {
    const links = socialLinks.length > 0 ? socialLinks : defaultSocialLinks;
    if (!links.length) return null;

    return (
      <div className="space-y-4">
        <Heading as="h3" variant="h6" className="text-white">
          Follow Us
        </Heading>
        <div className="flex space-x-4">
          {links.map((social, index) => (
            <Link
              key={index}
              href={social.href}
              external
              className="text-gray-300 hover:text-white transition-colors"
              aria-label={social.label || `Visit our ${social.platform}`}
            >
              {social.icon}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const renderBottomSection = () => {
    const showCopyright = copyright || !copyright && brand;
    const showLegalLinks = legalLinks.length > 0;

    if (!showCopyright && !showLegalLinks) return null;

    return (
      <div className="border-t border-gray-800 pt-8 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {showCopyright && (
            <Text className="text-gray-400 text-sm">
              {copyright || `© ${new Date().getFullYear()} ${typeof brand === 'string' ? brand : 'Company'}. All rights reserved.`}
            </Text>
          )}
          {showLegalLinks && (
            <div className="flex space-x-6">
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  external={link.external}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (variant === 'minimal') {
    return (
      <footer className={baseClasses} data-test-id={testId}>
        <div className={containerClasses}>
          <div className="text-center space-y-4">
            {renderBrand()}
            {socialLinks.length > 0 && (
              <div className="flex justify-center space-x-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    external
                    className="text-gray-300 hover:text-white transition-colors"
                    aria-label={social.label || `Visit our ${social.platform}`}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            )}
            {renderBottomSection()}
          </div>
        </div>
      </footer>
    );
  }

  if (variant === 'simple') {
    return (
      <footer className={baseClasses} data-test-id={testId}>
        <div className={containerClasses}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {renderBrand()}
              {renderSocialLinks()}
            </div>
            <div className="space-y-6">
              {showNewsletter && renderNewsletter()}
            </div>
          </div>
          {renderBottomSection()}
        </div>
      </footer>
    );
  }

  // Detailed variant (default)
  return (
    <footer className={baseClasses} data-test-id={testId}>
      <div className={containerClasses}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            {renderBrand()}
            {renderSocialLinks()}
          </div>
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sections.length > 0 && (
                <div className="md:col-span-2">
                  {renderSections()}
                </div>
              )}
              {showNewsletter && (
                <div className="md:col-span-2">
                  {renderNewsletter()}
                </div>
              )}
            </div>
          </div>
        </div>
        {renderBottomSection()}
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';