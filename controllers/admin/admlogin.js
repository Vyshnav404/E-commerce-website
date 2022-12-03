const adminget = require("../../model/adminlogin_helper");
const adminchart = require('../../model/chart') 

const adminlogin = (req, res) => {
  res.render("admin/adminloginpage", { admin: false, user: false });
};

const adminLoginHome = async(req, res) => {

 let user =await adminchart.showUserOnchart()
 let placed =await adminchart.showPlacedOnChart() 
 let shipped = await adminchart.showShippedOnChart()
 let delivered = await adminchart.showDeliveredOnChart()
 let cancelled = await adminchart.showCancelledOnChart()

  adminget.adminDologin(req.body).then((response) => {
    if (response.status) {
      req.session.admin = true;
      res.render("admin/adminpage", {
        admin: true,
        user: false,
        title: "Dashboard",
        user,
        placed,
        shipped,delivered,cancelled
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

const viewDashboard = async(req, res) => {

  let user =await adminchart.showUserOnchart()
 let placed =await adminchart.showPlacedOnChart() 
 let shipped = await adminchart.showShippedOnChart()
 let delivered = await adminchart.showDeliveredOnChart()
 let cancelled = await adminchart.showCancelledOnChart()

  res.render("admin/adminpage", {
    admin: true,
    user: false,
    title: "Dashboard",user,placed,shipped,delivered,cancelled
  });
};

module.exports = {
  adminlogin,
  adminLoginHome,
  adminLogout,
  viewDashboard,
};
