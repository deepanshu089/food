
'use client';
import { useEffect, useState } from 'react';
import { Order, OrderStatus } from '@/lib/store';
import { Check, Clock, Package, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';

const steps: { status: OrderStatus; label: string; icon: any }[] = [
  { status: 'Order Received', label: 'Order Received', icon: Clock },
  { status: 'Preparing', label: 'Preparing', icon: Package },
  { status: 'Out for Delivery', label: 'Out for Delivery', icon: Truck },
  { status: 'Delivered', label: 'Delivered', icon: Check },
];

export default function OrderPage() {
  const params = useParams();
  const id = params?.id as string;
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${id}`);
        if (res.ok) {
           const data = await res.json();
           setOrder(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrder();
    const interval = setInterval(fetchOrder, 2000); 
    return () => clearInterval(interval);
  }, [id]);

  if (!order) return <div className="p-8 text-center pt-32">Loading order...</div>;

  const currentStepIndex = steps.findIndex(step => step.status === order.status);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Order Status</h1>
        <p className="text-gray-500">Order ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{order.id}</span></p>
      </div>

      <div className="space-y-0 relative pl-4">
        {/* Connecting Line Background */}
        <div className="absolute left-[34px] top-6 bottom-6 w-0.5 bg-gray-100 z-0" />

        {steps.map((step, index) => {
          const isActive = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;
          
          return (
            <div key={step.status} className="flex gap-6 relative z-10 pb-12 last:pb-0">
              <div className="flex flex-col items-center">
                 <motion.div 
                   initial={false}
                   animate={{ 
                       backgroundColor: isActive ? '#ea580c' : '#ffffff',
                       borderColor: isActive ? '#ea580c' : '#e5e7eb',
                       scale: isCurrent ? 1.1 : 1
                   }}
                   className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-sm transition-colors duration-500`}
                >
                    <step.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                 </motion.div>
              </div>
              <div className="pt-2">
                  <h3 className={`text-lg font-bold transition-colors duration-300 ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</h3>
                  {isActive && isCurrent && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-orange-500 text-sm font-medium mt-1"
                      >
                          In Progress...
                      </motion.p>
                  )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
