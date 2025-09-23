export interface CreateUserDto {
  login: string;
  email: string;
  password: string;
}

export interface UserDto {
  id: number;
  login: string;
  email: string;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface UpdateUserDto {
  login: string;
  email: string;
}
