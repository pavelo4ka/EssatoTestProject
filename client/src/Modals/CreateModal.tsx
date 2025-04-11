import { useNavigate, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { postData } from '../axios-api';


export const CreateModal = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState<string>("");
  const [isGoodDay, setGood] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");
  const isSaveDisabled = city === '';
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onClick={() => navigate(-1)}
    >
      <div
        style={{ background: 'white', padding: 20 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="max-w-md mx-auto mt-10 p-4 border rounded-2xl shadow-xl bg-white">
          <h2 className="text-xl font-bold mb-4">How was your day?</h2>

          <textarea
            className="w-full p-2 border rounded-xl mb-4 resize-none"
            rows="4"
            placeholder="Write about your day..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="flex items-center gap-2 mb-4 cursor-pointer">
            <span>Select your city:</span>
            <select
              className="ml-2 p-2 border border-gray-300 rounded"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Select city</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
              <option value="Miami">Miami</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Stockholm">Stockholm</option>
              <option value="Cracow">Cracow</option>
            </select>
          </label>
          <label className="flex items-center gap-2 mb-4 cursor-pointer">
            <input
              type="checkbox"
              checked={isGoodDay}
              onChange={(e) => setGood(e.target.checked)}
            />
            I liked this day
          </label>



          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
            onClick={() => {
              console.log("Description:", description);
              console.log("Liked:", isGoodDay);
              postData({ description, isGoodDay, date:(new Date()).toISOString().slice(0,10), city })
              navigate(-1);
            }}
            disabled={isSaveDisabled}
            >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};