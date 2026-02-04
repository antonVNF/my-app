'use client';
import React, { useState } from 'react';
import Container from '@/shared/components/shared/Сontainer';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/shared/components/ui';
import { Search, LogOut, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import SearchInput from './Search-Input';

interface IProps {
  className?: string;
}

const siteConfig = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/shop',
    label: 'Shop',
  },
  {
    href: '/care',
    label: 'Plant Care',
  },
  {
    href: '/blogs',
    label: 'Blogs',
  },
];

const Header = ({ className }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className={cn('', className)}>
      <Container className=" border-b border-primary border-opacity-5 flex justify-between items-center px-4">
        <Link href={'/'}>
          <Image height={34} width={150} src="/logo.png" alt="logo" />
        </Link>
        <nav className="flex">
          {siteConfig.map((i) => {
            const isActive =
              i.href === '/'
                ? pathname === '/'
                : pathname === i.href || pathname.startsWith(i.href + '/');
            return (
              <Link
                key={i.href}
                href={i.href}
                className={cn(
                  'px-5 py-5',
                  isActive ? 'text-primary border-b-3 border-primary' : '',
                )}>
                {i.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center">
          <Search onClick={() => setIsOpen(true)} className="cursor-pointer" />
          {isOpen && <SearchInput setIsOpen={setIsOpen} />}
          <div className="mx-8 cursor-pointer relative">
            <ShoppingCart />
            <span className="bg-primary absolute h-3 w-3 text-[10px] flex items-center justify-center text-white rounded-full top-0 -right-1 border border-white">
              0
            </span>
          </div>
          <Button className="cursor-pointer">
            <LogOut />
            Login
          </Button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
