class UserModel {
  constructor(
    public first_name: string,
    public last_name: string,
    public email: string,
    public contact_number: string,
    public password: string
  ) { }
}
class UserFormModel {
  constructor(
    public first_name: string,
    public last_name: string,
    public email: string,
    public contact_number: string,
    public password: string
  ) { }
}

export { UserModel, UserFormModel };