// components/ItemTable.tsx
import React from 'react';

interface Item {
  id: string;
  date: string;
  temperature: string;
  description: string;
  isGoodDay: boolean;
}

interface ItemTableProps {
  data: Item[];
  onRowClick: (item: Item) => void;
}

const ItemTable: React.FC<ItemTableProps> = ({ data, onRowClick }) => {
  return (
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
          <tr key={item.id} onClick={() => onRowClick(item)}>
            <td>{item.date}</td>
            <td>{item.temperature}</td>
            <td>{item.description}</td>
            <td>{item.isGoodDay.toString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ItemTable;
