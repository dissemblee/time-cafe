import { ClientDto } from "../client";
import { StaffDto } from "../staff";

export interface MeResponse {
  id: number;
  login: string;
  email: string;
  client?: ClientDto;
  staff?: StaffDto;
}
