const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const db = new PrismaClient();
const { activityLogUser } = require("../utils/activityLog");

async function checkUser(user) {
  let flag;
  if (user) {
    const as = await bcrypt.compare(password, user.password).then((match) => {
      flag = match;
      console.log(match);
    });
    if (!flag) {
      return { flag: false, message: "wrong password" };
    } else {
      return {
        flag: true,
        message: "Logged In",
        token: user.token,
        data: user,
      };
    }
  } else {
    return { flag: false, message: "no user exists" };
  }
}

async function loginUser(data) {
  const { username, password } = data;
  console.log(data);
  console.log(username, password);
  try {
    const user = await db.users_system.findUnique({
      where: {
        login_id: username,
      },
    });
    // const dataa = await checkUser(user, password);
    if (user) {
      if (user.active.toLowerCase() === "yes") {
        const update = await activityLogUser({
          login_id: username,
          updatedBy: user.first_name,
          updatedUser: user.first_name,
          message: "Logged in",
          lastLog: user.activity_log,
        });
        user.user_name = user.first_name + ", " + user.last_name;
        console.log(user);
        return {
          flag: true,
          message: "Logged In",
          token: user.token,
          data: user,
        };
      } else {
        const update = await activityLogUser({
          login_id: username,
          updatedBy: user.first_name,
          updatedUser: user.first_name,
          message: "Tried to Login While unActive",
          lastLog: user.activity_log,
        });
        return {
          flag: false,
          message: "User not Active",
        };
      }
    } else {
      return {
        flag: false,
        message: "no user exist",
      };
    }
  } catch (e) {
    console.log(e);
    return { flag: false, message: "Error Occured", Error: e.message };
  }
}

module.exports = { loginUser };
