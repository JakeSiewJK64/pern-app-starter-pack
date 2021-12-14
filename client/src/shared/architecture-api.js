let User = class {
  constructor(
    user_id,
    user_name,
    user_email,
    user_firstname,
    user_lastname,
    user_password,
    user_role
  ) {
    this.user_id = user_id;
    this.user_name = user_name;
    this.user_email = user_email;
    this.user_firstname = user_firstname;
    this.user_lastname = user_lastname;
    this.user_password = user_password;
    this.user_role = user_role;
  }
};

module.exports = User;