import { useParams, usePathname } from 'next/navigation';
import { useMemo } from 'react';

type Breadcrumb = {
  name: string;
  href: string;
};

const useBreadCrumbs = () => {
  const params = useParams();
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    
    const paramValues = Object.values(params).flat().map(String);
    
    const filteredSegments = segments.filter(
      segment => !paramValues.includes(segment)
    );
    
    const result: Breadcrumb[] = [];
    
    filteredSegments.reduce((acc, segment, index) => {
      const href = index === 0 ? `/${segment}` : `${acc}/${segment}`;
      result.push({ 
        name: segment, 
        href 
      });
      return href;
    }, '');

    return result;
  }, [pathname, params]);

  return breadcrumbs;
};

export default useBreadCrumbs;