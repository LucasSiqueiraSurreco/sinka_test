export class UserDto {
  uuid: string;

  email: string;

  roles: [string];

  custom_claims: any;

  displayName: string;

  email_verified: boolean;

  phone_number: string;

  isOwner: boolean;

  customRoles: any;
}
