import Link from 'next/link';
import { Button, Heading, Text, Card, Badge, Icon, Divider } from '../components';

export default function HomePage() {
  const stats = [
    { label: 'Components', value: '50+', description: 'Across all atomic levels' },
    { label: 'TypeScript', value: '100%', description: 'Full type coverage' },
    { label: 'Accessibility', value: 'WCAG 2.1', description: 'AA compliant' },
    { label: 'Tests', value: '90%+', description: 'Code coverage' },
  ];

  const features = [
    {
      title: 'Atomic Design',
      description: 'Built following atomic design principles with atoms, molecules, organisms, and templates.',
      icon: '⚛️',
    },
    {
      title: 'TypeScript First',
      description: 'Fully typed components with IntelliSense support and type safety.',
      icon: '🔷',
    },
    {
      title: 'Accessible by Default',
      description: 'WCAG 2.1 AA compliant components with keyboard navigation and screen reader support.',
      icon: '♿',
    },
    {
      title: 'Plug & Play',
      description: 'Drop into any Next.js project with zero configuration required.',
      icon: '🔌',
    },
    {
      title: 'Theme System',
      description: 'Built-in light/dark mode support with customizable design tokens.',
      icon: '🎨',
    },
    {
      title: 'Comprehensive Testing',
      description: 'Full test coverage with Jest, React Testing Library, and accessibility testing.',
      icon: '🧪',
    },
  ];

  const quickLinks = [
    {
      title: 'Component Playground',
      description: 'Interactive examples of atoms and basic components',
      href: '/playground',
      badge: 'Atoms',
    },
    {
      title: 'Molecules Showcase',
      description: 'Composite components built from atoms',
      href: '/molecules',
      badge: 'Molecules',
    },
    {
      title: 'Organisms Gallery',
      description: 'Complex, feature-complete components',
      href: '/organisms',
      badge: 'Organisms',
    },
    {
      title: 'Templates Collection',
      description: 'Complete page layouts and templates',
      href: '/templates',
      badge: 'Templates',
    },
    {
      title: 'Documentation',
      description: 'Complete API reference and usage guides',
      href: '/docs',
      badge: 'Docs',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="container mx-auto px-8 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="primary" className="mb-6 text-sm">
            v1.0.0 - Production Ready
          </Badge>
          
          <Heading as="h1" variant="h1" className="mb-6 text-gray-900">
            AtomicPNP Design System
          </Heading>
          
          <Text variant="body" className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A comprehensive plug-and-play atomic design system for Next.js projects. 
            Built with TypeScript, Tailwind CSS, and React 19.
          </Text>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/playground">
              <Button variant="primary" size="lg" className="min-w-[200px]">
                Explore Components
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" size="lg" className="min-w-[200px]">
                <Icon name="Book" size="sm" />
                Documentation
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} variant="elevated" padding="lg" className="text-center">
                <Text variant="h4" className="font-bold text-blue-600 mb-2">
                  {stat.value}
                </Text>
                <Text variant="body" className="font-semibold mb-1">
                  {stat.label}
                </Text>
                <Text variant="caption" color="muted">
                  {stat.description}
                </Text>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* Features Section */}
      <section className="container mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <Heading as="h2" variant="h2" className="mb-4">
            Why Choose AtomicPNP?
          </Heading>
          <Text variant="body" className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to build modern, accessible, and scalable user interfaces.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} variant="outlined" padding="lg" className="h-full">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <Heading as="h3" variant="h5" className="mb-3">
                {feature.title}
              </Heading>
              <Text variant="body" color="secondary">
                {feature.description}
              </Text>
            </Card>
          ))}
        </div>
      </section>

      <Divider />

      {/* Quick Links Section */}
      <section className="container mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <Heading as="h2" variant="h2" className="mb-4">
            Explore the System
          </Heading>
          <Text variant="body" className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dive into our comprehensive component library organized by atomic design principles.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => (
            <Link key={index} href={link.href}>
              <Card 
                variant="outlined" 
                interactive 
                padding="lg" 
                className="h-full hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <Heading as="h3" variant="h6">
                    {link.title}
                  </Heading>
                  <Badge variant="secondary" size="sm">
                    {link.badge}
                  </Badge>
                </div>
                <Text variant="body" color="secondary" className="mb-4">
                  {link.description}
                </Text>
                <div className="flex items-center text-blue-600">
                  <Text variant="body" className="font-medium">
                    Explore
                  </Text>
                  <Icon name="ArrowRight" size="sm" className="ml-1" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Divider />

      {/* Getting Started Section */}
      <section className="container mx-auto px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Heading as="h2" variant="h2" className="mb-4">
              Get Started in Minutes
            </Heading>
            <Text variant="body" className="text-lg text-gray-600">
              Install AtomicPNP and start building beautiful interfaces immediately.
            </Text>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card variant="outlined" padding="lg">
              <Heading as="h3" variant="h5" className="mb-4">
                1. Install Dependencies
              </Heading>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <code className="text-gray-100 text-sm">
                  npm install clsx tailwind-merge lucide-react
                </code>
              </div>
              <Text variant="body" color="secondary">
                Add the required peer dependencies to your Next.js project.
              </Text>
            </Card>

            <Card variant="outlined" padding="lg">
              <Heading as="h3" variant="h5" className="mb-4">
                2. Copy Components
              </Heading>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <code className="text-gray-100 text-sm">
                  cp -r src/components/* your-project/src/
                </code>
              </div>
              <Text variant="body" color="secondary">
                Copy the component files to your project directory.
              </Text>
            </Card>

            <Card variant="outlined" padding="lg">
              <Heading as="h3" variant="h5" className="mb-4">
                3. Import & Use
              </Heading>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <code className="text-gray-100 text-sm">
                  {`import { Button } from '@/components';`}
                </code>
              </div>
              <Text variant="body" color="secondary">
                Start using components in your React applications.
              </Text>
            </Card>

            <Card variant="outlined" padding="lg">
              <Heading as="h3" variant="h5" className="mb-4">
                4. Customize
              </Heading>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <code className="text-gray-100 text-sm">
                  {`<Button variant="primary" size="lg">`}
                </code>
              </div>
              <Text variant="body" color="secondary">
                Customize appearance with variants and props.
              </Text>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Text variant="body" className="mb-6">
              Need detailed instructions? Check out our complete installation guide.
            </Text>
            <Button variant="primary" size="lg">
              <Icon name="Download" size="sm" />
              View Installation Guide
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Heading as="h3" variant="h6" className="mb-4 text-white">
                AtomicPNP
              </Heading>
              <Text variant="body" color="secondary" className="text-gray-300">
                A comprehensive atomic design system for Next.js applications.
              </Text>
            </div>
            
            <div>
              <Heading as="h4" variant="h6" className="mb-4 text-white">
                Components
              </Heading>
              <div className="space-y-2">
                <Link href="/playground" className="block text-gray-300 hover:text-white">
                  Atoms
                </Link>
                <Link href="/molecules" className="block text-gray-300 hover:text-white">
                  Molecules
                </Link>
                <Link href="/organisms" className="block text-gray-300 hover:text-white">
                  Organisms
                </Link>
                <Link href="/templates" className="block text-gray-300 hover:text-white">
                  Templates
                </Link>
              </div>
            </div>
            
            <div>
              <Heading as="h4" variant="h6" className="mb-4 text-white">
                Resources
              </Heading>
              <div className="space-y-2">
                <Link href="/docs" className="block text-gray-300 hover:text-white">
                  Documentation
                </Link>
                <Text className="block text-gray-300">
                  GitHub
                </Text>
                <Text className="block text-gray-300">
                  Examples
                </Text>
              </div>
            </div>
            
            <div>
              <Heading as="h4" variant="h6" className="mb-4 text-white">
                Support
              </Heading>
              <div className="space-y-2">
                <Text className="block text-gray-300">
                  Issues
                </Text>
                <Text className="block text-gray-300">
                  Discussions
                </Text>
                <Text className="block text-gray-300">
                  Contributing
                </Text>
              </div>
            </div>
          </div>
          
          <Divider className="my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Text variant="caption" className="text-gray-400">
              © 2025 AtomicPNP. Built with ❤️ for the Next.js community.
            </Text>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Text className="text-gray-400">
                Next.js 15
              </Text>
              <Text className="text-gray-400">
                React 19
              </Text>
              <Text className="text-gray-400">
                TypeScript
              </Text>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
