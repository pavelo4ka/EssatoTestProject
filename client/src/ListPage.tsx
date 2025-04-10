import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState }  from 'react';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_SERVER_URL;

const client = axios.create({
  baseURL: process.env.VITE_SERVER_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});
export const ListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [view, setView] = useState('find'); 
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const handleFindClick = async () => {
    setView('find');
    try {
      const response = await client.get('/diaryRecords');
      setData(response.data);
    } catch (err) {
      setError('Error loading data');
      console.error('Request error:', err); 
    }
  };

  const handleCreateClick = () => {
    navigate("/create", { state: { backgroundLocation: location } });
  };

  const handleFilterClick = () => {
    setView('filter');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', background: '#f1f1f1' }}>
        <button onClick={handleFindClick}>Find</button>
        <button onClick={handleCreateClick}>Create</button>
        <button onClick={handleFilterClick}>Filter</button>
      </div>

      
      <div style={{ padding: '20px', textAlign: 'center' }}>
        {view === 'find' && (
          <div>
            <h1>Items List</h1>
            <table border="1" style={{ margin: '0 auto', width: '80%' }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Temperature</th>
                  <th>Description</th>
                  <th>Is a good day?</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.temperature}</td>
                    <td>{item.description}</td>
                    <td>{item.isGoodDay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === 'create' && <h1>You clicked "Create"</h1>}
        {view === 'filter' && <h1>You clicked "Filter"</h1>}
      </div>
    </div>
  );
};
