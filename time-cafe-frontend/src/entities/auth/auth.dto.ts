export interface RegisterDto {
  login: string
  email: string
  password: string
  password_confirmation: string
  invitation_token?: string
}

export interface RegisterResponseDto {
  success: boolean
}

export type LoginDto = {
  email: string
  password: string
}
