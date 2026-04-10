import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BreadcrumbItem {
  name: string;
  path?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ items, className = '' }: BreadcrumbProps) => {
  const location = useLocation();
  const { t } = useLanguage();

  // Generate breadcrumbs from current path if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { name: t('nav.home'), path: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Convert path segment to readable name
      let name = segment;
      if (segment === 'about') name = t('nav.about');
      else if (segment === 'services') name = t('nav.services');
      else if (segment === 'contact') name = t('nav.contact');
      else if (segment === 'internal') name = 'Internal System';
      else {
        // Convert kebab-case to title case
        name = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }

      breadcrumbs.push({ name, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  return (
    <nav className={`flex items-center space-x-2 text-sm text-muted-foreground ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            {index === 0 && <Home className="h-4 w-4" />}
            {index > 0 && <ChevronRight className="h-4 w-4" />}
            
            {item.path && index < breadcrumbItems.length - 1 ? (
              <Link
                to={item.path}
                className="hover:text-foreground transition-colors duration-200"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
