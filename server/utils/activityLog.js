const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function activityLogUser({
  login_id,
  updatedBy,
  updatedUser,
  message,
  lastLog,
}) {
  const finalMessage =
    lastLog +
    new Date().toISOString().slice(0, 19).replace("T", " ") +
    "--" +
    `${updatedBy} - ${message} - of user - ${updatedUser}~`;
  console.log(message);
  try {
    const log = await db.users_system.update({
      where: { login_id: login_id },
      data: { activity_log: finalMessage },
    });
    console.log({
      flag: true,
      message: "activity log Updated",
    });
    return {
      flag: true,
      message: "activity log Updated",
    };
  } catch (e) {
    console.log({
      flag: false,
      message: "Error Occured",
      Error: e.message,
    });
    return {
      flag: false,
      message: "Error Occured",
      Error: e.message,
    };
  }
}

module.exports = { activityLogUser };
//temp unused
