const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

//Read_Invoice from customer,invoice,invoice_details tables

async function readInvoice() {
  const invoices = await db.invoice.findMany();
  const datas = [];

  for (let i = 0; i < invoices.length; i++) {
    if (!invoices[i].invoice_no) {
      let cust_id = invoices[i].cust_id;
      const applicantData = await db.customer.findUnique({
        where: {
          id: cust_id,
        },
        select: {
          customer_id: true,
          material_code: true,
          customer_category: true,
        },
      });
      const invoice_details = await db.invoice_details.findFirst({
        where: {
          invoice_id: invoices[i].id,
        },
        select: {
          quantiy: true,
          rate_per_unit: true,
        },
      });
      const obj = {
        customer_id: applicantData.customer_id,
        from_date: invoices[i].from_date.toISOString().slice(0, 10).replace("T", " "),
        to_date: invoices[i].to_date.toISOString().slice(0, 10).replace("T", " "),
        material_code: applicantData.material_code,
        customer_category: applicantData.customer_category == 1 ? "B2B" : "B2C",
        quantity: invoice_details.quantiy,
        rate: invoice_details.rate_per_unit,
        invoice_id: invoices[i].id,
      };
      console.log(obj);
      datas.push(obj);
    }
  }

  console.log(datas);

  return {
    flag: true,
    invoice_data: datas,
  };
}

async function writeInvoice({ invoice_id, invoice_no, invoice_date, irn }) {
  // const date = new Date(invoice_date)
    // .toISOString()
    // .slice(0, 19)
    // .replace("T", " ");
  console.log({ invoice_id, invoice_no, invoice_date, irn });
  // try {
    const toUpdate = await db.invoice.update({
      where: {
        id: invoice_id,
      },
      data: {
        invoice_no: invoice_no || "",
        invoice_date: invoice_date || null,
        irn: irn || "",
      },
    });
    return { flag: true, message: "data updated" };
  // } catch (e) {
  //   console.log(e);
  //   return { flag: false, message: e.message };
  // }

  return toUpdate;
}

module.exports = { readInvoice, writeInvoice };
