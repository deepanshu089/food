


export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

export interface OrderItem {
    id: string;
    quantity: number;
}

export type OrderStatus = 'Order Received' | 'Preparing' | 'Out for Delivery' | 'Delivered';

export interface Order {
    id: string;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    customer: {
        name: string;
        address: string;
        phone: string;
    };
    createdAt: string;
}

// Mock Data
export const MENU_ITEMS: MenuItem[] = [
    {
        id: '1',
        name: 'Margherita Pizza',
        description: 'Classic tomato and mozzarella cheese.',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1574071318500-d036d562f03c?w=500&q=80',
        category: 'Pizza'
    },
    {
        id: '2',
        name: 'Cheeseburger',
        description: 'Juicy beef patty with cheddar cheese and fresh veggies.',
        price: 10.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80',
        category: 'Burger'
    },
    {
        id: '3',
        name: 'Pepperoni Pizza',
        description: 'Spicy pepperoni with mozzarella.',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80',
        category: 'Pizza'
    },
    {
        id: '4',
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with caesar dressing and croutons.',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&q=80',
        category: 'Salad'
    },
    {
        id: '5',
        name: 'Sushi Platter',
        description: 'Assorted fresh sushi rolls.',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80',
        category: 'Sushi'
    }
];

// In-memory store handling for serverless environments (attempt)
declare global {
    var orders: Order[];
}

if (!globalThis.orders) {
    globalThis.orders = [];
}

export const getOrders = () => globalThis.orders;

export const createOrder = (order: Order) => {
    globalThis.orders.push(order);
    simulateOrderUpdates(order.id);
    return order;
};

export const getOrderById = (id: string) => {
    return globalThis.orders.find(o => o.id === id);
};

// Simulation Logic
function simulateOrderUpdates(orderId: string) {
    // Delays for simulation
    setTimeout(() => updateStatus(orderId, 'Preparing'), 10000); // 10s
    setTimeout(() => updateStatus(orderId, 'Out for Delivery'), 20000); // 20s
    setTimeout(() => updateStatus(orderId, 'Delivered'), 30000); // 30s
}

function updateStatus(id: string, status: OrderStatus) {
    const order = globalThis.orders.find(o => o.id === id);
    if (order) {
        order.status = status;
    }
}
