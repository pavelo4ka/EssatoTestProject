// ListPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchData } from '../axios-api';
import NavBar from './NavigationBar';
import ItemTable from './ItemTable';

export const ListPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [view, setView] = useState('find');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);


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

    const handleDelete = (item) => {
        if(item) navigate(`delete/${item.id}`, { state: { backgroundLocation: location } });
    };

    const handleEdit = (item) => {
        if (item) navigate(`edit/${item.id}`, { state: { backgroundLocation: location, item:item } });
    };

    return (
        <div>
            <NavBar onFindClick={handleFindClick} onCreateClick={handleCreateClick} onFilterClick={handleFilterClick} />
            <div style={{ padding: '20px', textAlign: 'center' }}>
                {view === 'find' && (
                    <div>
                        <h1>Items List</h1>
                        <ItemTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
                    </div>
                )}
                {view === 'filter' && <h1>You clicked "Filter"</h1>}
            </div>
        </div>
    );
};
