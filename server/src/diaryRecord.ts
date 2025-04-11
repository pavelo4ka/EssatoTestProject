export class DiaryRecord {
    id: number;
    description: string | null;
    isGoodDay: boolean;
    date: string;
    temperature: number | null;
  
    constructor(
      id: number,
      description: string | null,
      isGoodDay: boolean,
      date: string,
      temperature: number | null
    ) {
      this.id = id;
      this.description = description;
      this.isGoodDay = isGoodDay;
      this.date = date;
      this.temperature = temperature;
    }
  
    static fromRow(row: any): DiaryRecord {
      return new DiaryRecord(
        row.id,
        row.description,
        row.is_good_day, 
        row.date,
        row.temperature
      );
    }
  }
  