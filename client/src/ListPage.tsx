import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';

export const ListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <button onClick={() => navigate(`/edit/123`, { state: { backgroundLocation: location } })}>
      Update
    </button>
  );
};
