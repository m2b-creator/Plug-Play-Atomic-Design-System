'use client';

import {useState} from 'react';
import {getAllDocs} from '@/lib/component-docs';
import type {ComponentDocumentation} from '@/types/component-docs';
import {
    Heading,
    Text,
    Card,
    Badge,
    Button,
    Divider,
    SearchBar,
    Icon,
    DemoLayout
} from '@/components';

export default function DocsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedComponent, setSelectedComponent] = useState<ComponentDocumentation | null>(null);

    const allDocs = getAllDocs();
    const categories = ['all', 'atoms', 'molecules', 'organisms', 'templates'];

    const filteredDocs = allDocs.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (selectedComponent) {
        return (
            <DemoLayout>
                <div className="container mx-auto px-6 py-8 space-y-8">
                    <div className="flex items-center gap-4 mb-6">
                        <Button
                            variant="ghost"
                            onClick={() => setSelectedComponent(null)}
                            leftIcon={<Icon name="ArrowLeft" size="sm"/>}
                        >
                            Back to Components
                        </Button>
                        <Badge variant="secondary">{selectedComponent.category}</Badge>
                    </div>

                    <div className="space-y-8">
                        {/* Component Header */}
                        <div className="space-y-4">
                            <Heading as="h1" variant="h1">{selectedComponent.name}</Heading>
                            <Text variant="body" className="text-lg">
                                {selectedComponent.description}
                            </Text>
                        </div>

                        <Divider/>

                        {/* Usage */}
                        <section className="space-y-4">
                            <Heading as="h2" variant="h3">Usage</Heading>
                            <Card variant="filled" padding="lg">
                                <Text variant="body">{selectedComponent.usage}</Text>
                            </Card>
                        </section>

                        {/* Props Documentation */}
                        <section className="space-y-4">
                            <Heading as="h2" variant="h3">Props</Heading>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse border border-gray-200 rounded-lg">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Prop</th>
                                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Type</th>
                                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Required</th>
                                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Default</th>
                                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Description</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {selectedComponent.props.map((prop, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="border border-gray-200 px-4 py-3 font-mono text-sm">
                                                {prop.name}
                                            </td>
                                            <td className="border border-gray-200 px-4 py-3 font-mono text-sm text-blue-600">
                                                {prop.type}
                                            </td>
                                            <td className="border border-gray-200 px-4 py-3">
                                                <Badge variant={prop.required ? 'danger' : 'secondary'} size="sm">
                                                    {prop.required ? 'Yes' : 'No'}
                                                </Badge>
                                            </td>
                                            <td className="border border-gray-200 px-4 py-3 font-mono text-sm">
                                                {prop.defaultValue || '—'}
                                            </td>
                                            <td className="border border-gray-200 px-4 py-3">
                                                {prop.description}
                                                {prop.examples && (
                                                    <div className="mt-2">
                                                        <Text variant="caption" color="muted">Examples:</Text>
                                                        <div className="flex gap-1 mt-1 flex-wrap">
                                                            {prop.examples.map((example, i) => (
                                                                <Badge key={i} variant="neutral" size="sm">
                                                                    {example}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Examples */}
                        <section className="space-y-4">
                            <Heading as="h2" variant="h3">Examples</Heading>
                            <div className="space-y-6">
                                {selectedComponent.examples.map((example, index) => (
                                    <Card key={index} variant="outlined" padding="lg">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <Heading as="h3" variant="h5">{example.name}</Heading>
                                                <Button variant="ghost" size="sm">
                                                    <Icon name="Copy" size="sm"/>
                                                    Copy
                                                </Button>
                                            </div>
                                            <Text variant="body" color="secondary">
                                                {example.description}
                                            </Text>
                                            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-gray-100 text-sm">
                        <code>{example.code}</code>
                      </pre>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        {/* Accessibility */}
                        <section className="space-y-4">
                            <Heading as="h2" variant="h3">Accessibility</Heading>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card variant="outlined" padding="lg">
                                    <div className="space-y-3">
                                        <Heading as="h4" variant="h6">ARIA Support</Heading>
                                        <div className="space-y-1">
                                            {selectedComponent.accessibility.ariaSupported.map((aria, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <Icon name="Check" size="sm" className="text-green-600"/>
                                                    <Text variant="body" className="font-mono text-sm">{aria}</Text>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Card>

                                <Card variant="outlined" padding="lg">
                                    <div className="space-y-3">
                                        <Heading as="h4" variant="h6">Keyboard Navigation</Heading>
                                        <div className="space-y-1">
                                            {selectedComponent.accessibility.keyboardNavigation.map((key, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <Icon name="Keyboard" size="sm" className="text-blue-600"/>
                                                    <Text variant="body">{key}</Text>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Card>

                                <Card variant="outlined" padding="lg" className="md:col-span-2">
                                    <div className="space-y-3">
                                        <Heading as="h4" variant="h6">Guidelines</Heading>
                                        <div className="space-y-2">
                                            {selectedComponent.accessibility.guidelines.map((guideline, index) => (
                                                <div key={index} className="flex items-start gap-2">
                                                    <Icon name="AlertCircle" size="sm"
                                                          className="text-amber-600 mt-0.5"/>
                                                    <Text variant="body">{guideline}</Text>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </section>
                    </div>
                </div>
            </DemoLayout>
        );
    }

    return (
        <DemoLayout
            title="Component Documentation"
            description="Complete reference for all AtomicPNP components with props, examples, and accessibility guidelines."
        >
            <div className="container mx-auto px-6 py-12 space-y-12">

                {/* Search and Filters */}
                <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
                    <SearchBar
                        placeholder="Search components..."
                        onSearch={setSearchQuery}
                        showButton={false}
                    />

                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? 'primary' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Component Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDocs.map((doc) => (
                        <Card
                            key={doc.name}
                            variant="outlined"
                            interactive
                            padding="lg"
                            className="h-full cursor-pointer"
                            onClick={() => setSelectedComponent(doc)}
                        >
                            <div className="flex flex-col h-full space-y-3">
                                <div className="flex items-start justify-between">
                                    <Heading as="h3" variant="h5">{doc.name}</Heading>
                                    <Badge variant="secondary" size="sm">
                                        {doc.category}
                                    </Badge>
                                </div>
                                <Text variant="body" color="secondary" className="flex-1">
                                    {doc.description}
                                </Text>
                                <div className="flex items-center justify-between pt-2">
                                    <Text variant="caption" color="muted">
                                        {doc.props.length} props
                                    </Text>
                                    <Icon name="ArrowRight" size="sm" className="text-gray-400"/>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredDocs.length === 0 && (
                    <div className="text-center py-12">
                        <Icon name="Search" size="lg" className="text-gray-400 mx-auto mb-4"/>
                        <Heading as="h3" variant="h4" className="text-gray-500">No components found</Heading>
                        <Text variant="body" className="text-gray-500">
                            Try adjusting your search or filter criteria.
                        </Text>
                    </div>
                )}
            </div>
        </DemoLayout>
    );
}