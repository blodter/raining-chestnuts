export interface QueryResults<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export class QueryResults<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];

  constructor(data: QueryResults<T>) {
    this.count = data.count;
    this.next = data.next;
    this.previous = data.previous;
    this.results = data.results;
  }
}
