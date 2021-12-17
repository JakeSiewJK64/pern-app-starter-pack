const UserReducer = (user = 0, action) => {
  switch (action.type) {
    case "INCREMENT_ADDED_USER":
      return user + action.payload;
    default:
      return user;
  }
};

export default UserReducer;
