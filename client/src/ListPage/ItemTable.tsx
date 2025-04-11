// components/ItemTable.tsx
import React from 'react';

// Interface defining the structure of an Item object
interface Item {
  id: string;
  date: string;
  temperature: string;
  description: string;
  isGoodDay: boolean;
}

// Map to convert boolean values to 'YES'/'NO' for the "Is a good day?" column
const TrueToYES = new Map<boolean, string>([
  [true, "YES"],
  [false, "NO"]
]);

// Props expected by the ItemTable component
interface ItemTableProps {
  data: Item[];
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

// The ItemTable component renders a table with the provided item data and allows editing and deleting
const ItemTable: React.FC<ItemTableProps> = ({ data, onEdit, onDelete }) => {
  return (
    <table border="1" style={{ margin: '0 auto', width: '80%' }}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Temperature</th>
          <th>Description</th>
          <th>Is a good day?</th>
          <th>Actions</th> {}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.date.slice(0, 10)}</td>
            <td>{item.temperature}</td>
            <td>{item.description}</td>
            <td>{TrueToYES.get(item.isGoodDay)}</td>
            <td>
              <button onClick={() => onEdit(item)} style={{ marginRight: '10px' }}>
                Edit
              </button>
              <button onClick={() => onDelete(item)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ItemTable;
