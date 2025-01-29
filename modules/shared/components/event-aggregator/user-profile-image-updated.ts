export class UserProfileImageUpdated {
  id: string;
  value: string;

  constructor(args?: Partial<UserProfileImageUpdated>) {
    if (!args) return;
    Object.assign(this, args);
  }
}
