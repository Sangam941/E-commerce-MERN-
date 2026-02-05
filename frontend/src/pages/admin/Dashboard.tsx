import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

type DashboardStats = {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  totalStocks: number;
};

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await api.get('/admin/dashboard-stats');
        setStats(response.data.data);
        setError(null);
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p className="text-xl font-semibold">Loading admin dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p className="text-red-400 font-semibold">{error}</p>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const cards = [
    { label: 'Total Revenue', value: `₹${(stats.totalRevenue / 100).toFixed(2)}`, accent: 'from-emerald-400 to-teal-500' },
    { label: 'Total Orders', value: stats.totalOrders, accent: 'from-sky-400 to-blue-500' },
    { label: 'Total Users', value: stats.totalUsers, accent: 'from-violet-400 to-purple-500' },
    { label: 'Total Products', value: stats.totalProducts, accent: 'from-amber-400 to-orange-500' },
    { label: 'Total Stocks', value: stats.totalStocks, accent: 'from-pink-400 to-rose-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-slate-400">Overview of your store performance</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            ADMIN
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.label}
              className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg shadow-slate-950/40"
            >
              <div className="absolute inset-x-0 -top-24 h-40 bg-gradient-to-br opacity-40 blur-2xl pointer-events-none" />
              <div className="absolute inset-x-0 -top-24 h-40 bg-gradient-to-br from-slate-900 to-slate-950 opacity-70 pointer-events-none" />

              <div className="relative p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">{card.label}</p>
                <p className="text-3xl font-semibold tracking-tight mb-4">{card.value}</p>
                <div className={`inline-flex items-center px-2.5 py-1 rounded-full bg-gradient-to-r ${card.accent} text-xs font-medium text-slate-950`}>
                  Live metric
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;


