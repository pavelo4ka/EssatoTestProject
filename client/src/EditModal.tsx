// EditModal.tsx
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';

export const EditModal = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onClick={() => navigate(-1)} 
    >
      <div
        style={{ background: 'white', padding: 20 }}
        onClick={e => e.stopPropagation()} 
      >
        <h2>Updating Element {id}</h2>
        <button onClick={() => navigate(-1)}>Close</button>
      </div>
    </div>
  );
};
