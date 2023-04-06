

const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();
const {activityLogUser} = require("../utils/activityLog")


async function updateuserData(data) {
  let { login_id, updatedData, token } = data; //updatedData is an object
  const { use_role, email, phone_no, active } = updatedData;

  console.log(updatedData);
  try {
    const usr = await db.users_system.findUnique({
      where: {
        token: token,
      },
    });

    if (!usr) {
      return { flag: false, message: "Bad Request" };
    } else if (usr) {
      const application = await db.users_system.update({
        where: {
          login_id: login_id,
        },
        data: updatedData, //key value pair should match database fields name
      });
      console.log(application);
      const update = await activityLogUser({
        login_id: login_id,
        updatedBy: usr.user_name,
        updatedUser: application.user_name,
        message: `updated details ${updatedData}`,
        lastLog: application.activity_log,
      });
      return {
        flag: true,
        message: `data Updated`,
      };
    } else {
      return {
        flag: false,
        message: "Access Denied",
      };
    }
  } catch (e) {
    console.log(e);
    return {
      flag: false,
      message: "Some Error Occcured",
      Error: e.message,
    };
  }
}

module.exports = { updateuserData };
