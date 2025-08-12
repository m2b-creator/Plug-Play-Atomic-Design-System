import type { ReactNode } from 'react';
import { Button, Heading, Text, Link } from '../atoms';
import { Card } from '../molecules';
import { Header, Footer } from '../organisms';
import type { NavigationItem, UserMenuAction, FooterSection, SocialLink } from '../organisms';
import type { ComponentSize, ButtonVariant } from '@/types';
import { cn } from '@/utils';

export interface HeroSection {
  /** Hero title */
  title: string;
  /** Hero subtitle */
  subtitle?: string;
  /** Hero description */
  description?: string;
  /** Primary CTA button */
  primaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
    variant?: ButtonVariant;
  };
  /** Secondary CTA button */
  secondaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
    variant?: ButtonVariant;
  };
  /** Hero background image or video */
  background?: ReactNode;
  /** Hero content overlay */
  overlay?: boolean;
  /** Hero size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface FeatureItem {
  /** Feature icon */
  icon?: ReactNode;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Optional feature link */
  link?: {
    text: string;
    href: string;
  };
}

export interface FeaturesSection {
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Section description */
  description?: string;
  /** Feature items */
  features: FeatureItem[];
  /** Features layout */
  layout?: 'grid' | 'list' | 'cards';
  /** Number of columns for grid layout */
  columns?: 1 | 2 | 3 | 4;
}

export interface CTASection {
  /** CTA title */
  title: string;
  /** CTA description */
  description?: string;
  /** Primary CTA button */
  primaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
    variant?: ButtonVariant;
  };
  /** Secondary CTA button */
  secondaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
    variant?: ButtonVariant;
  };
  /** CTA background variant */
  background?: 'white' | 'gray' | 'blue' | 'gradient';
}

export interface LandingPageTemplateProps {
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
  /** Hero section configuration */
  hero: HeroSection;
  /** Features section configuration */
  features?: FeaturesSection;
  /** CTA section configuration */
  cta?: CTASection;
  /** Additional content sections */
  children?: ReactNode;
  /** Footer configuration */
  footer?: {
    brand?: ReactNode;
    description?: string;
    sections?: FooterSection[];
    socialLinks?: SocialLink[];
    copyright?: string;
    showNewsletter?: boolean;
  };
  /** Layout size variant */
  size?: ComponentSize;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const heroSizeClasses = {
  sm: 'py-12 lg:py-16',
  md: 'py-16 lg:py-24',
  lg: 'py-20 lg:py-32',
  xl: 'py-24 lg:py-40',
};

const ctaBackgroundClasses = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  blue: 'bg-blue-600 text-white',
  gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
};

