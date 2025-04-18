import axios, { AxiosResponse } from 'axios';
/// <reference path="vite-env.d.ts" />
// @ts-ignore
const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

const client = axios.create({
    baseURL: serverUrl, 
    headers: {
      'Content-Type': 'application/json',
    },
});

export const fetchData = async (filter:string,page:number):Promise<AxiosResponse<any, any> | void> => {
  try {
        return await client.get(`/diaryRecords?page=${page}${filter}`);
      } catch (err) {
        alert(`$Failed to get records`);
        console.error('Request error:', err); 
      }
};

export const postData = async (
  { description, isGoodDay, date, city }: { description: string, isGoodDay: boolean, date: string, city: string }
) => {
  try {
    const response = await client.post('/diaryRecords', {
      description,
      isGoodDay,
      date,
      city
    });
    return response.data;
  } catch (err) {
    alert(`$Failed to create record`);
    console.error('Request error:', err); 
  }
};
export const putData = async (id: string,  
  { description, isGoodDay }: { description: string, isGoodDay: boolean }
): Promise<AxiosResponse<any, any> | void> => {
  try {
    const response = await client.put(`/diaryRecords/${id}`, {
      description,
      isGoodDay,
    });
    return response.data; 
  } catch (err) {
    alert(`$Failed to edit record`);
    console.error('Request error:', err); 
  }
};
export const deleteData = async (id: string 
): Promise<AxiosResponse<any, any> | void> => {
  try {
    
    const response = await client.delete(`/diaryRecords/${id}`);
    
    return response.data;  
  } catch (err) {
    alert(`$Failed to delete record`);
    console.error('Request error:', err); 
  }
};