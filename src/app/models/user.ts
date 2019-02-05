export class User {
  constructor(
    public name?: string,
    public username?: string,
    public email?: string,
    public password?: string,
    public role?: boolean,
    public id?: number
  ) {}
}