import type { ReactNode } from 'react';
import { Link, Text, Heading, Avatar, Badge, Divider, Icon } from '../atoms';
import { Card, Breadcrumb } from '../molecules';
import type { BreadcrumbItem } from '../molecules';
import { Header, Footer } from '../organisms';
import type { NavigationItem, UserMenuAction, FooterSection, SocialLink } from '../organisms';
import type { ComponentSize } from '@/types';
import { cn } from '@/utils';

export interface BlogMeta {
  /** Article title */
  title: string;
  /** Article excerpt or description */
  excerpt?: string;
  /** Author information */
  author?: {
    name: string;
    avatar?: string;
    bio?: string;
    socialLinks?: Array<{
      platform: string;
      url: string;
      icon?: ReactNode;
    }>;
  };
  /** Publication date */
  publishedAt?: string;
  /** Last updated date */
  updatedAt?: string;
  /** Reading time estimate */
  readingTime?: string;
  /** Article tags */
  tags?: string[];
  /** Article category */
  category?: string;
  /** Featured image */
  featuredImage?: {
    src: string;
    alt: string;
    caption?: string;
  };
}

export interface RelatedPost {
  /** Post title */
  title: string;
  /** Post URL */
  href: string;
  /** Post excerpt */
  excerpt?: string;
  /** Post featured image */
  image?: string;
  /** Publication date */
  publishedAt?: string;
  /** Reading time */
  readingTime?: string;
}

export interface BlogSidebarWidget {
  /** Widget title */
  title: string;
  /** Widget content */
  content: ReactNode;
  /** Widget type for styling */
  type?: 'default' | 'featured' | 'minimal';
}

