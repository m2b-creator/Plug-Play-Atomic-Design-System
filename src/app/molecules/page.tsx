'use client';

import {useState} from 'react';
import {
    SearchBar,
    FormField,
    Card,
    MenuItem,
    Breadcrumb,
    Dropdown,
    Select,
    Checkbox,
    Radio,
    Tooltip,
    Popover,
    Alert,
    Toast,
    Pagination,
    Button,
    Icon,
    Heading,
    Text,
    Spacer,
    DemoLayout
} from '@/components';

export default function MoleculesPlaygroundPage() {
    const [selectedValue, setSelectedValue] = useState('');
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('option1');
    const [currentPage, setCurrentPage] = useState(1);
    const [showToast, setShowToast] = useState(false);

    // Sample data
    const breadcrumbItems = [
        {label: 'Home', href: '/', icon: <Icon name="Home" size="xs"/>},
        {label: 'Components', href: '/components'},
        {label: 'Molecules', current: true},
    ];

    const selectOptions = [
        {value: 'react', label: 'React', icon: <Icon name="Code" size="xs"/>},
        {value: 'vue', label: 'Vue.js'},
        {value: 'angular', label: 'Angular'},
        {value: 'svelte', label: 'Svelte'},
    ];

    const radioOptions = [
        {value: 'option1', label: 'Option 1', description: 'This is the first option'},
        {value: 'option2', label: 'Option 2', description: 'This is the second option'},
        {value: 'option3', label: 'Option 3', description: 'This is the third option', disabled: true},
    ];

    return (
        <DemoLayout
            title="Molecules Playground"
            description="Explore and test all the molecule components - composite components built from atoms."
        >
            <div className="container mx-auto px-6 py-12 space-y-16">
                {/* Search Bar */}
                <section className="space-y-6 bg-white rounded-lg border border-gray-200 p-8">
                    <Heading as="h2" variant="h3" className="text-gray-900">SearchBar</Heading>
                    <div className="space-y-4 max-w-2xl">
                        <SearchBar
                            placeholder="Search components..."
                            onSearch={(value) => {
                                console.log('Search:', value);
                            }}
                            data-test-id="search-bar-basic"
                        />
                        <SearchBar
                            placeholder="Search with loading..."
                            loading
                            buttonText="Searching"
                            size="lg"
                        />
                        <SearchBar
                            placeholder="No button version"
                            showButton={false}
                            onSearch={(value) => console.log('Search:', value)}
                        />
                    </div>
                </section>

                {/* Form Fields */}
                <section className="space-y-6 bg-white rounded-lg border border-gray-200 p-8">
                    <Heading as="h2" variant="h3" className="text-gray-900">FormField</Heading>
                    <div className="space-y-4 max-w-md">
                        <FormField
                            label="Full Name"
                            required
                            placeholder="Enter your full name"
                            helperText="This will be displayed on your profile"
                        />
                        <FormField
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            error="Please enter a valid email address"
                        />
                        <FormField
                            label="Bio"
                            placeholder="Tell us about yourself"
                            leftIcon={<Icon name="User" size="sm"/>}
                            layout="horizontal"
                        />
                    </div>
                </section>

                {/* Cards */}
                <section className="space-y-6 bg-white rounded-lg border border-gray-200 p-8">
                    <Heading as="h2" variant="h3" className="text-gray-900">Card</Heading>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card
                            variant="elevated"
                            header={<Heading as="h3" variant="h4">Basic Card</Heading>}
                            footer={
                                <div className="flex justify-end">
                                    <Button size="sm">Action</Button>
                                </div>
                            }
                        >
                            <Text>This is a basic card with header and footer.</Text>
                        </Card>

                        <Card
                            variant="outlined"
                            interactive
                            padding="lg"
                        >
                            <Heading as="h3" variant="h4" className="mb-2">Interactive Card</Heading>
                            <Text>This card is interactive and hoverable.</Text>
                        </Card>

                        <Card
                            variant="filled"
                            showDividers
                            header={<Text variant="caption" color="muted">System Status</Text>}
                            footer={<Text variant="caption" color="success">All systems operational</Text>}
                        >
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Text>API</Text>
                                    <Text color="success">Online</Text>
                                </div>
                                <div className="flex justify-between">
                                    <Text>Database</Text>
                                    <Text color="success">Online</Text>
                                </div>
                            </div>
                        </Card>
                    </div>
                </section>

                {/* Menu Items & Dropdown */}
                <section className="space-y-6 bg-white rounded-lg border border-gray-200 p-8">
                    <Heading as="h2" variant="h3" className="text-gray-900">MenuItem & Dropdown</Heading>
                    <div className="flex flex-wrap gap-4">
                        <div className="space-y-2 border rounded-md p-2 bg-white">
                            <Text variant="caption" color="muted">Menu Items</Text>
                            <MenuItem
                                leftIcon={<Icon name="Settings" size="sm"/>}
                                shortcut="⌘,"
                            >
                                Settings
                            </MenuItem>
                            <MenuItem
                                leftIcon={<Icon name="User" size="sm"/>}
                                selected
                            >
                                Profile
                            </MenuItem>
                            <MenuItem
                                leftIcon={<Icon name="LogOut" size="sm"/>}
                                description="Sign out of your account"
                            >
                                Logout
                            </MenuItem>
                            <MenuItem disabled>
                                Disabled Item
                            </MenuItem>
                        </div>

                        <Dropdown
                            trigger={
                                <Button variant="outline">
                                    Dropdown Menu
                                    <Icon name="ChevronDown" size="sm"/>
                                </Button>
                            }
                        >
                            <MenuItem leftIcon={<Icon name="Edit" size="sm"/>}>
                                Edit
                            </MenuItem>
                            <MenuItem leftIcon={<Icon name="Copy" size="sm"/>}>
                                Copy
                            </MenuItem>
                            <MenuItem leftIcon={<Icon name="Trash2" size="sm"/>}>
                                Delete
                            </MenuItem>
                        </Dropdown>
                    </div>
                </section>

                {/* Breadcrumb */}
                <section className="space-y-6 bg-white rounded-lg border border-gray-200 p-8">
                    <Heading as="h2" variant="h3" className="text-gray-900">Breadcrumb</Heading>
                    <div className="space-y-4">
                        <Breadcrumb
                            items={breadcrumbItems}
                            showHomeIcon
                        />
                        <Breadcrumb
                            items={breadcrumbItems}
                            separator="slash"
                            size="sm"
                        />
                        <Breadcrumb
                            items={[
                                {label: 'Level 1', href: '/1'},
                                {label: 'Level 2', href: '/2'},
                                {label: 'Level 3', href: '/3'},
                                {label: 'Level 4', href: '/4'},
                                {label: 'Level 5', href: '/5'},
                                {label: 'Current Level', current: true},
                            ]}
                            maxItems={4}
                        />
                    </div>
                </section>

                {/* Select */}
                <section className="space-y-6 bg-white rounded-lg border border-gray-200 p-8">
                    <Heading as="h2" variant="h3" className="text-gray-900">Select</Heading>
                    <div className="space-y-4 max-w-md">
                        <Select
                            options={selectOptions}
                            placeholder="Choose a framework"
                            value={selectedValue}
                            onChange={setSelectedValue}
                        />
                        <Select
                            options={selectOptions}
                            placeholder="Searchable select"
                            searchable
                        />
                        <Select
                            options={selectOptions}
                            placeholder="Error state"
                            error
                        />
                    </div>
                </section>

                {/* Checkbox & Radio */}
                <section className="space-y-6 bg-white rounded-lg border border-gray-200 p-8">
                    <Heading as="h2" variant="h3" className="text-gray-900">Checkbox & Radio</Heading>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <Text variant="body" className="font-medium">Checkboxes</Text>
                            <Checkbox
                                label="Accept terms and conditions"
                                checked={checkboxChecked}
                                onChange={(e) => setCheckboxChecked(e.target.checked)}
                            />
                            <Checkbox
                                label="Subscribe to newsletter"
                                description="Get updates about new features and releases"
                            />
                            <Checkbox
                                label="Indeterminate state"
                                indeterminate
                            />
                            <Checkbox
                                label="Disabled checkbox"
                                disabled
                            />
                        </div>

                        <div className="space-y-4">
                            <Text variant="body" className="font-medium">Radio Buttons</Text>
                            <Radio
                                label="Choose an option"
                                options={radioOptions}
                                name="demo-radio"
                                value={radioValue}
                                onChange={(e) => setRadioValue(e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                {/* Tooltip & Popover */}
                <section className="space-y-6 bg-white rounded-lg border border-gray-200 p-8">
                    <Heading as="h2" variant="h3" className="text-gray-900">Tooltip & Popover</Heading>
                    <div className="flex flex-wrap gap-4">
                        <Tooltip content="This is a tooltip" placement="top">
                            <Button>Hover for tooltip</Button>
                        </Tooltip>

                        <Tooltip content="Click tooltip" trigger="click" placement="bottom">
                            <Button>Click for tooltip</Button>
                        </Tooltip>

                        <Popover
                            trigger={<Button>Open Popover</Button>}
                            title="Popover Title"
                            showCloseButton
                        >
                            <div className="space-y-2">
                                <Text>This is popover content with more space for information.</Text>
                                <Button size="sm">Action</Button>
                            </div>
                        </Popover>
                    </div>
                </section>

                {/* Alerts */}
                <section className="space-y-6 bg-white rounded-lg border border-gray-200 p-8">
                    <Heading as="h2" variant="h3" className="text-gray-900">Alert</Heading>
                    <div className="space-y-4">
                        <Alert variant="info" title="Information" dismissible>
                            This is an informational alert with a dismiss button.
                        </Alert>
                        <Alert variant="success" title="Success!">
                            Your changes have been saved successfully.
                        </Alert>
                        <Alert variant="warning" title="Warning">
                            This action cannot be undone. Please proceed with caution.
                        </Alert>
                        <Alert variant="danger" title="Error" dismissible>
                            There was an error processing your request. Please try again.
                        </Alert>
                    </div>
                </section>

                {/* Toast */}
                <section className="space-y-6 bg-white rounded-lg border border-gray-200 p-8">
                    <Heading as="h2" variant="h3" className="text-gray-900">Toast</Heading>
                    <div className="space-y-4">
                        <Button onClick={() => setShowToast(true)}>
                            Show Toast
                        </Button>

                        {showToast && (
                            <Toast
                                variant="success"
                                title="Success!"
                                description="Your action was completed successfully."
                                onDismiss={() => setShowToast(false)}
                                position="top-right"
                            />
                        )}
                    </div>
                </section>

                {/* Pagination */}
                <section className="space-y-6 bg-white rounded-lg border border-gray-200 p-8">
                    <Heading as="h2" variant="h3" className="text-gray-900">Pagination</Heading>
                    <div className="space-y-4">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={10}
                            onPageChange={setCurrentPage}
                        />
                        <Text variant="caption" color="muted" className="text-center">
                            Current page: {currentPage} of 10
                        </Text>
                    </div>
                </section>

                <Spacer size="xl"/>
            </div>
        </DemoLayout>
    );
}