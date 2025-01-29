export class UserProfileDetailsUpdated {
  id: string;
  value: string;

  constructor(args?: Partial<UserProfileDetailsUpdated>) {
    if (!args) return;
    Object.assign(this, args);
  }
}
