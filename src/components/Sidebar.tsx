import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Package, FileText, CreditCard, ShoppingCart } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/clients', icon: Users, label: 'Clientes' },
    { to: '/inventory', icon: Package, label: 'Inventario' },
    { to: '/reports', icon: FileText, label: 'Reportes' },
    { to: '/memberships', icon: CreditCard, label: 'Membresías' },
    { to: '/pos', icon: ShoppingCart, label: 'POS' },
  ];

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.to} className="mb-2">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700'
                  }`
                }
              >
                <item.icon className="mr-3 h-6 w-6" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;