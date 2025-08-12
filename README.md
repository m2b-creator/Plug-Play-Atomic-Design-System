# AtomicPNP 🚀

A comprehensive, plug-and-play atomic design system for Next.js projects. Built with Next.js 15, React 19, and TypeScript, providing a complete UI component library following atomic design principles.

## ✨ Features

- **50+ Reusable Components** across all atomic design levels
- **TypeScript-First** with strict typing and full IntelliSense support
- **Tailwind CSS 4** for styling with class-based approach only
- **Accessibility-First** with WCAG 2.1 AA compliance
- **Zero External Dependencies** for styling - pure utility classes
- **Tree-Shakeable** components for optimal bundle sizes
- **MCP Integration** for AI-assisted development
- **Dark/Light Mode** theme system with design tokens
- **Comprehensive Testing** infrastructure with Jest & React Testing Library
- **Interactive Documentation** with component playgrounds

## 🎯 Atomic Design Structure

```
src/components/
├── atoms/          # Basic building blocks (Button, Input, Icon, etc.)
├── molecules/      # Simple combinations (SearchBar, Card, FormField, etc.)
├── organisms/      # Complex components (Header, DataTable, Modal, etc.)
├── templates/      # Page layouts (Dashboard, Landing, Auth templates)
└── pages/          # Complete page implementations
```

## 🚀 Quick Start

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start development server
npm run dev

# View component playground at http://localhost:3000
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server with turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint linter

# Testing
npm test             # Run component tests
npm run test:watch   # Run tests in watch mode

# MCP Integration
npm run mcp:server   # Start MCP server for Serena
npm run mcp:build    # Build MCP server for production
```

## 📖 Component Usage

### Import Components

```typescript
import { Button, Card, Header, DashboardLayout } from 'atomicpnp';
```

### Basic Usage

```tsx
// Atoms
<Button variant="primary" size="lg">
  Click Me
</Button>

<Input placeholder="Enter text" error={hasError} />

// Molecules
<SearchBar 
  onSearch={handleSearch} 
  loading={isLoading}
  placeholder="Search products..." 
/>

<Card>
  <Card.Header>Card Title</Card.Header>
  <Card.Body>Card content goes here</Card.Body>
</Card>

// Organisms
<Modal open={isOpen} onClose={handleClose} title="Confirmation">
  <p>Are you sure you want to delete this item?</p>
</Modal>

// Templates
<DashboardLayout>
  <DashboardLayout.Sidebar>
    {/* Sidebar content */}
  </DashboardLayout.Sidebar>
  <DashboardLayout.Main>
    {/* Main content */}
  </DashboardLayout.Main>
</DashboardLayout>
```

## 🎨 Design System

### Universal Props

All components accept these standard props:

```typescript
interface BaseComponentProps {
  className?: string;           // Custom styling
  variant?: string;            // Visual variant
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;          // Disabled state
  'data-test-id'?: string;    // Testing identifier
}
```

### Theme System

```typescript
import { useTheme, ThemeProvider } from 'atomicpnp';

// Theme provider setup
<ThemeProvider theme="light">
  <App />
</ThemeProvider>

// Use theme in components
const { theme, setTheme } = useTheme();
```

## 🧪 Testing

The project includes comprehensive testing infrastructure:

```bash
# Run all tests
npm test

# Run specific test suites
npm test -- --testNamePattern="Button"
npm test -- --testPathPattern="accessibility"

# Coverage report
npm test -- --coverage
```

### Testing Utilities

```typescript
import { render, screen } from '@/test/test-utils';
import { a11yTest } from '@/utils/accessibility';

// Component testing
test('renders button correctly', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

// Accessibility testing
test('button has accessible name', () => {
  render(<Button aria-label="Close">&times;</Button>);
  const button = screen.getByRole('button');
  expect(a11yTest.hasAccessibleName(button)).toBe(true);
});
```

## 📁 Project Structure

```
atomicpnp/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # Atomic design components
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   ├── templates/
│   │   └── pages/
│   ├── hooks/              # Reusable React hooks
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript types
│   └── test/               # Testing setup and utilities
├── docs/                   # Documentation
├── CLAUDE.md              # AI assistant instructions
├── ATOMIC-DESIGN-PLAN.md  # Implementation roadmap
└── INSTALLATION.md        # Setup guide
```

## 🔧 Configuration

### TypeScript

- Strict mode enabled with ES2017 target
- Path aliases: `@/*` maps to `./src/*`
- Type-only imports for better build performance

### Tailwind CSS

- Version 4 with utility-first approach
- Custom design tokens and theme configuration
- Responsive design built into components
- Dark mode support

### ESLint

- Next.js recommended rules
- TypeScript strict mode compliance
- Accessibility linting with eslint-plugin-jsx-a11y

## 🌐 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile**: iOS Safari, Chrome Mobile
- **Accessibility**: Screen readers, keyboard navigation

## 📚 Documentation

- **Component Playground**: Visit `/playground` for interactive demos
- **API Reference**: Visit `/docs` for complete component documentation
- **Design Guidelines**: Check `ATOMIC-DESIGN-PLAN.md`
- **Installation Guide**: See `INSTALLATION.md`

## 🤝 Contributing

1. Follow the atomic design principles outlined in `ATOMIC-DESIGN-PLAN.md`
2. Maintain TypeScript strict mode compliance
3. Include tests for all new components
4. Follow accessibility-first development practices
5. Use class-based styling (no CSS-in-JS)

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Atomic Design](https://atomicdesign.bradfrost.com)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref)

---

Built with ❤️ using Next.js 15, React 19, and TypeScript