//NOT CHECKED

const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();
async function updateCustomerData(data) {
  let { applicantId,rate_proposed,matrix_id, updatedData, token } = data; //updatedData is an object
  console.log(data);
  // console.log(applicantId,token);
  // try {
  // const usr = await db.users_system.findUnique({
  //   where: {
  //     token: token,
  //   },
  // });
  // console.log(usr);

  // if (!usr) {
  //   return { flag: false, message: "Bad Request" };
  // } else if (
  //   usr.user_role == 2 ||
  //   usr.user_role == 3 ||
  //   usr.user_role == 6 ||
  //   usr.user_role == 4
  // ) {
  if (applicantId[0] == "p") {
    if (rate_proposed) {
      const update = await db.matrix_customer_rate.update({
        where: {
          id: matrix_id,
        },
        data: {
          rate_value: rate_proposed,
        },
      });
    }
    const application = await db.customer.update({
      where: {
        application_no: applicantId,
      },
      data: updatedData, //key value pair should match database fields name
    });
  } else {
    if (rate_proposed) {
      const update = await db.matrix_customer_rate.update({
        where: {
          id: matrix_id,
        },
        data: {
          rate_value: rate_proposed,
        },
      });
    }
    const application = await db.customer.update({
      where: {
        id: applicantId,
      },
      data: updatedData, //key value pair should match database fields name
    });
  }

  return {
    flag: true,
    message: `data Updated`,
  };
  // } else {
  //   return {
  //     flag: false,
  //     message: "Access Denied",
  //   };
  // }
  // } catch (e) {
  //   console.log(e);
  //   return {
  //     flag: false,
  //     message: "Error Occured",
  //     Error: e.message,
  //   };
  // }
}

module.exports = { updateCustomerData };
