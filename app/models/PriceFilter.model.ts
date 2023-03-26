export interface SearchFilters {
  id: string;
  name: string;
  type: string;
  values: Array<{
    id: string;
    name: string;
    results: number;
  }>;
}
