import type { ReactNode } from 'react';
import { Button, Icon, Text, Heading, Link } from '../atoms';
import { Card, Alert } from '../molecules';
import { Header, Footer } from '../organisms';
import type { NavigationItem, UserMenuAction, FooterSection, SocialLink } from '../organisms';
import type { ComponentSize, ButtonVariant } from '@/types';
import { cn } from '@/utils';

export interface ServerErrorTemplateProps {
  /** Custom error title */
  title?: string;
  /** Custom error message */
  message?: string;
  /** Custom error code */
  errorCode?: string;
  /** Error details for debugging (only shown in development) */
  errorDetails?: string;
  /** Error ID for tracking */
  errorId?: string;
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
  /** Primary action button */
  primaryAction?: {
    text: string;
    href?: string;
    onClick?: () => void;
    variant?: ButtonVariant;
  };
  /** Secondary action button */
  secondaryAction?: {
    text: string;
    href?: string;
    onClick?: () => void;
    variant?: ButtonVariant;
  };
  /** Support contact information */
  supportContact?: {
    email?: string;
    phone?: string;
    chatUrl?: string;
  };
  /** Whether to show retry option */
  showRetry?: boolean;
  /** Retry callback */
  onRetry?: () => void;
  /** Whether to show error reporting */
  showErrorReporting?: boolean;
  /** Error reporting callback */
  onReportError?: (details: string) => void;
  /** Custom illustration or image */
  illustration?: ReactNode;
  /** Footer configuration */
  footer?: {
    brand?: ReactNode;
    description?: string;
    sections?: FooterSection[];
    socialLinks?: SocialLink[];
    copyright?: string;
  };
  /** Template variant */
  variant?: 'default' | 'minimal' | 'detailed';
  /** Background variant */
  background?: 'white' | 'gray' | 'gradient';
  /** Whether this is a development environment */
  isDevelopment?: boolean;
  /** Layout size */
  size?: ComponentSize;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const backgroundClasses = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  gradient: 'bg-gradient-to-br from-red-50 to-orange-100',
};

