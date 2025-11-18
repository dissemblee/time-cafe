export interface RegistrationLinkDto {
  id: number;
  token: string;
  role_hash: string;
  expires_at: string;
  is_used: boolean;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface CreateRegistrationLinkDto {
  role: 'admin' | 'client';
  expires_at?: string;
}

export interface UpdateRegistrationLinkDto {
  is_used?: boolean;
  expires_at?: string;
}

export interface RegistrationLinkResponse {
  success: boolean;
  data: RegistrationLinkDto[];
  meta?: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

export interface GenerateLinkResponse {
  success: boolean;
  registration_url: string;
  token: string;
  expires_at: string;
}

export interface ValidateLinkResponse {
  success: boolean;
  role: string;
  expires_at: string;
}
