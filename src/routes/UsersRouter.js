const {
  AllUserData,
  SingleUserData,
  UpdateUserData,
} = require("../controllers/UserInfor");

const router = require("express").Router();

// alluserData
router.get("/allusersdata", AllUserData);
// singleUserData
router.get("/singleuserdata/:id", SingleUserData);

// UDPATE USER DATA
router.put("/updateUserData/:id", UpdateUserData);

module.exports = router;
