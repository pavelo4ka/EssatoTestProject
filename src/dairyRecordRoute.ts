import { Router, Request, Response } from 'express';
import { DairyRecord } from './dairyRecord';
import query from './db';

const router = Router();

router.get('/dairy', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM dairy_records');
    const records = result.rows.map(DairyRecord.fromRow);
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch records' });
  }
});

router.post('/dairy', async (req: Request, res: Response) => {
  const { description, isGoodDay, date, temperature } = req.body;
  try {
    await query(
      `INSERT INTO dairy_records (description, is_good_day, date, temperature) 
       VALUES ($1, $2, $3, $4)`,
      [description, isGoodDay, date, temperature]
    );
    res.status(201).json({ message: 'Record created' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create record' });
  }
});

router.put('/dairy/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, isGoodDay, date, temperature } = req.body;
  try {
    await query(
      `UPDATE dairy_records 
       SET description = $1, is_good_day = $2, date = $3, temperature = $4 
       WHERE id = $5`,
      [description, isGoodDay, date, temperature, id]
    );
    res.json({ message: 'Record updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update record' });
  }
});

router.delete('/dairy/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await query('DELETE FROM dairy_records WHERE id = $1', [id]);
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete record' });
  }
});

export default router;
