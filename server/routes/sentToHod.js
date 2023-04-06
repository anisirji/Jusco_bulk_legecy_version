const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function sendToHod(data) {
  let {
    frequency,
    id,
    token,
    signature_on_device,
    depot_area,
    // rate_proposed,
    matrix_rate_id,
    // rate_category,
    monthly_billing_category,
  } = data;

  const usr = await db.users_system.findUnique({
    where: {
      token: token,
    },
  });

  if (!usr) {
    return { flag: false, message: "Bad Request" };
  } else if (usr.user_role == 2) {
    const application = await db.customer.update({
      where: {
        id: id,
      },
      data: {
        status: 3, //means hod approval
        signature_on_device: signature_on_device,
        depot_area: depot_area,
        frequency: parseInt(frequency),
        // rate_proposed: rate_proposed,
        monthly_billing_category: monthly_billing_category,
      },
    });

    return {
      flag: true,
      message: `Success, Sent to hod`,
    };
  } else {
    return {
      flag: false,
      message: "Access Denied",
    };
  }
}

module.exports = { sendToHod };
