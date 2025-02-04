import {RequestStatus} from "./RequestStatus";
import {WasteType} from "./WasteType";

export interface CollectionRequest {
  id: string;
  userId: string;
  wasteTypes: WasteType[];
  photos?: string[];
  estimatedWeight: number;
  address: string;
  preferredDate: string;
  preferredTimeSlot: string;
  additionalNotes?: string;
  status: RequestStatus;
}
