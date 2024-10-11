import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, Edit, Trash2 } from 'lucide-react';
import { dbManager } from '../utils/DBManager';
import { errorHandler } from '../utils/ErrorHandler';
import Modal from '../components/Modal';
import { toast } from 'react-toastify';

interface Client {
  id: number;
  name: string;
  email: string;
  membershipType: string;
}

const Clients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const queryClient = useQueryClient();

  const { data: clients, isLoading, error } = useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: () => dbManager.getClients(),
  });

  const addClientMutation = useMutation({
    mutationFn: (newClient: Omit<Client, 'id'>) => dbManager.addClient(newClient.name, newClient.email, newClient.membershipType),
    onSuccess: () => {
      queryClient.invalidateQueries(['clients']);
      toast.success('Client added successfully');
      setIsModalOpen(false);
    },
    onError: (error) => errorHandler.handleAPIError(error as Error),
  });

  const updateClientMutation = useMutation({
    mutationFn: (updatedClient: Client) => dbManager.updateClient(updatedClient.id, updatedClient.name, updatedClient.email, updatedClient.membershipType),
    onSuccess: () => {
      queryClient.invalidateQueries(['clients']);
      toast.success('Client updated successfully');
      setIsModalOpen(false);
      setEditingClient(null);
    },
    onError: (error) => errorHandler.handleAPIError(error as Error),
  });

  const deleteClientMutation = useMutation({
    mutationFn: (id: number) => dbManager.deleteClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['clients']);
      toast.success('Client deleted successfully');
    },
    onError: (error) => errorHandler.handleAPIError(error as Error),
  });

  const filteredClients = clients?.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const clientData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      membershipType: formData.get('membershipType') as string,
    };

    if (editingClient) {
      updateClientMutation.mutate({ ...clientData, id: editingClient.id });
    } else {
      addClientMutation.mutate(clientData);
    }
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los clientes</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Clientes</h2>
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Buscar clientes..."
          className="w-1/2 p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Agregar Cliente
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo de Membresía
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClients?.map((client) => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <User className="h-10 w-10 rounded-full text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{client.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{client.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {client.membershipType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingClient(client);
                      setIsModalOpen(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => deleteClientMutation.mutate(client.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingClient(null);
        }}
        title={editingClient ? 'Editar Cliente' : 'Agregar Cliente'}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={editingClient?.name}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={editingClient?.email}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="membershipType" className="block text-sm font-medium text-gray-700">
              Tipo de Membresía
            </label>
            <select
              id="membershipType"
              name="membershipType"
              defaultValue={editingClient?.membershipType}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="Anual">Anual</option>
              <option value="Mensual">Mensual</option>
              <option value="Semanal">Semanal</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {editingClient ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Clients;