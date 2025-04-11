import { useNavigate,useLocation } from 'react-router-dom';
import React, { useState } from 'react';

export const FilterModal = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [filters, setFilters] = useState({
    minTemperature: '',
    maxTemperature: '',
    minDate: '',
    maxDate: '',
    is_good_day: '',
    description: '',
    sortBy: '',
    order: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value.toString() });
  };

  const handleApply = () => {
    const searchParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '') {
        searchParams.set(key, String(value));
      }
    });
    navigate('/', {
    state: {
      filters: `&${searchParams.toString()}`,
    }
  });
  };

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
        style={{ background: 'white', padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}
        onClick={e => e.stopPropagation()} 
      >
        <h2>Filter Records</h2>

        <input name="minTemperature" placeholder="Min Temperature" onChange={handleChange} />
        <input name="maxTemperature" placeholder="Max Temperature" onChange={handleChange} />
        <input name="minDate" placeholder="Min Date" type="date" onChange={handleChange} />
        <input name="maxDate" placeholder="Max Date" type="date" onChange={handleChange} />
        <select name="is_good_day" onChange={handleChange}>
          <option value="">Is Good Day?</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
        <input name="description" placeholder="Description" onChange={handleChange} />

        
        <select name="sortBy" onChange={handleChange}>
          <option value="">Sort by</option>
          <option value="is_good_day">IsGoodDay</option>
          <option value="temperature">Temperature</option>
          <option value="date">Date</option>
          <option value="description">Description</option>
        </select>
        <select name="order" onChange={handleChange}>
          <option value="">Order</option>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={handleApply}>Apply Filters</button>
          <button onClick={() => navigate(-1)}>Close</button>
        </div>
      </div>
    </div>
  );
};
