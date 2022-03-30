export class Query {
  limit!: number;
  offset!: number;
  country!: string;
  gender!: string;
  category!: string;

  constructor() {
    this.country = "DE";
    this.offset = 0;
    this.limit = 25;
    this.gender = "MALE";
    this.category = "";
  }
}
