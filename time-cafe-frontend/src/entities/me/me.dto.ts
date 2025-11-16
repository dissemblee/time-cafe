import { ClientDto } from "../client";

export interface MeResponse {
  id: number;
  login: string;
  email: string;
  client?: ClientDto;
}
