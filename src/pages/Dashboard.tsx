import React from 'react';
import { Users, Package, CreditCard, Activity } from 'lucide-react';

const DashboardCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({
  title,
  value,
  icon,
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
    <div className="mr-4 text-blue-500">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Clientes Activos" value="250" icon={<Users size={32} />} />
        <DashboardCard title="Productos en Stock" value="1,500" icon={<Package size={32} />} />
        <DashboardCard title="Membresías Activas" value="180" icon={<CreditCard size={32} />} />
        <DashboardCard title="Visitas Hoy" value="75" icon={<Activity size={32} />} />
      </div>
      {/* Aquí puedes agregar más secciones como gráficos, tablas de actividad reciente, etc. */}
    </div>
  );
};

export default Dashboard;