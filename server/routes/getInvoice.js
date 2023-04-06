const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function getInvoice({ invoice_no }) {
  //   try {
  const invoice = await db.invoice.findUnique({
    where: {
      invoice_no: invoice_no,
    },
  });
  console.log(invoice);
  if (!invoice) {
    return { flag: false, message: "Bad Request" };
  } else {
    return { flag: true, message: "invoice found", data: invoice };
  }
  //   } catch (e) {
  //     return { flag: false, message: `error: ${e.message}` };
  //   }
}

module.exports = { getInvoice };
