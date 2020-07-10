import { UserRole } from './UserRole';

export class ApplicationUser {
  username:           string;
  email:              string;
  phoneNumber:        string;
  userRoles:        UserRole[];
}
