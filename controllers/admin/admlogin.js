const adminget = require("../../model/adminlogin_helper");

const adminlogin = (req, res) => {
  res.render("admin/adminloginpage", { admin: false, user: false });
};

const adminLoginHome = (req, res) => {
  adminget.adminDologin(req.body).then((response) => {
    if (response.status) {
      req.session.admin = true;
      res.render("admin/adminpage", {
        admin: true,
        user: false,
        title: "Dashboard",
      });
    } else {
      res.redirect("/admin");
    }
  });
};

const adminLogout = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log("error");
    } else {
      res.redirect("/admin");
    }
  });
};

const viewDashboard = (req, res) => {
  res.render("admin/adminpage", {
    admin: true,
    user: false,
    title: "Dashboard",
  });
};

module.exports = {
  adminlogin,
  adminLoginHome,
  adminLogout,
  viewDashboard,
};
