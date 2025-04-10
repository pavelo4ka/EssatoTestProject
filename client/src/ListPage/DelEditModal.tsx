// components/Modal.tsx
import React, { useRef, useEffect } from 'react';

interface Item {
  id: string;
  date: string;
  temperature: string;
  description: string;
  isGoodDay: boolean;
}

interface ModalProps {
  item: Item | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const Modal: React.FC<ModalProps> = ({ item, onClose, onEdit, onDelete }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          border: '1px solid #ccc',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h4>What do you want to do with this item?</h4>
        <p>Date: {item.date}</p>
        <p>Temperature: {item.temperature}</p>
        <p>Description: {item.description}</p>
        <button onClick={onEdit} style={{ marginRight: '10px' }}>
          Edit
        </button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Modal;
