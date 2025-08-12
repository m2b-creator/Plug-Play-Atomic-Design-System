import {
    Button,
    Input,
    Icon,
    Label,
    Badge,
    Tag,
    Avatar,
    Spinner,
    ProgressBar,
    Skeleton,
    Heading,
    Text,
    Link,
    Divider,
    Spacer,
    DemoLayout
} from '@/components';

export default function PlaygroundPage() {
    return (
        <DemoLayout
            title="AtomicPNP Component Playground"
            description="Explore and test all the atomic components in the design system."
        >
            <div
                className="container mx-auto px-6 py-12 space-y-16">{/* Changed from p-8 to px-6 py-12 and space-y-12 to space-y-16 */}

                {/* Buttons */}
                <section className="space-y-6 bg-white rounded-lg border border-gray-200 p-8">
                    <Heading as="h2" variant="h3" className="text-gray-900">Buttons</Heading>
                    <div className="flex flex-wrap gap-4">
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="danger">Danger</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="outline">Outline</Button>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Button size="xs">Extra Small</Button>
                        <Button size="sm">Small</Button>
                        <Button size="md">Medium</Button>
                        <Button size="lg">Large</Button>
                        <Button size="xl">Extra Large</Button>
                    </div>
                </section>

                {/* Inputs */}
                <section className="space-y-6 bg-white rounded-lg border border-gray-200 p-8">
                    <Heading as="h2" variant="h3" className="text-gray-900">Inputs</Heading>
                    <div className="space-y-4 max-w-md">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Enter your name"/>
                        </div>
                        <div>
                            <Label htmlFor="email" required>Email</Label>
                            <Input id="email" type="email" placeholder="Enter your email"/>
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Enter your password"/>
                        </div>
                        <div>
                            <Label htmlFor="search">Search</Label>
                            <Input
                                id="search"
                                type="search"
                                placeholder="Search..."
                                leftIcon={<Icon name="Search" size="sm"/>}
                            />
                        </div>
                    </div>
                </section>

                {/* Badges and Tags */}
                <section className="space-y-6 bg-white rounded-lg border border-gray-200 p-8">
                    <Heading as="h2" variant="h3" className="text-gray-900">Badges & Tags</Heading>
                    <div className="flex flex-wrap gap-4">
                        <Badge variant="primary">Primary</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="danger">Danger</Badge>
                        <Badge variant="success">Success</Badge>
                        <Badge variant="warning">Warning</Badge>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <Tag variant="primary">Design</Tag>
                        <Tag variant="secondary">Development</Tag>
                        <Tag variant="success" removable>React</Tag>
                        <Tag variant="neutral" leftIcon={<Icon name="Star" size="xs"/>}>Featured</Tag>
                    </div>
                </section>

                {/* Avatars */}
                <section className="space-y-6 bg-white rounded-lg border border-gray-200 p-8">
                    <Heading as="h2" variant="h3" className="text-gray-900">Avatars</Heading>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Avatar size="xs" alt="John Doe"/>
                        <Avatar size="sm" alt="Jane Smith"/>
                        <Avatar size="md" alt="Bob Johnson" showStatus status="online"/>
                        <Avatar size="lg" alt="Alice Brown" showStatus status="away"/>
                        <Avatar size="xl" alt="Charlie Wilson" showStatus status="busy"/>
                    </div>
                </section>

                {/* Loading States */}
                <section className="space-y-6 bg-white rounded-lg border border-gray-200 p-8">
                    <Heading as="h2" variant="h3" className="text-gray-900">Loading States</Heading>
                    <div className="space-y-6">
                        <div>
                            <Text variant="caption" color="muted">Spinners</Text>
                            <div className="flex gap-4 items-center mt-2">
                                <Spinner size="xs"/>
                                <Spinner size="sm"/>
                                <Spinner size="md"/>
                                <Spinner size="lg"/>
                                <Spinner size="xl"/>
                            </div>
                        </div>

                        <div>
                            <Text variant="caption" color="muted">Progress Bars</Text>
                            <div className="space-y-4 mt-2 max-w-md">
                                <ProgressBar value={25} showLabel/>
                                <ProgressBar value={50} variant="success"/>
                                <ProgressBar value={75} variant="warning"/>
                                <ProgressBar value={100} variant="danger"/>
                            </div>
                        </div>

                        <div>
                            <Text variant="caption" color="muted">Skeletons</Text>
                            <div className="space-y-4 mt-2">
                                <Skeleton variant="text" lines={3}/>
                                <div className="flex gap-4 items-center">
                                    <Skeleton variant="circular"/>
                                    <div className="flex-1">
                                        <Skeleton variant="text" width="60%"/>
                                        <Skeleton variant="text" width="40%"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Typography */}
                <section className="space-y-6 bg-white rounded-lg border border-gray-200 p-8">
                    <Heading as="h2" variant="h3" className="text-gray-900">Typography</Heading>
                    <div className="space-y-4">
                        <Heading as="h1" variant="h1">Heading 1</Heading>
                        <Heading as="h2" variant="h2">Heading 2</Heading>
                        <Heading as="h3" variant="h3">Heading 3</Heading>
                        <Text variant="body">This is body text with normal weight and size.</Text>
                        <Text variant="caption" color="muted">This is caption text, smaller and muted.</Text>
                        <div className="flex gap-4">
                            <Link href="#" variant="default">Default Link</Link>
                            <Link href="#" variant="subtle">Subtle Link</Link>
                            <Link href="#" external>External Link</Link>
                            <Link href="#" variant="button">Button Link</Link>
                        </div>
                    </div>
                </section>

                {/* Layout Components */}
                <section className="space-y-6 bg-white rounded-lg border border-gray-200 p-8">
                    <Heading as="h2" variant="h3" className="text-gray-900">Layout Components</Heading>
                    <div className="space-y-4">
                        <Text variant="caption" color="muted">Dividers</Text>
                        <Divider variant="light"/>
                        <Divider label="OR"/>
                        <Divider variant="strong"/>

                        <Text variant="caption" color="muted">Spacers (vertical)</Text>
                        <div className="bg-gray-100 p-4">
                            <div className="bg-blue-200 p-2">Block 1</div>
                            <Spacer size="md"/>
                            <div className="bg-blue-200 p-2">Block 2</div>
                            <Spacer size="lg"/>
                            <div className="bg-blue-200 p-2">Block 3</div>
                        </div>
                    </div>
                </section>

                <Spacer size="xl"/>
            </div>
        </DemoLayout>
    );
}