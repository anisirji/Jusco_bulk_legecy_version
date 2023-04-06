const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function applicationAgainstStatus(status) {
  const applicants = await db.customer.findMany({
    where: {
      status: status,
    },
  });
  console.log(applicants);
  return {
    flag: true,
    message: "successful",
    data: applicants,
  };
}

module.exports = applicationAgainstStatus;
