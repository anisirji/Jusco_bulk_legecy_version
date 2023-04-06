function readApplicationFormatter(applications) {
  const body = applications.data;
  let data = {};

  for (let i = 0; i < body.length; i++) {
    let type;
    if (body[i].document_type_1 === 1) type = "GSTIN";
    else if (body[i].document_type_1 === 2) type = "Vendor ID Card";
    else if (body[i].document_type_1 === 3) type = "Trade License";
    else if (body[i].document_type_1 === 4) type = "Electricity Bill";
    else if (body[i].document_type_1 === 5) type = "Aadhaar";

    data[i] = {
      department_name: "PHS",
      account_group: "Sold-to party",
      company_code: "1000",
      sales_organization: "1000",
      distribution_channel: "10",
      division: "50",
      neilsen_ID: "06",
      customer_class: "03",
      recon_account: "1220001",
      terms_of_payments: "0001",
      sales_area: "1000",
      application_no: body[i].application_no,
      contact_person: `${body[i].first_name} ${body[i].last_name}`,
      email_id: body[i].email_id,
      mobile_no: body[i].mobile_no,
      title: body[i].salutation,
      billing_entity: body[i].billing_estb_name,
      street: body[i].billing_street,
      postal_code: body[i].billing_postal_code,
      city: body[i].billing_city,
      country: body[i].billing_country,
      region: body[i].billing_region,
      customer_category: body[i].customer_category === 1 ? "B2B" : "B2C",
      document_type: type,
      document_no: body[i].document_no_1,
    };
  }
  return data;
}

module.exports = readApplicationFormatter;
