// ListPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchData } from '../axios-api';
import NavBar from './NavigationBar';
import ItemTable from './ItemTable';

export const ListPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [filter,setFilter] = useState('');

    const handleFindClick = async () => {
        const response = await fetchData(setError,filter);
        if (response) setData(response.data);
    };

    const handleCreateClick = () => {
        navigate('/create', { state: { backgroundLocation: location } });
    };

    const handleFilterClick = () => {
        navigate('/filter', { state: { backgroundLocation: location , filters:filter} });
    };

    const handleDelete = (item) => {
        if(item) navigate(`delete/${item.id}`, { state: { backgroundLocation: location } });
    };

    const handleEdit = (item) => {
        if (item) navigate(`edit/${item.id}`, { state: { backgroundLocation: location, item:item } });
    };
    useEffect(() => {
        if (location.state?.filters) {
          setFilter(location.state.filters);
        }
      }, [location.state]);
    return (
        <div>
            <NavBar onFindClick={handleFindClick} onCreateClick={handleCreateClick} onFilterClick={handleFilterClick} />
            <div style={{ padding: '20px', textAlign: 'center' }}>
                
                    <div>
                        <h1>Items List</h1>
                        <ItemTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
                    </div>
                
            </div>
        </div>
    );
};
