
import { NextResponse } from 'next/server';
import { createOrder, Order } from '@/lib/store';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items, customer, total } = body;

        if (!items || !customer || !total) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newOrder: Order = {
            id: Math.random().toString(36).substring(7),
            items,
            total,
            status: 'Order Received',
            customer,
            createdAt: new Date().toISOString()
        };

        createOrder(newOrder);

        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
