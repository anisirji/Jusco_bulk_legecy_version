const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { createTokens } = require("../auth/jwtToken");

const db = new PrismaClient();

async function createUser(usrDetails) {
  const dateTime = new Date();
  let Pass;

  const {
   first_name,
   last_name,
    password,
    user_role,
    active,
    entry_by,
    mod_by,
    email,
    phone_no,
    isAdmin,
    zones,
  } = usrDetails;
  const Token = await createTokens(phone_no);
  const hassPass = await bcrypt.hash(password, 15).then(async (hashPass) => {
    Pass = hashPass;
  });

  try {
    const a = await db.users_system.create({
      data: {
        first_name:first_name,
        last_name:last_name,
        login_id: phone_no,
        password: Pass,
        user_role: user_role,
        active: active || "YES",
        entry_by: entry_by,
        entry_date: dateTime,
        mod_by: mod_by,
        mod_date: dateTime,
        token: Token,
        email: email,
        phone_no: phone_no,
        isAdmin: isAdmin,
        activity_log: `${new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ")}-${first_name} Created~`,
      },
    });

    return {
      status: "Success",
      message: `user Created ${first_name}`,
      token: Token,
    };
  } catch (e) {
    console.log(e.code);
    console.log(e);
    if ((e.code = "P2002")) {
      return {
        status: "failed",
        message: `User Already Exist`,
      };
    } else {
      return {
        status: "Failed",
        message: `No user Created`,
        error: e.message,
      };
    }
  }
}

module.exports = { createUser };
