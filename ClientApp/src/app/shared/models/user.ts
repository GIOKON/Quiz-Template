import { Country } from './Country';

export class User {
  id: number;
  userName: string;
  password: string;
  passwordHash: string;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  token?: string;

  endpoint: string;
  description: string;
  location: string;
  profilePicture: string;
  backgroundPicture: string;
  facebook: string;
  twitter: string;
  instagram: string;
  country: Country;
  countryId: number | null;
}
