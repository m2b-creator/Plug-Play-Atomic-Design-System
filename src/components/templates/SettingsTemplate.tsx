'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { Button, Icon, Text, Heading, Divider } from '../atoms';
import { Card } from '../molecules';
import { Header, Footer, Sidebar } from '../organisms';
import type { NavigationItem, UserMenuAction, SidebarSection } from '../organisms';
import type { ComponentSize } from '@/types';
import { cn } from '@/utils';

export interface SettingSection {
  /** Section ID */
  id: string;
  /** Section title */
  title: string;
  /** Section description */
  description?: string;
  /** Section icon */
  icon?: ReactNode;
  /** Section content */
  content: ReactNode;
  /** Whether section is disabled */
  disabled?: boolean;
}

export interface SettingsTemplateProps {
  /** Settings sections */
  sections: SettingSection[];
  /** Page title */
  title?: string;
  /** Page description */
  description?: string;
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
  /** Active section ID */
  activeSection?: string;
  /** Section change callback */
  onSectionChange?: (sectionId: string) => void;
  /** Save callback */
  onSave?: (sectionId: string, data: Record<string, unknown>) => void;
  /** Reset callback */
  onReset?: (sectionId: string) => void;
  /** Footer configuration */
  footer?: {
    brand?: ReactNode;
    description?: string;
    copyright?: string;
  };
  /** Layout variant */
  variant?: 'sidebar' | 'tabs' | 'accordion';
  /** Whether to show save/cancel buttons */
  showActions?: boolean;
  /** Whether changes are pending */
  hasUnsavedChanges?: boolean;
  /** Layout size */
  size?: ComponentSize;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

export const SettingsTemplate = ({
  sections,
  title = 'Settings',
  description = 'Manage your account settings and preferences.',
  header,
  activeSection,
  onSectionChange,
  onSave,
  onReset,
  footer,
  variant = 'sidebar',
  showActions = true,
  hasUnsavedChanges = false,
  size = 'md',
  className,
  'data-test-id': testId,
}: SettingsTemplateProps) => {
  const [internalActiveSection, setInternalActiveSection] = useState(
    activeSection || sections[0]?.id || ''
  );

  const currentSection = activeSection !== undefined ? activeSection : internalActiveSection;
  const setCurrentSection = (sectionId: string) => {
    if (activeSection === undefined) {
      setInternalActiveSection(sectionId);
    }
    onSectionChange?.(sectionId);
  };

  const activeSettingSection = sections.find(section => section.id === currentSection);

  const containerClasses = cn(
    'min-h-screen flex flex-col bg-gray-50',
    className
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

  const renderPageHeader = () => (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Heading as="h1" variant="h2" className="mb-2">
          {title}
        </Heading>
        {description && (
          <Text className="text-gray-600">
            {description}
          </Text>
        )}
      </div>
    </div>
  );

  const renderSidebarNavigation = () => {
    const sidebarSections: SidebarSection[] = [
      {
        items: sections.map(section => ({
          label: section.title,
          icon: section.icon,
          active: currentSection === section.id,
          disabled: section.disabled,
          onClick: () => !section.disabled && setCurrentSection(section.id),
        })),
      },
    ];

    return (
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <Sidebar
            sections={sidebarSections}
            collapsible={false}
            bordered={false}
            shadow={true}
            className="bg-white rounded-lg"
          />
        </div>
      </div>
    );
  };

  const renderTabsNavigation = () => (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8 overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => !section.disabled && setCurrentSection(section.id)}
              disabled={section.disabled}
              className={cn(
                'flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap',
                currentSection === section.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700',
                section.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {section.icon && <span>{section.icon}</span>}
              <span>{section.title}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  const renderAccordionNavigation = () => (
    <div className="space-y-4">
      {sections.map((section) => (
        <Card key={section.id} className="overflow-hidden">
          <button
            onClick={() => !section.disabled && setCurrentSection(section.id)}
            disabled={section.disabled}
            className={cn(
              'w-full flex items-center justify-between p-6 text-left transition-colors',
              currentSection === section.id ? 'bg-blue-50' : 'hover:bg-gray-50',
              section.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <div className="flex items-center space-x-3">
              {section.icon && <span>{section.icon}</span>}
              <div>
                <Heading as="h3" variant="h5" className="mb-1">
                  {section.title}
                </Heading>
                {section.description && (
                  <Text className="text-sm text-gray-600">
                    {section.description}
                  </Text>
                )}
              </div>
            </div>
            <Icon
              name="ChevronDown"
              size="sm"
              className={cn(
                'transition-transform',
                currentSection === section.id && 'rotate-180'
              )}
            />
          </button>
          
          {currentSection === section.id && (
            <div className="border-t border-gray-200">
              <div className="p-6">
                {section.content}
                {showActions && renderSectionActions(section.id)}
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );

  const renderSectionActions = (sectionId: string) => (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
      <div>
        {hasUnsavedChanges && (
          <Text className="text-sm text-amber-600 flex items-center">
            <Icon name="AlertCircle" size="sm" className="mr-1" />
            You have unsaved changes
          </Text>
        )}
      </div>
      
      <div className="flex space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onReset?.(sectionId)}
          disabled={!hasUnsavedChanges}
        >
          Reset
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => onSave?.(sectionId, {})}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );

  const renderMobileNavigation = () => (
    <div className="lg:hidden mb-6">
      <Card className="p-4">
        <select
          value={currentSection}
          onChange={(e) => setCurrentSection(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {sections.map((section) => (
            <option
              key={section.id}
              value={section.id}
              disabled={section.disabled}
            >
              {section.title}
            </option>
          ))}
        </select>
      </Card>
    </div>
  );

  const renderContent = () => {
    if (!activeSettingSection) return null;

    if (variant === 'accordion') {
      return renderAccordionNavigation();
    }

    return (
      <div className="flex-1 min-w-0">
        <Card className="p-8">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              {activeSettingSection.icon && (
                <span>{activeSettingSection.icon}</span>
              )}
              <Heading as="h2" variant="h3">
                {activeSettingSection.title}
              </Heading>
            </div>
            {activeSettingSection.description && (
              <Text className="text-gray-600">
                {activeSettingSection.description}
              </Text>
            )}
          </div>
          
          <Divider className="mb-8" />
          
          {activeSettingSection.content}
          
          {showActions && renderSectionActions(activeSettingSection.id)}
        </Card>
      </div>
    );
  };

  const renderFooter = () => {
    if (!footer) return null;

    return (
      <Footer
        {...footer}
        size={size}
        variant="minimal"
      />
    );
  };

  return (
    <div className={containerClasses} data-test-id={testId}>
      {renderHeader()}
      
      {variant !== 'accordion' && renderPageHeader()}
      {variant === 'tabs' && renderTabsNavigation()}
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {variant === 'accordion' && (
            <div className="mb-8">
              <Heading as="h1" variant="h2" className="mb-2">
                {title}
              </Heading>
              {description && (
                <Text className="text-gray-600">
                  {description}
                </Text>
              )}
            </div>
          )}
          
          {variant !== 'accordion' && renderMobileNavigation()}
          
          <div className={cn(
            'flex gap-8',
            variant === 'sidebar' ? 'flex-col lg:flex-row' : 'flex-col'
          )}>
            {variant === 'sidebar' && renderSidebarNavigation()}
            {renderContent()}
          </div>
        </div>
      </main>

      {renderFooter()}
    </div>
  );
};

SettingsTemplate.displayName = 'SettingsTemplate';