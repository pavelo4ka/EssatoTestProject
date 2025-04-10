// App.tsx
import { Routes, Route, useLocation } from 'react-router-dom';
import {ListPage} from './ListPage.js';
import {EditModal} from './EditModal.js';
import {CreateModal} from './CreateModal.js';
import {FilterModal} from './FilterModal.js';
import {DeleteModal} from './DeleteModal.js';

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
        <Route path="/delete" element={<DeleteModal />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/edit/:id" element={<EditModal />} />
          <Route path="/create" element={<CreateModal />} />
        </Routes>
      )}
    </>
  );
};

export default App;
