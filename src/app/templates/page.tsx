'use client';

import { useState } from 'react';
import { 
  Button, 
  Heading, 
  Text, 
  Divider, 
  Card,
  Badge,
  Spacer
} from '@/components';
import { DemoLayout } from '../../components/DemoLayout';

export default function TemplatesPlaygroundPage() {
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

  const templates = [
    {
      id: 'landing',
      name: 'Landing Page Template',
      description: 'Complete landing page with hero, features, and CTA sections',
      category: 'Marketing',
    },
    {
      id: 'dashboard',
      name: 'Dashboard Layout',
      description: 'Admin dashboard with sidebar navigation and content area',
      category: 'Application',
    },
    {
      id: 'auth',
      name: 'Authentication Template',
      description: 'Login, signup, and password reset forms',
      category: 'Authentication',
    },
    {
      id: 'blog',
      name: 'Blog Layout',
      description: 'Blog post layout with sidebar and content area',
      category: 'Content',
    },
    {
      id: 'product-grid',
      name: 'Product Grid Template',
      description: 'E-commerce product listing with filters and search',
      category: 'E-commerce',
    },
    {
      id: 'product-detail',
      name: 'Product Detail Template',
      description: 'Individual product page with images and details',
      category: 'E-commerce',
    },
    {
      id: 'settings',
      name: 'Settings Template',
      description: 'User settings page with tabbed navigation',
      category: 'Application',
    },
    {
      id: '404',
      name: '404 Not Found',
      description: 'Custom 404 error page template',
      category: 'Error Pages',
    },
    {
      id: '500',
      name: '500 Server Error',
      description: 'Server error page template',
      category: 'Error Pages',
    },
  ];

  const renderTemplate = () => {
    switch (activeTemplate) {
      case 'landing':
        return (
          <div className="p-8">
            <Heading as="h1" variant="h1">Landing Page Template</Heading>
            <Text>This would be a complete landing page template.</Text>
          </div>
        );
      case 'dashboard':
        return (
          <div className="p-8">
            <Heading as="h1" variant="h1">Dashboard Template</Heading>
            <Text>This would be a complete dashboard layout.</Text>
          </div>
        );
      case 'auth':
        return (
          <div className="p-8">
            <Heading as="h1" variant="h1">Auth Template</Heading>
            <Text>This would be authentication forms.</Text>
          </div>
        );
      case 'blog':
        return (
          <div className="p-8">
            <Heading as="h1" variant="h1">Blog Template</Heading>
            <Text>This would be a blog layout.</Text>
          </div>
        );
      case 'product-grid':
        return (
          <div className="p-8">
            <Heading as="h1" variant="h1">Product Grid Template</Heading>
            <Text>This would be a product grid layout.</Text>
          </div>
        );
      case 'product-detail':
        return (
          <div className="p-8">
            <Heading as="h1" variant="h1">Product Detail Template</Heading>
            <Text>This would be a product detail page.</Text>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8">
            <Heading as="h1" variant="h1">Settings Template</Heading>
            <Text>This would be a settings page.</Text>
          </div>
        );
      case '404':
        return (
          <div className="p-8">
            <Heading as="h1" variant="h1">404 Template</Heading>
            <Text>This would be a 404 error page.</Text>
          </div>
        );
      case '500':
        return (
          <div className="p-8">
            <Heading as="h1" variant="h1">500 Template</Heading>
            <Text>This would be a 500 error page.</Text>
          </div>
        );
      default:
        return null;
    }
  };

  if (activeTemplate) {
    return (
      <DemoLayout>
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={() => setActiveTemplate(null)}
              className="bg-white shadow-sm"
            >
              ← Back to Templates
            </Button>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            {renderTemplate()}
          </div>
        </div>
      </DemoLayout>
    );
  }

  return (
    <DemoLayout
      title="Templates Playground"
      description="Complete page templates and layouts ready for your application."
    >
      <div className="container mx-auto px-6 py-12 space-y-16">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            variant="outlined"
            interactive
            padding="lg"
            className="h-full"
          >
            <div className="flex flex-col h-full">
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <Heading as="h3" variant="h5">
                    {template.name}
                  </Heading>
                  <Badge variant="secondary" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
                <Text variant="body" color="secondary">
                  {template.description}
                </Text>
              </div>
              <div className="pt-4">
                <Button
                  onClick={() => setActiveTemplate(template.id)}
                  variant="primary"
                  size="sm"
                  fullWidth
                >
                  View Template
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

        <Spacer size="xl" />

        <section className="bg-gray-50 rounded-lg p-8 text-center">
          <Heading as="h2" variant="h3" className="mb-4 text-gray-900">
            Template Features
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="space-y-2">
              <div className="text-2xl mb-2">🎨</div>
              <Heading as="h3" variant="h5" className="text-gray-900">Fully Customizable</Heading>
              <Text variant="body" className="text-gray-600">
                All templates are fully customizable with your brand colors, fonts, and content.
              </Text>
            </div>
            <div className="space-y-2">
              <div className="text-2xl mb-2">📱</div>
              <Heading as="h3" variant="h5" className="text-gray-900">Responsive Design</Heading>
              <Text variant="body" className="text-gray-600">
                Every template is mobile-first and works perfectly across all devices.
              </Text>
            </div>
            <div className="space-y-2">
              <div className="text-2xl mb-2">⚡</div>
              <Heading as="h3" variant="h5" className="text-gray-900">Production Ready</Heading>
              <Text variant="body" className="text-gray-600">
                Templates include best practices for SEO, performance, and accessibility.
              </Text>
            </div>
          </div>
        </section>
      </div>
    </DemoLayout>
  );
}