module.exports = function (req, res, next) {
  const { email, name, password } = req.body;

  function validEmail() {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  if (req.path === "/register") {
    if (![email, name, password].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(email)) {
      return "invalid email!";
    } else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        return res.json("Missing Credentials!");
      } else if (!validEmail(email)) {
        return res.json("Invalid Email!");
      }
    }
  }
  next();
};