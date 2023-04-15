const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function generateInvoice() {
  const customerData = await db.customer.findMany({
    where: {
      NOT: { material_code: null },
    },
    select: {
      id: true,
      application_no: true,
      house_id: true,
      material_code: true,
      rate_proposed: true,
    },
  });
  // console.log(customerData);

  let currentDate1 = new Date();
  currentDate1.setDate(1);
  let firstDateCurrentMonth = currentDate1.toISOString().slice(0, 10);
  currentDate1.setMonth(currentDate1.getMonth() + 1);
  currentDate1.setDate(0);
  let lastDateCurrentMonth = currentDate1.toISOString().slice(0, 10);
  // console.log("First date of current month:", firstDateCurrentMonth);
  // console.log("Last date of current month:", lastDateCurrentMonth);

  const alreadyCreatedInvoices = await db.invoice.findMany({
    where: {
      entry_date: {
        gte: new Date(firstDateCurrentMonth),
        lt: new Date(lastDateCurrentMonth),
      },
    },
  });
  // console.log(alreadyCreatedInvoices);

  let currentDate = new Date();
  currentDate.setDate(1);
  currentDate.setDate(0);
  let lastDatePrevMonth = new Date(currentDate.toISOString().slice(0, 10));
  currentDate.setDate(1);
  let firstDatePrevMonth = new Date(currentDate.toISOString().slice(0, 10));
  // console.log("First date of previous month:", firstDatePrevMonth);
  // console.log("Last date of previous month:", lastDatePrevMonth);

  const invoicePending = customerData.filter(
    (obj1) => !alreadyCreatedInvoices.some((obj2) => obj1.id === obj2.cust_id)
  );

  console.log(invoicePending);

  for (let i = 0; i < invoicePending.length; i++) {
    const invoiceCreation = await db.invoice.create({
      data: {
        id: Math.floor(Math.random() * 1000000) + "invoice",
        from_date: firstDatePrevMonth,
        to_date: lastDatePrevMonth,
        entry_date: new Date(
          new Date().toISOString().slice(0, 19).replace("T", " ")
        ),
        cust_id: invoicePending[i].id,
      },
    });
    // console.log(invoiceCreation);

    const quantity = 1;
    const invoiceDetails = await db.invoice_details.create({
      data: {
        id: Math.floor(Math.random() * 1000000) + "invDteails",
        invoice_id: invoiceCreation.id,
        hsn_code: "999424",
        quantiy: quantity,
        uom:
          invoicePending[i].material_code == "MISC091172"
            ? "MON"
            : invoicePending[i].material_code == "SANI05157"
            ? "TRP"
            : "NOS",
        rate_per_unit: invoicePending[i].rate_proposed,
        discount: 0.0,
        value: invoicePending[i].rate_proposed * quantity,
        taxable: invoicePending[i].rate_proposed * quantity,
        cgst_rate: 9.0,
        cgst_amount: 0.09 * (invoicePending[i].rate_proposed * quantity),
        sgst_rate: 9.0,
        sgst_amount: 0.09 * (invoicePending[i].rate_proposed * quantity),
        igst_rate: 0.0,
        igst_amount: 0.0 * (invoicePending[i].rate_proposed * quantity),
        total_value:
          invoicePending[i].rate_proposed * quantity +
          0.09 * (invoicePending[i].rate_proposed * quantity) +
          0.09 * (invoicePending[i].rate_proposed * quantity) +
          0.0 * (invoicePending[i].rate_proposed * quantity),
      },
    });
  }
  return {
    message: "invoice generated",
    flag: true,
  };
}

async function getCurrentInvoice() {
  let currentDate = new Date();
  currentDate.setDate(1);
  currentDate.setDate(0);
  let lastDatePrevMonth = new Date(currentDate.toISOString().slice(0, 10));
  console.log(lastDatePrevMonth);
  const allInvoice = await db.invoice.findMany({
    where: {
      NOT: {
        invoice_no: null,
      },
      to_date: lastDatePrevMonth,
    },
    select: {
      id: true,
    },
  });

  console.log(allInvoice);

  const finalInvoiceDetails = await db.invoice_details.findMany({
    where: {
      id: {
        in: allInvoice.map((obj) => obj.id),
      },
    },
  });

  console.log(finalInvoiceDetails);
  return {
    flag: true,
    data: finalInvoiceDetails,
    message: "Data fetched Successfully",
  };
}
module.exports = { generateInvoice, getCurrentInvoice };
// generateInvoice();
// getCurrentInvoice();
