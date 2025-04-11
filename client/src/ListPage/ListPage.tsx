// ListPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchData } from '../axios-api';
import NavBar from './NavigationBar';
import ItemTable from './ItemTable';

export const ListPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [data, setData] = useState([]); // State to store the list of items fetched from the API
    const [filter, setFilter] = useState(''); // State to store the filter applied to the data
    const [page, setPage] = useState(1); // State for the current page (pagination)
    const [loading, setLoading] = useState(false); // State to track if data is currently being loaded

    // Function to fetch data with applied filter and page number
    const find = async () => {
        setLoading(true);
        const response = await fetchData(filter,page);
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
    // Function to handle the 'Create' button click, navigating to the create page
    const handleCreateClick = () => {
        navigate('/create', { state: { backgroundLocation: location } });
    };

    // Function to handle the 'Filter' button click, navigating to the filter page
    const handleFilterClick = () => {
        navigate('/filter', { state: { backgroundLocation: location , filters:filter} });
    };

    // Function to handle the delete action on an item
    const handleDelete = (item) => {
        if(item) navigate(`delete/${item.id}`, { state: { backgroundLocation: location } });
    };

    // Function to handle the edit action on an item
    const handleEdit = (item) => {
        if (item) navigate(`edit/${item.id}`, { state: { backgroundLocation: location, item:item } });
    };
    
    // Function to handle going to the previous page (pagination)
    const handlePrevious = () => {
        if (page > 1) setPage(prevPage => prevPage - 1);
    };

    // Function to handle going to the next page (pagination)
    const handleNext = () => {
        setPage(prevPage => prevPage + 1);
    };

    // useEffect to set the filter state when location state has a filter
    useEffect(() => {
        if (location.state?.filters) {
        setFilter(location.state.filters);
        }
      }, [location]);
    

    // useEffect to fetch data when the filter changes
    useEffect(()=>{
        find(); 
    },[filter]);
    
    // useEffect to fetch data when the page number changes
    useEffect(() => {
        if (!loading) {
            find(); 
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
