'use client';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/shared/components/ui';
import useBreadCrumbs from '@/shared/hooks/useBreadCrums';
import { cn } from '@/shared/lib/utils';
interface BreadCrumbsProps {
  className?: string;
}

const BreadCrumbs = ({ className }: BreadCrumbsProps) => {

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className={cn('text-black font-medium text-[15px]', className)}
              href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          {useBreadCrumbs().map((path) => {
            return (
              <BreadcrumbItem key={path.name}>
                <BreadcrumbLink
                  className={cn('text-black text-[15px]', className)}
                  href={path.href}>
                  &nbsp;/&nbsp;{path.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};

export default BreadCrumbs;
