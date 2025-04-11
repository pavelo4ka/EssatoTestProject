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
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const find = async () => {
        setLoading(true);
        const response = await fetchData(setError,filter,page);
        if (response){
            console.log(response.data);
            if(response.data.length!==0){
                setData(response.data);
            }else if(page>1){
                setPage(page - 1);
            }
        } 
        
        setLoading(false);
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
    const handlePrevious = () => {
        if (page > 1) setPage(prevPage => prevPage - 1);
    };

    const handleNext = () => {
        setPage(prevPage => prevPage + 1);
    };
    useEffect(() => {
        if (location.state?.filters) {
          setFilter(location.state.filters);
        }
      }, [location.state]);
    
    useEffect(() => {
        if (!loading) {
            find();  // Делаем запрос каждый раз, когда страница изменяется
        }
    }, [page]); 
    return (
        <div>
            <NavBar onCreateClick={handleCreateClick} onFilterClick={handleFilterClick} />
            <div style={{ padding: '20px', textAlign: 'center' }}>
                
                    <div>
                        <h1>Items List</h1>
                        <ItemTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
                    </div>
                    <div>
                        <button onClick={handlePrevious} disabled={page === 1}>
                            Previous
                        </button>
                        <span> Page {page} </span>
                        <button onClick={handleNext}>
                            Next
                        </button>
                    </div>
            </div>
        </div>
    );
};
