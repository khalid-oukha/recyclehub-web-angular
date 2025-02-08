import {WasteItem} from "./WasteItem";
import {RequestStatus} from "./RequestStatus";

export interface CollectionRequest {
  id?: string;
  userId: string;
  wasteItems: WasteItem[];
  photos?: string[];
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
  preferredDate: string;
  preferredTimeSlot: string;
  additionalNotes?: string;
  status: RequestStatus;
  totalPoints?: number;
}
