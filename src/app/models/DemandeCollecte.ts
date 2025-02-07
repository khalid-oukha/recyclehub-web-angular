import {RequestStatus} from "./RequestStatus";
import {WasteItem} from "./WasteItem";

export interface CollectionRequest {
  id?: string;
  userId: string;
  wasteItems: WasteItem[];
  photos?: string[];
  address: string;
  preferredDate: string;
  preferredTimeSlot: string;
  additionalNotes?: string;
  status: RequestStatus;
  totalPoints?: number;
}
