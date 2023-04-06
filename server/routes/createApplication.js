const { PrismaClient } = require("@prisma/client");
const { sms } = require("./sendMessage");
const cloudinary = require("cloudinary");
const base64ToImage = require("base64-to-image");
const path = require("path");
const fs = require("fs");

const db = new PrismaClient();

async function createApplication(usrData, applicationNo) {
  const dateTime = new Date();

  const {
    salutation,
    Fname,
    Lname,
    mobile,
    email,
    designation,
    doctype1,
    doc1No,
    docFile1,
    doctype2,
    doc2No,
    docFile2,
    doctype3,
    doc3No,
    docFile3,
    nameBa,
    streetHouseNoBa,
    zoneBa,
    areaBa,
    localityBa,
    postalCodeBa,
    cityBa,
    regionBa,
    countryBa,
    namePa,
    streetHouseNoPa,
    postalCodePa,
    cityPa,
    regionPa,
    countryPa,
    zonePa,
    areaPa,
    localityPa,
    qty,
    remarks,
    medium_lang,
    latitude,
    longitude,
    signature_acknowledgement,
    customer_category,
    bp_no,
    rate_proposed,
    matrix_rate_id,

    rate_category,
  } = usrData;

  const impData = [
    salutation,
    Fname,
    Lname,
    mobile,
    doctype1,
    doc1No,
    docFile1,
    nameBa,
    streetHouseNoBa,
    zoneBa,
    areaBa,
    localityBa,
    postalCodeBa,
    cityBa,
    regionBa,
    countryBa,
    namePa,
    streetHouseNoPa,
    postalCodePa,
    cityPa,
    regionPa,
    countryPa,
    zonePa,
    areaPa,
    localityPa,
    rate_proposed,
    rate_category,
    matrix_rate_id,
    latitude,
    longitude,
    signature_acknowledgement,
  ];

  for (let i = 0; i < impData.length; i++) {
    if (!impData[i]) {
      return {
        status: false,
        message: `Please fill all the mandatory fields.`,
      };
    }
  }

  const daate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const appliNo = `ph${applicationNo}${Math.floor(
    Math.random() * 1000
  )}${dateTime.getFullYear()}`;
  const id = Math.floor(Math.random() * 100) + dateTime.getTime().toString();
  console.log(Math.floor(Math.random() * 100) + dateTime.getTime());
  // console.log(appliNo);

  fs.mkdirSync(path.join(__dirname, "../Documents", appliNo));

  if (doc1No) {
    const base64Str = docFile1;
    const path_ = path.join(__dirname, "../Documents", appliNo, `/${doctype1}`);
    const optionalObj = { fileName: `${doctype1}`, type: "png" };

    const value = await base64ToImage(base64Str, path_, optionalObj);

    // Note base64ToImage function returns imageInfo which is an object with imageType and fileName.
  }
  if (doc2No) {
    const base64Str = docFile2;
    const path_ = path.join(__dirname, "../Documents", appliNo, `${doctype2}`);
    const optionalObj = { fileName: `${doctype2}`, type: "png" };

    const value = await base64ToImage(base64Str, path_, optionalObj);

    // Note base64ToImage function returns imageInfo which is an object with imageType and fileName.
  }
  if (doc3No) {
    const base64Str = docFile3;
    const path_ = path.join(__dirname, "../Documents", appliNo, `${doctype3}`);
    const optionalObj = { fileName: `${doctype3}`, type: "png" };

    const value = await base64ToImage(base64Str, path_, optionalObj);

    // Note base64ToImage function returns imageInfo which is an object with imageType and fileName.
  }
  if (signature_acknowledgement) {
    const base64Str = signature_acknowledgement;
    const path_ = path.join(__dirname, "../Documents", appliNo, "signature");
    const optionalObj = { fileName: "signature", type: "png" };

    const value = await base64ToImage(base64Str, path_, optionalObj);

    // Note base64ToImage function returns imageInfo which is an object with imageType and fileName.
  }

  try {
    const as = await db.customer.create({
      data: {
        id: id,
        application_no: appliNo,
        customer_id: appliNo,
        house_id: appliNo,
        status: 1,
        salutation: salutation,
        first_name: Fname,
        last_name: Lname,
        mobile_no: mobile,
        email_id: email,
        designation: designation,
        bp_no: bp_no,
        medium_of_communication: medium_lang,
        document_type_1: doctype1,
        document_no_1: doc1No,
        document_file_name_1: `/documents/${appliNo}/${doctype1}${doctype1}.png`,

        document_type_2: doctype2,
        document_no_2: doc2No,
        document_file_name_2: `/documents/${appliNo}/${doctype2}${doctype2}.png`,

        document_type_3: doctype3,
        document_no_3: doc3No,
        document_file_name_3: `/documents/${appliNo}/${doctype3}${doctype3}.png`,

        billing_estb_name: nameBa,
        billing_street: streetHouseNoBa,
        billing_zone: zoneBa,
        billing_area: areaBa,
        billing_locality: localityBa,
        billing_postal_code: postalCodeBa,
        billing_city: cityBa,
        billing_region: regionBa,
        billing_country: countryBa,
        pickup_estb_name: namePa,
        pickup_street: streetHouseNoPa,
        pickup_zone: zonePa,
        pickup_area: areaPa,
        pickup_locality: localityPa,
        pickup_postal_code: postalCodePa,
        pickup_city: cityPa,
        pickup_region: regionPa,
        pickup_country: countryPa,
        daily_wastage: qty,
        remarks: remarks,
        longitude: longitude.toString(),
        latitude: latitude.toString(),
        frequency: 000,
        customer_category: customer_category,
        signature_on_device: "no",
        signature_file_name: `/Documents/${appliNo}/signaturesignature.png`,
        depot_area: zonePa,
        rate_proposed: 0,
        qr_code: "",
        qr_code_by: 1,
        qr_code_at: "",
        qr_code_time: `${new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ")}`,
        qr_code_image: "",
        entry_date: daate,
        last_modified_by: 3,
        last_modified_date: daate,
        activity_log: `account Created on ${new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ")}`,
        billing_category: 0,
        rate_proposed: rate_proposed,
      },
    });
    const rateTable = await db.matrix_customer_rate.create({
      data: {
        customer_id: id,
        matrix_rate_id: matrix_rate_id,
        rate_value: rate_proposed,
        rate_category: rate_category,
        rate_remarks: "",
        effective_date: new Date().toISOString().slice(0, 19).replace("T", " "),
        entry_by: 0,
        entry_date: new Date().toISOString().slice(0, 19).replace("T", " "),
        mod_by: 0,
        mod_date: new Date().toISOString().slice(0, 19).replace("T", " "),
      },
    });
  /*  const ab = await sms({
      phone: `${mobile}`,
      message: `Your application is submitted in Bulk Generation System with application no. ${appliNo}. Save it for further usage. -Tata Steel UISL (JUSCO)`,
      

    });*/
    // const mn = await sms({
    //   phone: `${mobile}`,
    //   message: `${"Track Your Application at http://bulk.jusco.rudrayati.in/trackYourApplication for more details"}`,
    // });

    return {
      status: true,
      message: `Application Created For User ${salutation} ${Fname}. Application Number is ${appliNo}`,
      applicationNo: appliNo,
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: "Application not created",
      e: e.message,
    };
  }
}

module.exports = { createApplication };
