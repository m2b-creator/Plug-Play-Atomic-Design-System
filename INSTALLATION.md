# AtomicPNP Installation & Usage Guide

A comprehensive plug-and-play atomic design system for Next.js projects built with TypeScript, Tailwind CSS, and React 19.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Component Usage](#component-usage)
- [Theming](#theming)
- [Testing](#testing)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

- **Node.js**: 18.17 or later
- **React**: 19.0 or later  
- **Next.js**: 15.0 or later
- **TypeScript**: 5.0 or later
- **Tailwind CSS**: 4.0 or later

## 📦 Installation

### Option 1: Clone the Repository (Recommended)

```bash
# Clone the repository
git clone https://github.com/your-org/atomicpnp.git
cd atomicpnp

# Install dependencies
npm install

# Start development server
npm run dev
```

### Option 2: Copy Components to Existing Project

1. **Install required dependencies:**

```bash
npm install clsx tailwind-merge lucide-react
npm install -D @tailwindcss/postcss tailwindcss @types/react @types/react-dom
```

2. **Copy the component files:**

```bash
# Copy all component directories
cp -r src/components/* your-project/src/components/
cp -r src/utils/* your-project/src/utils/
cp -r src/types/* your-project/src/types/
cp -r src/hooks/* your-project/src/hooks/
```

3. **Update your `tailwind.config.js`:**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [],
}
```

## 🚀 Quick Start

### 1. Basic Component Usage

```tsx
import { Button, Input, Card, Heading } from '@/components';

export default function MyPage() {
  return (
    <div className="p-8">
      <Heading as="h1" variant="h1">
        Welcome to AtomicPNP
      </Heading>
      
      <Card variant="outlined" padding="lg" className="mt-6">
        <Input placeholder="Enter your name" className="mb-4" />
        <Button variant="primary" fullWidth>
          Get Started
        </Button>
      </Card>
    </div>
  );
}
```

### 2. With Theme Provider

```tsx
// app/layout.tsx
import { ThemeProvider } from '@/providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultTheme="light" enableSystemTheme>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 3. Using Templates

```tsx
import { DashboardLayout } from '@/components';

export default function Dashboard() {
  return (
    <DashboardLayout
      user={{
        name: 'John Doe',
        email: 'john@example.com',
        avatar: '/avatar.jpg',
      }}
      navigation={[
        { label: 'Dashboard', href: '/', active: true },
        { label: 'Settings', href: '/settings' },
      ]}
    >
      <h1>Dashboard Content</h1>
    </DashboardLayout>
  );
}
```

## 📁 Project Structure

```
src/
├── components/           # Component library
│   ├── atoms/           # Basic building blocks
│   ├── molecules/       # Simple combinations
│   ├── organisms/       # Complex components
│   ├── templates/       # Page layouts
│   └── pages/           # Complete pages
├── hooks/               # Reusable React hooks
├── utils/               # Utility functions
├── types/               # TypeScript definitions
├── styles/              # Design tokens and themes
├── providers/           # React context providers
└── test/                # Testing utilities
```

## 🧩 Component Usage

### Atoms (Basic Components)

```tsx
// Buttons
<Button variant="primary" size="lg">Primary Button</Button>
<Button variant="secondary" loading>Loading...</Button>
<Button variant="danger" leftIcon={<TrashIcon />}>Delete</Button>

// Inputs  
<Input type="email" placeholder="Email address" />
<Input error helperText="Please enter a valid email" />
<Input leftIcon={<SearchIcon />} placeholder="Search..." />

// Typography
<Heading as="h1" variant="h2">Page Title</Heading>
<Text variant="body" color="secondary">Description text</Text>
```

### Molecules (Composite Components)

```tsx
// Search Bar
<SearchBar 
  placeholder="Search products..."
  onSearch={(query) => handleSearch(query)}
  showButton
/>

// Form Fields
<FormField
  label="Full Name"
  required
  placeholder="Enter your name"
  helperText="This will be shown on your profile"
/>

// Cards
<Card 
  variant="elevated"
  header={<h3>Card Title</h3>}
  footer={<Button>Action</Button>}
>
  Card content goes here
</Card>
```

### Organisms (Complex Components)

```tsx
// Data Table
<DataTable
  data={users}
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
  ]}
  searchable
  pagination
  selectable
/>

// Modal
<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Confirm Action"
  size="md"
>
  <p>Are you sure you want to continue?</p>
  <div className="flex gap-2 mt-4">
    <Button onClick={handleConfirm}>Confirm</Button>
    <Button variant="ghost" onClick={() => setShowModal(false)}>
      Cancel
    </Button>
  </div>
</Modal>
```

## 🎨 Theming

### Using the Theme System

```tsx
import { useTheme, ThemeToggle } from '@/providers';

function MyComponent() {
  const { theme, themeName, setTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {themeName}</p>
      <ThemeToggle size="md" showLabel />
    </div>
  );
}
```

### Custom Theme Colors

```tsx
// Using CSS custom properties
<div style={{ 
  backgroundColor: 'var(--color-bg-primary)',
  color: 'var(--color-text-primary)' 
}}>
  Themed content
</div>

// Using design tokens
import { designTokens } from '@/styles/design-tokens';

const customStyles = {
  backgroundColor: designTokens.colors.primary[500],
  color: designTokens.colors.neutral[50],
};
```

### Creating Custom Themes

```tsx
import { Theme } from '@/styles/theme';

const customTheme: Theme = {
  name: 'custom',
  colors: {
    background: {
      primary: '#ffffff',
      secondary: '#f8f9fa',
      // ... other colors
    },
    // ... complete theme definition
  },
};
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Component Tests

```tsx
import { render, screen } from '@/test/test-utils';
import { Button } from '@/components';

test('renders button correctly', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
});

test('handles click events', async () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  await user.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Accessibility Testing

```tsx
import { a11yTest } from '@/utils/accessibility';

test('component meets accessibility requirements', () => {
  render(<Button>Accessible Button</Button>);
  const button = screen.getByRole('button');
  
  expect(a11yTest.hasAccessibleName(button)).toBe(true);
  expect(button).toHaveAttribute('type', 'button');
});
```

## ✅ Best Practices

### Component Usage

1. **Always use semantic HTML elements**
```tsx
// Good
<Button type="submit">Submit Form</Button>

// Avoid
<div onClick={handleClick}>Submit Form</div>
```

2. **Provide accessible labels**
```tsx
// Good
<Button aria-label="Close dialog">×</Button>

// Good
<Input aria-label="Email address" />
```

3. **Use appropriate variants**
```tsx
// Primary for main actions
<Button variant="primary">Save Changes</Button>

// Danger for destructive actions
<Button variant="danger">Delete Account</Button>
```

### Performance

1. **Import only what you need**
```tsx
// Good - tree shakeable
import { Button, Input } from '@/components';

// Avoid - imports everything
import * as Components from '@/components';
```

2. **Use loading states**
```tsx
<Button loading={isSubmitting} disabled={isSubmitting}>
  {isSubmitting ? 'Saving...' : 'Save'}
</Button>
```

### Styling

1. **Extend with className, don't override**
```tsx
// Good - extends existing styles
<Button className="mt-4">Button</Button>

// Avoid - might break component styles
<Button style={{ margin: '16px 0' }}>Button</Button>
```

2. **Use design tokens for consistency**
```tsx
import { designTokens } from '@/styles/design-tokens';

// Good - uses design system values
<div className="p-4 rounded-lg">Content</div>

// Good - programmatic access
const spacing = designTokens.spacing[4];
```

## 🔧 Troubleshooting

### Common Issues

**1. TypeScript errors with component props**
```bash
Error: Property 'variant' does not exist on type...
```
Solution: Ensure you're importing from the correct path and the component supports that prop.

**2. Tailwind classes not applying**
```bash
Warning: Class 'custom-class' not found
```
Solution: Make sure your `tailwind.config.js` includes the component paths in the `content` array.

**3. Theme not applying**
```bash
CSS custom properties not working
```
Solution: Ensure `ThemeProvider` wraps your app and is client-side rendered.

### Build Issues

**1. Next.js build errors**
```bash
npm run build
```
Check for:
- Unused imports
- TypeScript errors
- Missing dependencies

**2. Test failures**
```bash
npm test
```
Common fixes:
- Update snapshots: `npm test -- -u`
- Check test setup in `src/test/setup.ts`

### Getting Help

1. **Check component documentation**: Visit `/docs` in development
2. **Review examples**: Check `/playground` pages
3. **TypeScript errors**: Hover over props in your IDE for inline docs
4. **GitHub Issues**: Report bugs or request features

## 📚 Additional Resources

- [Component Documentation](/docs) - Complete prop reference
- [Playground Examples](/playground) - Interactive examples
- [Design Tokens](/styles/design-tokens.ts) - Available design values
- [Accessibility Guide](/utils/accessibility.ts) - WCAG compliance helpers
- [Testing Utilities](/test/test-utils.tsx) - Test helpers and patterns

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/new-component`
3. **Follow the atomic design structure**
4. **Write tests for new components**
5. **Update documentation**
6. **Submit a pull request**

---

**AtomicPNP** - Built with ❤️ for the Next.js community