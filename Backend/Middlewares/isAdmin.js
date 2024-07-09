const Admin = require("../models/admin");

const isAdmin = async (req, res, next) => {
  //find the user
  const usersId = req.userId;
  const adminFound = await Admin.findById(usersId);
  //check if admin
  if (adminFound?.role === "admin") {
    next();
  } else {
    next(new Error("Access Denied, admin only"));
  }
};

module.exports = isAdmin;
