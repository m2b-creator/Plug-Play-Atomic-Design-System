import Link from 'next/link';
import {Button, Heading, Text, Card, Badge, Icon, DemoLayout} from '@/components';

export default function HomePage() {
    const stats = [
        {label: 'Components', value: '50+', description: 'Across all atomic levels'},
        {label: 'TypeScript', value: '100%', description: 'Full type coverage'},
        {label: 'Accessibility', value: 'WCAG 2.1', description: 'AA compliant'},
        {label: 'Tests', value: '90%+', description: 'Code coverage'},
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
        <DemoLayout>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
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
                                    <Icon name="Book" size="sm"/>
                                    Documentation
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, index) => (
                                <Card key={index} variant="elevated" padding="lg" className="text-center bg-white">
                                    <Text variant="h4" className="font-bold text-blue-600 mb-2">
                                        {stat.value}
                                    </Text>
                                    <Text variant="body" className="font-semibold mb-1 text-gray-900">
                                        {stat.label}
                                    </Text>
                                    <Text variant="caption" className="text-gray-600">
                                        {stat.description}
                                    </Text>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <Heading as="h2" variant="h2" className="mb-4 text-gray-900">
                            Why Choose AtomicPNP?
                        </Heading>
                        <Text variant="body" className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Everything you need to build modern, accessible, and scalable user interfaces.
                        </Text>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} variant="outlined" padding="lg"
                                  className="h-full bg-white hover:shadow-md transition-shadow">
                                <div className="text-3xl mb-4">{feature.icon}</div>
                                <Heading as="h3" variant="h5" className="mb-3 text-gray-900">
                                    {feature.title}
                                </Heading>
                                <Text variant="body" className="text-gray-600">
                                    {feature.description}
                                </Text>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Links Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <Heading as="h2" variant="h2" className="mb-4 text-gray-900">
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
                                    className="h-full hover:shadow-md transition-shadow duration-200 bg-white"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <Heading as="h3" variant="h6" className="text-gray-900">
                                            {link.title}
                                        </Heading>
                                        <Badge variant="secondary" size="sm">
                                            {link.badge}
                                        </Badge>
                                    </div>
                                    <Text variant="body" className="text-gray-600 mb-4">
                                        {link.description}
                                    </Text>
                                    <div className="flex items-center text-blue-600">
                                        <Text variant="body" className="font-medium">
                                            Explore
                                        </Text>
                                        <Icon name="ArrowRight" size="sm" className="ml-1"/>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Getting Started Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <Heading as="h2" variant="h2" className="mb-4 text-gray-900">
                                Get Started in Minutes
                            </Heading>
                            <Text variant="body" className="text-lg text-gray-600">
                                Install AtomicPNP and start building beautiful interfaces immediately.
                            </Text>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <Card variant="outlined" padding="lg" className="bg-white">
                                <Heading as="h3" variant="h5" className="mb-4 text-gray-900">
                                    1. Install Dependencies
                                </Heading>
                                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                                    <code className="text-gray-100 text-sm">
                                        npm install clsx tailwind-merge lucide-react
                                    </code>
                                </div>
                                <Text variant="body" className="text-gray-600">
                                    Add the required peer dependencies to your Next.js project.
                                </Text>
                            </Card>

                            <Card variant="outlined" padding="lg" className="bg-white">
                                <Heading as="h3" variant="h5" className="mb-4 text-gray-900">
                                    2. Copy Components
                                </Heading>
                                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                                    <code className="text-gray-100 text-sm">
                                        cp -r src/components/* your-project/src/
                                    </code>
                                </div>
                                <Text variant="body" className="text-gray-600">
                                    Copy the component files to your project directory.
                                </Text>
                            </Card>

                            <Card variant="outlined" padding="lg" className="bg-white">
                                <Heading as="h3" variant="h5" className="mb-4 text-gray-900">
                                    3. Import & Use
                                </Heading>
                                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                                    <code className="text-gray-100 text-sm">
                                        {`import { Button } from '@/components';`}
                                    </code>
                                </div>
                                <Text variant="body" className="text-gray-600">
                                    Start using components in your React applications.
                                </Text>
                            </Card>

                            <Card variant="outlined" padding="lg" className="bg-white">
                                <Heading as="h3" variant="h5" className="mb-4 text-gray-900">
                                    4. Customize
                                </Heading>
                                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                                    <code className="text-gray-100 text-sm">
                                        {`<Button size="lg">`}
                                    </code>
                                </div>
                                <Text variant="body" className="text-gray-600">
                                    Customize appearance with variants and props.
                                </Text>
                            </Card>
                        </div>

                        <div className="text-center mt-12">
                            <Text variant="body" className="mb-6 text-gray-600">
                                Need detailed instructions? Check out our complete installation guide.
                            </Text>
                            <Button variant="primary" size="lg">
                                <Icon name="Download" size="sm"/>
                                View Installation Guide
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </DemoLayout>
    );
}