export interface BlogLayoutProps {
  /** Main article content */
  children: ReactNode;
  /** Article metadata */
  meta: BlogMeta;
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
  /** Breadcrumb navigation */
  breadcrumbs?: BreadcrumbItem[];
  /** Sidebar widgets */
  sidebarWidgets?: BlogSidebarWidget[];
  /** Related posts */
  relatedPosts?: RelatedPost[];
  /** Footer configuration */
  footer?: {
    brand?: ReactNode;
    description?: string;
    sections?: FooterSection[];
    socialLinks?: SocialLink[];
    copyright?: string;
  };
  /** Whether to show sidebar */
  showSidebar?: boolean;
  /** Sidebar position */
  sidebarPosition?: 'left' | 'right';
  /** Layout variant */
  variant?: 'default' | 'minimal' | 'magazine';
  /** Layout size */
  size?: ComponentSize;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const layoutVariantClasses = {
  default: 'max-w-7xl',
  minimal: 'max-w-4xl',
  magazine: 'max-w-6xl',
};

export const BlogLayout = ({
  children,
  meta,
  header,
  breadcrumbs,
  sidebarWidgets = [],
  relatedPosts = [],
  footer,
  showSidebar = true,
  sidebarPosition = 'right',
  variant = 'default',
  size = 'md',
  className,
  'data-test-id': testId,
}: BlogLayoutProps) => {
  const containerClasses = cn(
    'min-h-screen flex flex-col bg-white',
    className
  );

  const contentContainerClasses = cn(
    'mx-auto px-4 sm:px-6 lg:px-8',
    layoutVariantClasses[variant]
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

  const renderBreadcrumbs = () => {
    if (!breadcrumbs?.length) return null;

    return (
      <div className="py-4">
        <Breadcrumb items={breadcrumbs} />
      </div>
    );
  };

  const renderArticleMeta = () => (
    <header className="mb-8">
      {meta.category && (
        <div className="mb-4">
          <Badge variant="primary" className="text-sm">
            {meta.category}
          </Badge>
        </div>
      )}
      
      <Heading as="h1" variant="h1" className="mb-4">
        {meta.title}
      </Heading>
      
      {meta.excerpt && (
        <Text className="text-xl text-gray-600 mb-6 leading-relaxed">
          {meta.excerpt}
        </Text>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Author and Date Info */}
        <div className="flex items-center space-x-4">
          {meta.author && (
            <div className="flex items-center space-x-3">
              <Avatar
                src={meta.author.avatar}
                alt={meta.author.name}
                size="md"
                fallback={meta.author.name.charAt(0)}
              />
              <div>
                <Text className="font-medium text-gray-900">
                  {meta.author.name}
                </Text>
                {meta.publishedAt && (
                  <Text className="text-sm text-gray-500">
                    {meta.publishedAt}
                  </Text>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Reading Time and Updated */}
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          {meta.readingTime && (
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size="sm" />
              <span>{meta.readingTime}</span>
            </div>
          )}
          {meta.updatedAt && meta.updatedAt !== meta.publishedAt && (
            <Text className="text-sm">
              Updated {meta.updatedAt}
            </Text>
          )}
        </div>
      </div>

      {/* Featured Image */}
      {meta.featuredImage && (
        <div className="mb-8">
          <img
            src={meta.featuredImage.src}
            alt={meta.featuredImage.alt}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
          {meta.featuredImage.caption && (
            <Text className="text-sm text-gray-500 mt-2 text-center">
              {meta.featuredImage.caption}
            </Text>
          )}
        </div>
      )}

      {/* Tags */}
      {meta.tags && meta.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {meta.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" size="sm">
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      <Divider className="mt-8" />
    </header>
  );

  const renderAuthorBio = () => {
    if (!meta.author?.bio) return null;

    return (
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <div className="flex items-start space-x-4">
          <Avatar
            src={meta.author.avatar}
            alt={meta.author.name}
            size="lg"
            fallback={meta.author.name.charAt(0)}
          />
          <div className="flex-1">
            <Heading as="h3" variant="h5" className="mb-2">
              About {meta.author.name}
            </Heading>
            <Text className="text-gray-600 mb-4">
              {meta.author.bio}
            </Text>
            {meta.author.socialLinks && meta.author.socialLinks.length > 0 && (
              <div className="flex space-x-3">
                {meta.author.socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.url}
                    external
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label={`${meta.author?.name} on ${social.platform}`}
                  >
                    {social.icon || <Icon name="ExternalLink" size="sm" />}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderRelatedPosts = () => {
    if (!relatedPosts.length) return null;

    return (
      <div className="mt-12">
        <Heading as="h3" variant="h4" className="mb-6">
          Related Articles
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map((post, index) => (
            <Card key={index} className="overflow-hidden">
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <Heading as="h4" variant="h6" className="mb-2">
                  <Link
                    href={post.href}
                    className="text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </Heading>
                {post.excerpt && (
                  <Text className="text-gray-600 mb-3 line-clamp-3">
                    {post.excerpt}
                  </Text>
                )}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  {post.publishedAt && <span>{post.publishedAt}</span>}
                  {post.readingTime && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size="xs" />
                      <span>{post.readingTime}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
    if (!showSidebar || (!sidebarWidgets.length && !relatedPosts.length)) return null;

    const defaultWidgets: BlogSidebarWidget[] = [
      {
        title: 'Table of Contents',
        content: (
          <div className="space-y-2">
            <Text className="text-sm text-gray-500">
              Auto-generated table of contents would go here
            </Text>
          </div>
        ),
        type: 'minimal',
      },
    ];

    const widgets = sidebarWidgets.length > 0 ? sidebarWidgets : defaultWidgets;

    return (
      <aside className="w-full lg:w-80 lg:flex-shrink-0">
        <div className="sticky top-24 space-y-6">
          {widgets.map((widget, index) => (
            <Card key={index} className="p-4">
              <Heading as="h4" variant="h6" className="mb-4">
                {widget.title}
              </Heading>
              {widget.content}
            </Card>
          ))}
        </div>
      </aside>
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
      
      <main className="flex-1 py-8">
        <div className={contentContainerClasses}>
          {renderBreadcrumbs()}
          
          <div className={cn(
            'flex flex-col lg:flex-row gap-8',
            sidebarPosition === 'left' && 'lg:flex-row-reverse'
          )}>
            {/* Main Content */}
            <article className="flex-1 min-w-0">
              {renderArticleMeta()}
              
              <div className="prose prose-lg max-w-none">
                {children}
              </div>
              
              {renderAuthorBio()}
              {!showSidebar && renderRelatedPosts()}
            </article>

            {/* Sidebar */}
            {renderSidebar()}
          </div>

          {/* Related Posts (for layouts with sidebar) */}
          {showSidebar && renderRelatedPosts()}
        </div>
      </main>

      {renderFooter()}
    </div>
  );
};

BlogLayout.displayName = 'BlogLayout';