export const LandingPageTemplate = ({
  header,
  hero,
  features,
  cta,
  children,
  footer,
  size = 'md',
  className,
  'data-test-id': testId,
}: LandingPageTemplateProps) => {
  const containerClasses = cn(
    'min-h-screen flex flex-col',
    className
  );

  const renderHeader = () => {
    if (!header) return null;

    return (
      <Header
        {...header}
        size={header.size || size}
        sticky={true}
      />
    );
  };

  const renderHero = () => {
    const heroSize = hero.size || 'lg';
    
    return (
      <section
        className={cn(
          'relative overflow-hidden',
          heroSizeClasses[heroSize],
          hero.background && 'text-white'
        )}
      >
        {/* Background */}
        {hero.background && (
          <div className="absolute inset-0 z-0">
            {hero.background}
            {hero.overlay && (
              <div className="absolute inset-0 bg-black bg-opacity-40" />
            )}
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Heading
              as="h1"
              variant="h1"
              className={cn(
                'mb-6',
                hero.background ? 'text-white' : 'text-gray-900'
              )}
            >
              {hero.title}
            </Heading>
            
            {hero.subtitle && (
              <Heading
                as="h2"
                variant="h3"
                className={cn(
                  'mb-6 font-normal',
                  hero.background ? 'text-gray-200' : 'text-gray-600'
                )}
              >
                {hero.subtitle}
              </Heading>
            )}
            
            {hero.description && (
              <Text
                className={cn(
                  'text-xl mb-8 max-w-3xl mx-auto',
                  hero.background ? 'text-gray-300' : 'text-gray-600'
                )}
              >
                {hero.description}
              </Text>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {hero.primaryCta && (
                hero.primaryCta.href ? (
                  <Link href={hero.primaryCta.href}>
                    <Button
                      variant={hero.primaryCta.variant || 'primary'}
                      size="lg"
                      className="px-8"
                    >
                      {hero.primaryCta.text}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant={hero.primaryCta.variant || 'primary'}
                    size="lg"
                    onClick={hero.primaryCta.onClick}
                    className="px-8"
                  >
                    {hero.primaryCta.text}
                  </Button>
                )
              )}
              
              {hero.secondaryCta && (
                hero.secondaryCta.href ? (
                  <Link href={hero.secondaryCta.href}>
                    <Button
                      variant={hero.secondaryCta.variant || 'outline'}
                      size="lg"
                      className="px-8"
                    >
                      {hero.secondaryCta.text}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant={hero.secondaryCta.variant || 'outline'}
                    size="lg"
                    onClick={hero.secondaryCta.onClick}
                    className="px-8"
                  >
                    {hero.secondaryCta.text}
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderFeatures = () => {
    if (!features) return null;

    const columns = features.columns || 3;
    const gridClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };

    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          {(features.title || features.subtitle || features.description) && (
            <div className="text-center mb-16">
              {features.title && (
                <Heading as="h2" variant="h2" className="mb-4">
                  {features.title}
                </Heading>
              )}
              {features.subtitle && (
                <Heading as="h3" variant="h4" className="mb-4 font-normal text-gray-600">
                  {features.subtitle}
                </Heading>
              )}
              {features.description && (
                <Text className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {features.description}
                </Text>
              )}
            </div>
          )}

          {/* Features Grid */}
          {features.layout === 'cards' ? (
            <div className={cn('grid gap-8', gridClasses[columns])}>
              {features.features.map((feature, index) => (
                <Card key={index} className="p-6 text-center">
                  {feature.icon && (
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                  )}
                  <Heading as="h3" variant="h5" className="mb-3">
                    {feature.title}
                  </Heading>
                  <Text className="text-gray-600 mb-4">
                    {feature.description}
                  </Text>
                  {feature.link && (
                    <Link
                      href={feature.link.href}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {feature.link.text}
                    </Link>
                  )}
                </Card>
              ))}
            </div>
          ) : features.layout === 'list' ? (
            <div className="space-y-8">
              {features.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  {feature.icon && (
                    <div className="flex-shrink-0 mt-1">
                      {feature.icon}
                    </div>
                  )}
                  <div>
                    <Heading as="h3" variant="h5" className="mb-2">
                      {feature.title}
                    </Heading>
                    <Text className="text-gray-600 mb-2">
                      {feature.description}
                    </Text>
                    {feature.link && (
                      <Link
                        href={feature.link.href}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {feature.link.text}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={cn('grid gap-8', gridClasses[columns])}>
              {features.features.map((feature, index) => (
                <div key={index} className="text-center">
                  {feature.icon && (
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                  )}
                  <Heading as="h3" variant="h5" className="mb-3">
                    {feature.title}
                  </Heading>
                  <Text className="text-gray-600 mb-4">
                    {feature.description}
                  </Text>
                  {feature.link && (
                    <Link
                      href={feature.link.href}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {feature.link.text}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  };

  const renderCTA = () => {
    if (!cta) return null;

    const bgColor = cta.background || 'blue';

    return (
      <section className={cn('py-16 lg:py-24', ctaBackgroundClasses[bgColor])}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Heading
            as="h2"
            variant="h2"
            className={cn(
              'mb-4',
              (bgColor === 'blue' || bgColor === 'gradient') ? 'text-white' : 'text-gray-900'
            )}
          >
            {cta.title}
          </Heading>
          
          {cta.description && (
            <Text
              className={cn(
                'text-xl mb-8',
                (bgColor === 'blue' || bgColor === 'gradient') ? 'text-gray-200' : 'text-gray-600'
              )}
            >
              {cta.description}
            </Text>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {cta.primaryCta && (
              cta.primaryCta.href ? (
                <Link href={cta.primaryCta.href}>
                  <Button
                    variant={cta.primaryCta.variant || 'primary'}
                    size="lg"
                    className="px-8"
                  >
                    {cta.primaryCta.text}
                  </Button>
                </Link>
              ) : (
                <Button
                  variant={cta.primaryCta.variant || 'primary'}
                  size="lg"
                  onClick={cta.primaryCta.onClick}
                  className="px-8"
                >
                  {cta.primaryCta.text}
                </Button>
              )
            )}
            
            {cta.secondaryCta && (
              cta.secondaryCta.href ? (
                <Link href={cta.secondaryCta.href}>
                  <Button
                    variant={cta.secondaryCta.variant || 'outline'}
                    size="lg"
                    className="px-8"
                  >
                    {cta.secondaryCta.text}
                  </Button>
                </Link>
              ) : (
                <Button
                  variant={cta.secondaryCta.variant || 'outline'}
                  size="lg"
                  onClick={cta.secondaryCta.onClick}
                  className="px-8"
                >
                  {cta.secondaryCta.text}
                </Button>
              )
            )}
          </div>
        </div>
      </section>
    );
  };

  const renderFooter = () => {
    if (!footer) return null;

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
      {renderHero()}
      {renderFeatures()}
      {children && (
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {children}
          </div>
        </section>
      )}
      {renderCTA()}
      {renderFooter()}
    </div>
  );
};

LandingPageTemplate.displayName = 'LandingPageTemplate';