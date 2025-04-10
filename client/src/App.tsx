// App.tsx
import { Routes, Route, useLocation } from 'react-router-dom';
import {ListPage} from './ListPage.js';
import {EditModal} from './EditModal.js';
import React from 'react';

const App = () => {
  const location = useLocation();

  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<ListPage />} />
        <Route path="/edit/:id" element={<EditModal />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/edit/:id" element={<EditModal />} />
        </Routes>
      )}
    </>
  );
};

export default App;
