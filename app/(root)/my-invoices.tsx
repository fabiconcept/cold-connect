import React from 'react';
import Header from '@/components/My Invoices/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import InvoicesList from '@/components/My Invoices/InvoicesList';

export default function MyInvoices() {
    return (
        <SafeAreaView className='flex-1 gap-2'>
            <Header />
            <InvoicesList />
        </SafeAreaView>
    )
}