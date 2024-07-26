import React from 'react';
import Pagination from '../../ui/documents/pagination';
import Search from '../../ui/search';
import Table from '../../ui/documents/table';
import { CreateInvoice } from '../../ui/documents/buttons';
import { lusitana } from '../../ui/fonts';
import { InvoicesTableSkeleton } from '../../ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '../../lib/data';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Documents',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Documents</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Documents..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
