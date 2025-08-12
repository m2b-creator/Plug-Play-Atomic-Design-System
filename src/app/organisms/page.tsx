'use client';

import { useState } from 'react';
import { 
  Header,
  Sidebar,
  DataTable,
  Modal,
  Drawer
} from '@/components';
import { 
  Button, 
  Heading, 
  Text, 
  Divider, 
  Spacer,
  Icon,
  Badge
} from '@/components';

export default function OrganismsPlaygroundPage() {
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Sample data for components
  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
  ];

  const tableColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: false },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: false,
      render: (value: unknown) => {
        const status = value as string;
        return (
          <Badge variant={status === 'Active' ? 'success' : 'secondary'}>
            {status}
          </Badge>
        );
      }
    },
  ];

  const navigationItems = [
    { label: 'Dashboard', href: '/dashboard', icon: <Icon name="LayoutDashboard" size="sm" /> },
    { label: 'Users', href: '/users', icon: <Icon name="Users" size="sm" />, active: true },
    { label: 'Products', href: '/products', icon: <Icon name="Package" size="sm" /> },
    { label: 'Settings', href: '/settings', icon: <Icon name="Settings" size="sm" /> },
  ];


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Demo */}
      <Header
        logo={<Text variant="h6" className="font-bold">AtomicPNP</Text>}
        navigation={[
          { label: 'Home', href: '/', active: true },
          { label: 'Components', href: '/components' },
          { label: 'Documentation', href: '/docs' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Icon name="Search" size="sm" />
            </Button>
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </div>
        }
      />

      <div className="container mx-auto p-8 space-y-12">
        <div className="text-center">
          <Heading as="h1" variant="h1" className="mb-4">
            Organisms Playground
          </Heading>
          <Text variant="body" color="secondary">
            Explore and test all the organism components - complex, feature-complete components.
          </Text>
        </div>

        <Divider />

        {/* Sidebar Demo */}
        <section className="space-y-6">
          <Heading as="h2" variant="h3">Sidebar</Heading>
          <div className="border rounded-lg overflow-hidden" style={{ height: '400px' }}>
            <div className="flex h-full">
              <Sidebar
                sections={[{ items: navigationItems }]}
                collapsed={sidebarCollapsed}
                onCollapseChange={(collapsed) => setSidebarCollapsed(collapsed)}
                header={
                  <div className="p-4 border-b">
                    <Text variant="body" className="font-semibold">
                      {sidebarCollapsed ? 'AP' : 'AtomicPNP'}
                    </Text>
                  </div>
                }
                footer={
                  <div className="p-4 border-t">
                    <Button variant="ghost" size="sm" fullWidth>
                      <Icon name="LogOut" size="sm" />
                      {!sidebarCollapsed && 'Logout'}
                    </Button>
                  </div>
                }
              />
              <div className="flex-1 p-6 bg-white">
                <Text>Main content area with sidebar navigation.</Text>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                >
                  Toggle Sidebar
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* DataTable Demo */}
        <section className="space-y-6">
          <Heading as="h2" variant="h3">DataTable</Heading>
          <DataTable
            data={tableData}
            columns={tableColumns}
            emptyMessage="No users found"
          />
        </section>

        <Divider />

        {/* Modal Demo */}
        <section className="space-y-6">
          <Heading as="h2" variant="h3">Modal</Heading>
          <div className="flex gap-4">
            <Button onClick={() => setShowModal(true)}>
              Open Modal
            </Button>
            <Button onClick={() => setShowDrawer(true)} variant="outline">
              Open Drawer
            </Button>
          </div>
          
          <Modal
            open={showModal}
            onClose={() => setShowModal(false)}
            title="Example Modal"
            size="md"
            showCloseButton
          >
            <div className="space-y-4">
              <Text>
                This is a modal dialog with customizable content. It includes a header, 
                body content, and footer actions.
              </Text>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="ghost" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowModal(false)}>
                  Confirm
                </Button>
              </div>
            </div>
          </Modal>

          <Drawer
            open={showDrawer}
            onClose={() => setShowDrawer(false)}
            title="Example Drawer"
            position="right"
            size="md"
          >
            <div className="space-y-4">
              <Text>
                This is a drawer component that slides in from the side. 
                Perfect for forms, settings, or additional content.
              </Text>
              <Button onClick={() => setShowDrawer(false)}>
                Close Drawer
              </Button>
            </div>
          </Drawer>
        </section>

        <Divider />

        {/* Form Demo */}
        <section className="space-y-6">
          <Heading as="h2" variant="h3">Form Example</Heading>
          <div className="max-w-2xl">
            <Text>Form components would go here in a real implementation.</Text>
            <Button className="mt-4">Submit Form</Button>
          </div>
        </section>

        <Divider />

        {/* Carousel Demo */}
        <section className="space-y-6">
          <Heading as="h2" variant="h3">Carousel</Heading>
          <Text>Carousel component would display image galleries here.</Text>
        </section>

        <Divider />

        {/* Image Gallery Demo */}
        <section className="space-y-6">
          <Heading as="h2" variant="h3">ImageGallery</Heading>
          <Text>Image gallery component would display photo collections here.</Text>
        </section>

        <Spacer size="xl" />
      </div>

      {/* Footer Demo */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-8 text-center">
          <Text className="text-white mb-4">
            AtomicPNP - A comprehensive atomic design system
          </Text>
          <Text className="text-gray-400">
            © 2025 AtomicPNP. All rights reserved.
          </Text>
        </div>
      </footer>
    </div>
  );
}