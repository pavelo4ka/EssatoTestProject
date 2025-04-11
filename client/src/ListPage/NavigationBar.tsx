// components/NavBar.tsx
import React from 'react';

interface NavBarProps {
  onCreateClick: () => void;
  onFilterClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onCreateClick, onFilterClick }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', background: '#f1f1f1' }}>
      
      <button onClick={onCreateClick}>Create</button>
      <button onClick={onFilterClick}>Filter</button>
    </div>
  );
};

export default NavBar;
