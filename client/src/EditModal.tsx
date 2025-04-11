import { useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { putData } from './axios-api';

export const EditModal = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  
  const item = location.state; // { isGoodDay, description }

  const [formData, setFormData] = useState({
    isGoodDay: item?.isGoodDay || false,
    description: item?.description || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async () => {
    if (id) await putData(id, formData);
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
        <h2>Editing Element {id}</h2>

        <label>
          Is Good Day:
          <input
            type="checkbox"
            name="isGoodDay"
            checked={formData.isGoodDay}
            onChange={handleChange}
          />
        </label>

        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <button onClick={handleSubmit}>Save</button>
        <button onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  );
};
