const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function getalldata(id){
  const rateChart = await db.matrix_customer_rate.findFirst({
    where:{
      customer_id:id
    }
  });
  console.log(rateChart);
  if(rateChart){
    const rateCategory = await db.matrix_rate_category.findFirst({
      where:{
      id:rateChart.matrix_rate_id
      }
    });
    console.log(rateCategory);
    const rateSubCategory = await db.master_customer_sub_classification.findFirst({
      where:{
        id:rateCategory.sub_category_id
      }
    })
console.log(rateSubCategory);
    const classification = await db.master_customer_classification.findFirst({
      where:{
        id:rateSubCategory.category_id
      }
    })
console.log(classification);

rateCategory["rate_cat_id"] = rateCategory["id"]
delete rateCategory["id"]
rateSubCategory["rate_sub_category"] = rateSubCategory["id"]
delete rateSubCategory["id"]
rateSubCategory["master_customer_sub_classification_id"] = rateSubCategory["id"]
delete rateSubCategory["id"]
classification["classification_id"] = classification["id"]

    return {...rateCategory,...rateSubCategory,...rateChart,...classification}

  }
}
async function applicationStatus({ application_no }) {
 
  console.log(application_no);
  var application;
  if (application_no[0] == "p") {
    application = await db.customer.findUnique({
      where: {
        application_no: application_no,
      },
    });
    
  } else {
    if (typeof application_no != String)
      application_no = application_no.toString();

    application = await db.customer.findUnique({
      where: {
        id: application_no,
      },
    });
  }
// console.log(application);
  if (!application) {
    return { flag: false, message: "no application exists" };
  } else {
    application.id = application.id.toString();
    const finalData = await getalldata(application.id)
    return {
      flag: true,
      message: "Success",
      data: {...application,...finalData},
    };
  }
}

module.exports = { applicationStatus };
