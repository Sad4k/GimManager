import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Ene', ventas: 4000, visitas: 2400 },
  { name: 'Feb', ventas: 3000, visitas: 1398 },
  { name: 'Mar', ventas: 2000, visitas: 9800 },
  { name: 'Abr', ventas: 2780, visitas: 3908 },
  { name: 'May', ventas: 1890, visitas: 4800 },
  { name: 'Jun', ventas: 2390, visitas: 3800 },
];

const Reports: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Reportes</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Ventas y Visitas Mensuales</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ventas" fill="#8884d8" />
            <Bar dataKey="visitas" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Aquí puedes agregar más secciones de reportes según sea necesario */}
    </div>
  );
};

export default Reports;