export const ServerErrorTemplate = ({
  title = 'Server Error',
  message = 'We\'re experiencing some technical difficulties. Please try again later.',
  errorCode = '500',
  errorDetails,
  errorId,
  header,
  primaryAction = {
    text: 'Try Again',
    onClick: () => window.location.reload(),
    variant: 'primary',
  },
  secondaryAction = {
    text: 'Go Home',
    href: '/',
    variant: 'outline',
  },
  supportContact,
  onRetry,
  showErrorReporting = false,
  onReportError,
  illustration,
  footer,
  variant = 'default',
  background = 'gray',
  isDevelopment = false,
  size = 'md',
  className,
  'data-test-id': testId,
}: ServerErrorTemplateProps) => {
  const containerClasses = cn(
    'min-h-screen flex flex-col',
    backgroundClasses[background],
    className
  );

  const handleReportError = () => {
    const details = `Error ID: ${errorId || 'N/A'}\nError Code: ${errorCode}\nError Details: ${errorDetails || 'N/A'}\nTimestamp: ${new Date().toISOString()}`;
    onReportError?.(details);
  };

  const renderHeader = () => {
    if (!header) return null;

    return (
      <Header
        {...header}
        size={header.size || size}
        sticky={false}
      />
    );
  };

  const renderDefaultIllustration = () => (
    <div className="text-red-300">
      <Icon name="AlertTriangle" size="xl" className="mx-auto text-6xl" />
    </div>
  );

  const renderErrorContent = () => {
    if (variant === 'minimal') {
      return (
        <div className="text-center max-w-md mx-auto">
          <Text className="text-6xl font-bold text-red-400 mb-4">
            {errorCode}
          </Text>
          <Heading as="h1" variant="h3" className="mb-4">
            {title}
          </Heading>
          <Text className="text-gray-600 mb-8">
            {message}
          </Text>
          {renderActions()}
        </div>
      );
    }

    return (
      <div className="text-center max-w-2xl mx-auto">
        {/* Illustration */}
        <div className="mb-8">
          {illustration || renderDefaultIllustration()}
        </div>

        {/* Error Code */}
        <Text className="text-8xl font-bold text-red-400 mb-4">
          {errorCode}
        </Text>

        {/* Title and Message */}
        <Heading as="h1" variant="h2" className="mb-4">
          {title}
        </Heading>
        <Text className="text-xl text-gray-600 mb-8 leading-relaxed">
          {message}
        </Text>

        {/* Error ID */}
        {errorId && (
          <Text className="text-sm text-gray-500 mb-6">
            Error ID: {errorId}
          </Text>
        )}

        {/* Actions */}
        {renderActions()}

        {/* Error Reporting */}
        {showErrorReporting && (
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReportError}
              className="text-gray-600 hover:text-gray-800"
            >
              <Icon name="Flag" size="sm" className="mr-2" />
              Report this error
            </Button>
          </div>
        )}

        {/* Support Information */}
        {renderSupportInfo()}

        {/* Development Error Details */}
        {isDevelopment && errorDetails && renderErrorDetails()}
      </div>
    );
  };

  const renderActions = () => (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
      {primaryAction && (
        primaryAction.href ? (
          <Link href={primaryAction.href}>
            <Button
              variant={primaryAction.variant || 'primary'}
              size="lg"
              className="px-8"
            >
              {primaryAction.text}
            </Button>
          </Link>
        ) : (
          <Button
            variant={primaryAction.variant || 'primary'}
            size="lg"
            onClick={primaryAction.onClick || onRetry}
            className="px-8"
          >
            <Icon name="RefreshCw" size="sm" className="mr-2" />
            {primaryAction.text}
          </Button>
        )
      )}
      
      {secondaryAction && (
        secondaryAction.href ? (
          <Link href={secondaryAction.href}>
            <Button
              variant={secondaryAction.variant || 'outline'}
              size="lg"
              className="px-8"
            >
              {secondaryAction.text}
            </Button>
          </Link>
        ) : (
          <Button
            variant={secondaryAction.variant || 'outline'}
            size="lg"
            onClick={secondaryAction.onClick}
            className="px-8"
          >
            {secondaryAction.text}
          </Button>
        )
      )}
    </div>
  );

  const renderSupportInfo = () => {
    if (!supportContact || variant === 'minimal') return null;

    return (
      <Card className="p-6 max-w-md mx-auto mb-8">
        <Heading as="h3" variant="h5" className="mb-4 text-center">
          Need Help?
        </Heading>
        
        <div className="space-y-3">
          {supportContact.email && (
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Mail" size="sm" className="text-gray-500" />
              <Link
                href={`mailto:${supportContact.email}`}
                className="text-blue-600 hover:text-blue-700"
              >
                {supportContact.email}
              </Link>
            </div>
          )}
          
          {supportContact.phone && (
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Phone" size="sm" className="text-gray-500" />
              <Link
                href={`tel:${supportContact.phone}`}
                className="text-blue-600 hover:text-blue-700"
              >
                {supportContact.phone}
              </Link>
            </div>
          )}
          
          {supportContact.chatUrl && (
            <div className="flex items-center justify-center space-x-2">
              <Icon name="MessageCircle" size="sm" className="text-gray-500" />
              <Link
                href={supportContact.chatUrl}
                className="text-blue-600 hover:text-blue-700"
              >
                Live Chat Support
              </Link>
            </div>
          )}
        </div>
      </Card>
    );
  };

  const renderErrorDetails = () => (
    <Card className="p-6 mt-8 text-left max-w-4xl mx-auto">
      <Alert
        variant="warning"
        title="Development Error Details"
        className="mb-4"
      >
        This information is only visible in development mode.
      </Alert>
      
      <div className="bg-gray-100 rounded-md p-4 overflow-auto">
        <pre className="text-sm text-gray-800 whitespace-pre-wrap">
          {errorDetails}
        </pre>
      </div>
      
      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <span>Error ID: {errorId || 'N/A'}</span>
        <span>Timestamp: {new Date().toLocaleString()}</span>
      </div>
    </Card>
  );

  const renderFooter = () => {
    if (!footer) return null;

    return (
      <Footer
        {...footer}
        size={size}
        variant="minimal"
      />
    );
  };

  return (
    <div className={containerClasses} data-test-id={testId}>
      {renderHeader()}
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        {renderErrorContent()}
      </main>

      {renderFooter()}
    </div>
  );
};

ServerErrorTemplate.displayName = 'ServerErrorTemplate';