import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Package, Edit, Trash2 } from 'lucide-react';

// Simular una llamada a la API para obtener productos
const fetchInventory = async () => {
  return [
    { id: 1, name: 'Proteína en polvo', price: 29.99, stock: 50, category: 'Suplementos' },
    { id: 2, name: 'Barras energéticas', price: 2.50, stock: 100, category: 'Snacks' },
    { id: 3, name: 'Bebida isotónica', price: 1.99, stock: 200, category: 'Bebidas' },
    { id: 4, name: 'Guantes de entrenamiento', price: 15.99, stock: 30, category: 'Equipamiento' },
  ];
};

const Inventory: React.FC = () => {
  const { data: inventory, isLoading, error } = useQuery({
    queryKey: ['inventory'],
    queryFn: fetchInventory
  });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInventory = inventory?.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar el inventario</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Inventario</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-full p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInventory?.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Package className="h-6 w-6 text-gray-400 mr-2" />
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.stock}</div>
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
    </div>
  );
};

export default Inventory;