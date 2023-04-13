const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

function rateCat(rateCategory, categoryId) {
  for (let i = 0; i < rateCategory.length; i++) {
    if (rateCategory[i].id == categoryId) {
      rateCategory[i]["cat_id"] = rateCategory[i]["id"];
      delete rateCategory["id"]; // Delete old key
      return rateCategory[i];
    }
  }
}

function subCat(subCategory, subCategoryId) {
  for (let i = 0; i < subCategory.length; i++) {
    if (subCategory[i].id == subCategoryId) {
      subCategory[i]["sub_cat_Id"] = subCategory[i]["id"];
      delete subCategory["id"];
      return subCategory[i];
    }
  }
}

function classify(classification, id) {
  for (let i = 0; i < classification.length; i++) {
    if (classification[i].id == id) {
      classification[i]["classification_id"] = classification[i]["id"];
      delete classification["id"];
      return classification[i];
    }
  }
}

function applicationFormatter(
  applications,
  rateTable,
  rateCategory,
  subCategory,
  classification
) {
  console.log(rateTable);
  if (rateTable) {
    let NR = [];
    for (let i = 0; i < rateTable.length; i++) {
      let id = rateTable[i].customer_id;
      let category = rateCat(rateCategory, rateTable[i].matrix_rate_id);

      let sub_category = subCat(subCategory, category.sub_category_id);
      let classi = classify(classification, sub_category.category_id);
      for (let j = 0; j < applications.length; j++) {
        let temp = {};
        if (applications[j].id == id) {
          console.log("matched");
          let c = applications[j];
          let r = rateTable[i];
          temp = { ...c, ...r, ...category, ...sub_category, ...classi };
          NR.push(temp);
          applications.splice(i, 1);
          break;
        }
      }
    }
    let data = {
      applications: [...NR],
    };
    console.log(data);
    return [...applications, ...NR];
  } else {
    return [...applications];
  }
}

async function getAllApplication({ token }) {
  const rateChart = await db.matrix_customer_rate.findMany();
  const rateCategory = await db.matrix_rate_category.findMany();
  const subCategory = await db.master_customer_sub_classification.findMany();
  const classification = await db.master_customer_classification.findMany();

  const usr = await db.users_system.findUnique({
    where: {
      token: token,
    },
  });
  // console.log(usr);

  if (!usr) {
    return { flag: false, message: "Bad Request" };
  } else if (usr.user_role == 2) {
    const applicants = await db.customer.findMany();

    let newAppli = applicationFormatter(
      applicants,
      rateChart,
      rateCategory,
      subCategory,
      classification
    );

    let application = [];
    for (let i = 0; i < newAppli.length; i++) {
      if (usr.zones.includes(newAppli[i].pickup_zone)) {
        application.push(newAppli[i]);
      }
    }
    console.log("applicaion", application);

    return {
      flag: true,
      message: "Success",
      data: application,
    };
  } else if (usr.user_role == 3) {
    const applicants = await db.customer.findMany({
      where: {
        status: 3,
      },
    });

    // console.log(applicants);
    return {
      flag: true,
      message: "Success",
      data: applicationFormatter(
        applicants,
        rateChart,
        rateCategory,
        subCategory,
        classification
      ),
    };
  } else if (usr.user_role == 4) {
    const applicants = await db.customer.findMany({
      where: {
        status: 5,
      },
    });
    // console.log(applicants);
    return {
      flag: true,
      message: "Success",
      data: applicationFormatter(
        applicants,
        rateChart,
        rateCategory,
        subCategory,
        classification
      ),
    };
  } else if (usr.user_role == 6) {
    const applicants = await db.customer.findMany({
      //d2d get all applicatios
      where: {
        status: 6,
        // qr_code_image: "",
      },
    });

    // console.log(applicants);
    return {
      flag: true,
      message: "Success",
      data: applicationFormatter(
        applicants,
        rateChart,
        rateCategory,
        subCategory,
        classification
      ),
    };
  } else {
    return {
      flag: false,
      message: "Access Denied",
    };
  }
}

// module.exports = { getAllApplication };
