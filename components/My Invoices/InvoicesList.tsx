import { FlatList } from 'react-native';
import InvoiceCard from './InvoiceCard';
import { InvoiceCardProps } from '@/types/types';

export default function InvoicesList() {
    const dummyInvoices: InvoiceCardProps[] = [
        {
            id: 'INV001',
            date: new Date(),
            amount: "1000",
            status: 'Paid'
        },
        {
            id: 'INV002',
            date: new Date('2022-01-01'),
            amount: "2000",
            status: 'Failed'
        },
        {
            id: 'INV003',
            date: new Date('2022-01-15'),
            amount: "3000",
            status: 'Paid'
        },
        {
            id: 'INV004',
            date: new Date('2022-02-01'),
            amount: "4000",
            status: 'Pending'
        },
        {
            id: 'INV005',
            date: new Date('2022-02-15'),
            amount: "5000",
            status: 'Cancelled'
        },
        {
            id: 'INV006',
            date: new Date('2022-03-01'),
            amount: "6000",
            status: 'Pending'
        },
        {
            id: 'INV007',
            date: new Date('2022-03-15'),
            amount: "7000",
            status: 'Paid'
        },
        {
            id: 'INV008',
            date: new Date('2022-04-01'),
            amount: "8000",
            status: 'Cancelled'
        },
        {
            id: 'INV009',
            date: new Date('2022-04-15'),
            amount: "9000",
            status: 'Failed'
        },
        {
            id: 'INV010',
            date: new Date('2022-05-01'),
            amount: "10000",
            status: 'Pending'
        }
    ];

    return (
        <FlatList
            data={dummyInvoices}
            renderItem={({ item }) => (
                <InvoiceCard {...item} />
            )}
            contentContainerClassName='gap-2 px-3 pb-5'
            keyExtractor={(item) => item.id}
        />
    )
}