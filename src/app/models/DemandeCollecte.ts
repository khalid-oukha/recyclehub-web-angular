export interface CollectionRequest {
  id?: number;
  wasteTypes: string[];
  photos?: string[];
  estimateWeight: number;
  address: string;
  date: Date;
  timeSlot: string;
  notes?: string;
  status: string;
  individualId: number;
}
