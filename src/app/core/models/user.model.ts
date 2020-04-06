export interface UserModel {
  id: number;
  name: string;
  surname: string;
  country?: string;
  country_id: number;
  email: string;
  age: number;
  phone: number;
  phone_country_code: number;
  bio: string;
  profession: string;
  expiresAt?: number;
  created_at: string;
}
