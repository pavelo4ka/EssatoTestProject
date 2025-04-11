import { Router, Request, Response } from 'express';
import { DiaryRecord } from './diaryRecord.js';
import query from './db.js';
import * as dbReq from './dbRequests.js';
import getAverageTemperature from './weatherAPI.js';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { sortBy, order, ...filters } = req.query;

    let queryText = dbReq.getDiaryRecord;
    const whereConditions: string[] = [];
    const params: any[] = [];

    Object.entries(filters).forEach(([key, value], index) => {
      if (key === 'description') {
        whereConditions.push(`${key} ILIKE $${index + 1}`);
        params.push(`%${value}%`);
      }else{
        whereConditions.push(`${key} = $${index + 1}`);
        params.push(value);
    }});

    if (whereConditions.length > 0) {
      queryText += ' WHERE ' + whereConditions.join(' AND ');
    }

    if (sortBy) {
      queryText += ` ORDER BY ${sortBy} ${order === 'desc' ? 'DESC' : 'ASC'}`;
    }

    const result = await query(queryText, params);
    const records = result.rows.map(DiaryRecord.fromRow);
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch records' });
  }
});


router.post('/', async (req: Request, res: Response) => {
  const { description, isGoodDay, date,city} = req.body;

  try {
    const temperature: number|string = await getAverageTemperature(city, date.toISOString().split('T')[0]);
    await query(dbReq.postDiaryRecord,[description, isGoodDay, date, temperature]);
    res.status(201).json({ message: 'Record created' });
  } catch (err) {
    console.error('Failed to create record',err)
    res.status(500).json({ error: 'Failed to create record' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, isGoodDay} = req.body;
  try {
    await query(dbReq.putDiaryRecord,
      [description, isGoodDay, id]
    );
    res.json({ message: 'Record updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update record' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await query(dbReq.deleteDiaryRecord, [id]);
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete record' });
  }
});

export default router;
