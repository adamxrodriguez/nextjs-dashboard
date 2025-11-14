'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';
import React from 'react';

// Map of options to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.

export default function Filters() {
  
  const [selectedFilter, setSelectedFilter] = React.useState<string>('All');
  
  
  const options = [
    { name: 'All', onclick: 'All', href: '/dashboard/documents', icon: HomeIcon },
    {
      name: 'Forms',
      href: '/dashboard/documents',
      onclick: 'Forms',
      icon: DocumentDuplicateIcon,
    },
    {
      name: 'Crew',
      href: '/dashboard/documents',
      onclick: 'Crew',
      icon: DocumentDuplicateIcon,
    },
    { name: 'Equipment', onclick: 'Equipment',href: '/dashboard/documents', icon: UserGroupIcon },
    { name: 'NCRs', onclick: 'NCRs',href: '/dashboard/documents', icon: BanknotesIcon },
    { name: 'Documents', onclick: 'Documents',href: '/dashboard/documents', icon: BanknotesIcon },
    { name: 'Certificates', onclick: 'Certificates',href: '/dashboard/documents', icon: BanknotesIcon },
  ];

  return (
    <>
    
    {options.map((option) => {
        const LinkIcon = option.icon;
        return (
          <Link
            key={option?.name}
            onClick={() => setSelectedFilter(option?.onclick)}
            href={option?.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-blue-300 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3',
              selectedFilter === option?.onclick ? 'bg-blue-300 text-black' : 'bg-gray-50 text-black',
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{option.name}</p>
          </Link>
        );
      })}

{console.log('selectedFilter',selectedFilter)}

    </>
  );
}
