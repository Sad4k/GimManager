import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CreditCard, Edit, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

// Simular una llamada a la API para obtener membresías
const fetchMemberships = async () => {
  return [
    { id: 1, name: 'Anual', duration: 365, price: 500 },
    { id: 2, name: 'Mensual', duration: 30, price: 50 },
    { id: 3, name: 'Semanal', duration: 7, price: 15 },
    { id: 4, name: 'Diaria', duration: 1, price: 5 },
  ];
};

const Memberships: React.FC = () => {
  const { data: memberships, isLoading, error } = useQuery({
    queryKey: ['memberships'],
    queryFn: fetchMemberships
  });
  const [token, setToken] = useState('');

  const generateToken = () => {
    const newToken = uuidv4();
    setToken(newToken);
    // Aquí podrías guardar el token en la base de datos o hacer lo que necesites con él
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar las membresías</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Membresías</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duración (días)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {memberships?.map((membership) => (
              <tr key={membership.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <CreditCard className="h-6 w-6 text-gray-400 mr-2" />
                    <div className="text-sm font-medium text-gray-900">{membership.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{membership.duration}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${membership.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Generador de Tokens</h3>
        <button
          onClick={generateToken}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Generar Token
        </button>
        {token && (
          <div className="mt-4">
            <p className="font-semibold">Token generado:</p>
            <p className="bg-gray-100 p-2 rounded mt-2">{token}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Memberships;