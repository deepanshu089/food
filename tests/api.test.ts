
import { describe, it, expect } from 'vitest';
import { GET as getMenu } from '@/app/api/menu/route';
import { POST as createOrder } from '@/app/api/orders/route';
import { GET as getOrder } from '@/app/api/orders/[id]/route';

describe('API Routes', () => {
    let createdOrderId: string;

    it('GET /api/menu returns menu items', async () => {
        const response = await getMenu();
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);
    });

    it('POST /api/orders creates an order', async () => {
        const body = {
            items: [{ id: '1', quantity: 2 }],
            total: 25.98,
            customer: {
                name: 'John Doe',
                address: '123 Main St',
                phone: '555-0123'
            }
        };

        const req = new Request('http://localhost/api/orders', {
            method: 'POST',
            body: JSON.stringify(body)
        });

        const response = await createOrder(req);
        const data = await response.json();

        expect(response.status).toBe(201);
        expect(data.id).toBeDefined();
        expect(data.status).toBe('Order Received');

        createdOrderId = data.id;
    });

    it('GET /api/orders/[id] returns order status', async () => {
        const params = Promise.resolve({ id: createdOrderId });
        const req = new Request(`http://localhost/api/orders/${createdOrderId}`);

        const response = await getOrder(req, { params });
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.id).toBe(createdOrderId);
        expect(data.status).toBe('Order Received');
    });
});
