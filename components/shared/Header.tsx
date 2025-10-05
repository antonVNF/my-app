'use client';
import React, { useState } from 'react';
import Container from '@/components/shared/Сontainer';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  Input,
} from '@/components/ui';
import { X } from 'lucide-react';
import { Search, LogOut, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';

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
  const [query, setQuery] = useState('');
  const pathname = usePathname();
  return (
    <header className={cn('', className)}>
      <Container className=" border-b border-primary border-opacity-5 flex justify-between items-center px-4">
        <Link href={'/'}>
          <Image height={34} width={150} src="/logo.png" alt="logo" />
        </Link>
        <nav className="flex">
          {siteConfig.map((i) => {
            const isActive = i.href === "/" ? pathname === "/" : pathname === i.href || pathname.startsWith(i.href+"/")
            return (
              <Link
                key={i.href}
                href={i.href}
                className={cn('px-5 py-5', isActive ? 'text-primary' : '')}>
                {i.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Search className="cursor-pointer" />
            </DialogTrigger>

            <DialogContent className="top-45 max-w-md w-full p-6">
              <DialogHeader>
                <DialogTitle>Поиск</DialogTitle>
              </DialogHeader>

              <DialogClose className="absolute top-3 right-3 rounded-full p-1 hover:bg-gray-200">
                <X className="w-4 h-4" />
              </DialogClose>

              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Введите запрос..."
                className="mt-4"
              />
            </DialogContent>
          </Dialog>
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
