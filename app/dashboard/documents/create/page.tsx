import React from 'react';
import { fetchCustomers } from '../../../lib/data';
import Form from '../../../ui/documents/create-form';
import Breadcrumbs from '../../../ui/documents/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Documents',
};

export default async function Page() {
  const customers = await fetchCustomers();


  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Documents', href: '/documents/invoices' },
          {
            label: 'Create documents',
            href: '/dashboard/documents/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
