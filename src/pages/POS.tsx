import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

// Simular una llamada a la API para obtener productos
const fetchProducts = async () => {
  return [
    { id: 1, name: 'Proteína en polvo', price: 29.99, stock: 50 },
    { id: 2, name: 'Barras energéticas', price: 2.50, stock: 100 },
    { id: 3, name: 'Bebida isotónica', price: 1.99, stock: 200 },
    { id: 4, name: 'Guantes de entrenamiento', price: 15.99, stock: 30 },
  ];
};

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
}

const POS: React.FC = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los productos</div>;

  return (
    <div className="flex h-full">
      <div className="w-2/3 pr-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Punto de Venta</h2>
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts?.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/3 bg-gray-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <ShoppingCart className="mr-2" /> Carrito
        </h3>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-4">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Minus size={18} />
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Plus size={18} />
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        <div className="mt-6 pt-4 border-t border-gray-300">
          <p className="text-xl font-semibold">Total: ${totalAmount.toFixed(2)}</p>
          <button
            className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={() => {
              // Aquí iría la lógica para procesar el pago
              alert('Pago procesado. Total: $' + totalAmount.toFixed(2));
              setCart([]);
            }}
          >
            Procesar Pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default POS;