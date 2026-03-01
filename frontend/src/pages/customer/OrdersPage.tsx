// Inside OrdersPage.tsx
import { useOrders } from "../../context/OrderContext";

export default function OrdersPage() {
  const { orders } = useOrders();

  return (
    <div className="space-y-6">
      <div className="text-2xl font-black">My Orders</div>
      
      {orders.length === 0 ? (
        <div className="p-8 text-center text-slate-400 bg-white/5 rounded-3xl border border-dashed border-white/10">
          No orders found yet.
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-5">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
              <div>
                <div className="text-sm text-slate-400">Order ID: #{order.id}</div>
                <div className="font-bold">{order.date}</div>
              </div>
              <div className="text-xl font-black text-blue-500">${order.total.toFixed(2)}</div>
            </div>
            <div className="flex gap-2">
              {order.items.map((item) => (
                <img 
                  key={item.id} 
                  src={item.image} 
                  className="h-12 w-12 rounded-lg object-cover ring-1 ring-white/10" 
                  alt={item.name} 
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}