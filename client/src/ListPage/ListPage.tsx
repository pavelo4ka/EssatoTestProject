// ListPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchData } from '../axios-api';
import NavBar from './NavigationBar';
import ItemTable from './ItemTable';
import Modal from './DelEditModal';

export const ListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [view, setView] = useState('find');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleFindClick = async () => {
    setView('find');
    const response = await fetchData(setError);
    if (response) setData(response.data);
  };

  const handleCreateClick = () => {
    navigate('/create', { state: { backgroundLocation: location } });
  };

  const handleFilterClick = () => {
    setView('filter');
  };

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleDelete = () => {
    if (selectedItem) {
      console.log('Deleting item:', selectedItem);
    }
    handleCloseModal();
  };

  const handleEdit = () => {
    if (selectedItem) {
      console.log('Editing item:', selectedItem);
    }
    handleCloseModal();
  };

  return (
    <div>
      <NavBar onFindClick={handleFindClick} onCreateClick={handleCreateClick} onFilterClick={handleFilterClick} />
      <div style={{ padding: '20px', textAlign: 'center' }}>
        {view === 'find' && (
          <div>
            <h1>Items List</h1>
            <ItemTable data={data} onRowClick={handleRowClick} />
          </div>
        )}
        {view === 'filter' && <h1>You clicked "Filter"</h1>}
      </div>
      <Modal item={selectedItem} onClose={handleCloseModal} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};
