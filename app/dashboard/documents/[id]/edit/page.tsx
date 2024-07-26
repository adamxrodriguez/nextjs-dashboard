import React from 'react';
import Form from '../../../../ui/documents/edit-form';
import Breadcrumbs from '../../../../ui/documents/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '../../../../lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Document',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'documents', href: '/dashboard/documents' },
          {
            label: 'Edit documents',
            href: `/dashboard/documents/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
