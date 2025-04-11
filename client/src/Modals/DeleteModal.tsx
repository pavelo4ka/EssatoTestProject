import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import { deleteData } from '../axios-api';

export const DeleteModal = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async () => {
    if(id) await deleteData(id);
    navigate(-1);       
  };
  
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={() => navigate(-1)} 
    >
      <div
        style={{ background: 'white', padding: 20 }}
        onClick={(e) => e.stopPropagation()} 
      >
        <h2>Are you sure you want to delete element {id}?</h2>

        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <button onClick={handleDelete} style={{ background: 'red', color: 'white' }}>
            Delete
          </button>
          <button onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
  
};
