export class DairyRecord {
    id: number;
    description: string | null;
    isGoodDay: boolean;
    date: Date;
    temperature: number | null;
  
    constructor(
      id: number,
      description: string | null,
      isGoodDay: boolean,
      date: Date,
      temperature: number | null
    ) {
      this.id = id;
      this.description = description;
      this.isGoodDay = isGoodDay;
      this.date = date;
      this.temperature = temperature;
    }
  
    static fromRow(row: any): DairyRecord {
      return new DairyRecord(
        row.id,
        row.description,
        row.is_good_day, // так как в базе snake_case
        new Date(row.date),
        row.temperature
      );
    }
  }
  