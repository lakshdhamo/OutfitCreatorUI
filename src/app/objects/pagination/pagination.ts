export class Pagination {
  totalCount!: number;
  currentPage!: number;
  constructor(totalCount: number, pageSize: number) {
    this.currentPage = pageSize;
    this.totalCount = totalCount;
  }
}
