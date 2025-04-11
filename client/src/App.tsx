// App.tsx
import { Routes, Route, useLocation } from 'react-router-dom';
import {ListPage} from './ListPage/ListPage.js';
import {EditModal} from './Modals/EditModal.js';
import {CreateModal} from './Modals/CreateModal.js';
import {FilterModal} from './Modals/FilterModal.js';
import {DeleteModal} from './Modals/DeleteModal.js';

import React from 'react';

const App = () => {
  const location = useLocation();

  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<ListPage />} />
        <Route path="/edit/:id" element={<EditModal />} />
        <Route path="/create" element={<CreateModal />} />
        <Route path="/filter" element={<FilterModal />} />
        <Route path="/delete/:id" element={<DeleteModal />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/edit/:id" element={<EditModal />} />
          <Route path="/create" element={<CreateModal />} />
          <Route path="/filter" element={<FilterModal />} />
          <Route path="/delete/:id" element={<DeleteModal />} />

        </Routes>
      )}
    </>
  );
};

export default App;
