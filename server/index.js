const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { urlencoded } = require("body-parser");
const cloudinary = require("cloudinary");
const path = require("path");
const axios = require("axios");
const rateLimit = require("express-rate-limit");

const { loginUser } = require("./routes/userLogin");
const { createApplication } = require("./routes/createApplication");
const { createUser } = require("./routes/userCreation");
const { applicationStatus } = require("./routes/applicationstatus");
const { changeStatus } = require("./routes/changeStatus");
const { getAllApplication } = require("./routes/getAllapplications");
const { sendToHod } = require("./routes/sentToHod");
const { sms } = require("./routes/sendMessage");
const { updateCustomerData } = require("./routes/updateCustomerData");
const { createInvoice } = require("./routes/createInvoice");
const { getInvoice } = require("./routes/getInvoice");
const { getCustomerClassification } = require("./routes/getTableData");
const {
  getCustomerSubClassification,
} = require("./routes/getCustomerSubClassification");
const { rate_category } = require("./routes/rateCategory");
const { genSaltSync } = require("bcrypt");
const { cc } = require("./routes/rate/cc");
const { csc } = require("./routes/rate/csc");
const { rate } = require("./routes/rate/rate");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "server/config.env" });
}

const app = express();
const db = new PrismaClient();
var applicationNo = 0;

///////////////////////////////////////////////////////

const multer = require("multer");
const { response } = require("express");
const { updateuserData } = require("./routes/updateuserData");
const readApplicationFormatter = require("./utils/readApplicationFormatter");
const applicationAgainstStatus = require("./routes/applicationAgainstStatus");
const { readInvoice, writeInvoice } = require("./routes/invoce");
const updateRateMatrix = require("./routes/updateCustomerRateMatrix");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "authanticImages");
  },
  filename: (req, file, cb) => {
    console.log(file);
    console.log(req.body);
    cb(null, Date.now() + path.extname(file.originalname));
    req.body.fileName = Date.now() + path.extname(file.originalname);
  },
});

const upload = multer({ storage: storage });

///////////////////////////////////////////////////
// app.use(
//   rateLimit({
//     windowMs: 12 * 60 * 60 * 1000, // 12 hour duration in milliseconds
//     max: 5,
//     message: "You exceeded 100 requests in 12 hour limit!",
//     headers: true,
//   })
// );

app.use(cors({ "access-control-allow-origin": "*" }));
app.use(express.static(path.join(__dirname, "../client/build")));
app.use("/documents", express.static("Documents"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(
  express.urlencoded({ limit: "30mb", extended: true, parameterLimit: 500000 })
);
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

//This is for registration of application of user
app.post("/createApplication", async (req, res) => {
  applicationNo++;
  console.log(applicationNo, req.body);
  const response = await createApplication(req.body, applicationNo);
  console.log("/createApplication");
  console.log(response);
  res.send(response);
});

//user to see his application status
app.post("/applicationDetails", async (req, res) => {
  console.log("/applicationDetails");
  const response = await applicationStatus(req.body);
  console.log(response);
  res.send(response);
});

//To send all applicant information to client
app.post("/getApplications", async (req, res) => {
  console.log("/getApplications");
  const applications = await getAllApplication(req.body);
  // console.log(applications);
  res.send(applications);
});

//For Creating new user
app.post("/createUser", async (req, res) => {
  console.log("creating User");
  const usrDetails = await createUser(req.body);
  console.log(usrDetails);
  console.log("User Created");
  console.log("Sending response....");
  res.send(usrDetails);
});

// This is for login of user
app.post("/login", async (req, res) => {
  const user = await loginUser(req.body);
  console.log(user);
  console.log(user.message);
  if (user.flag) {
    console.log(user.username, " user loggedin");
  }
  res.send(user);
});

//changing status of customer
app.post("/changeStatus", async (req, res) => {
  console.log("/changeStatus");
  const { applicantId, newStatus, token } = req.body;
  const response = await changeStatus(applicantId, newStatus, token);
  console.log(response);
  res.send(response);
});

//Sending Application to HOD
app.post("/sendToHod", async (req, res) => {
  console.log("/sendToHod");

  const response = await sendToHod(req.body);
  console.log(response);
  res.send(response);
});

//to send sms
app.post("/sms", async (req, res) => {
  const response = await sms(req.body);
  res.send(response);
});

//universal route to change Customer application data at any given point
//it takes applicantId + {an object containing key (as the database name : updated value)}

app.post("/updateCustomerData", async (req, res) => {
  const response = await updateCustomerData(req.body);
  console.log(response);
  res.send(response);
});

app.post("/createInvoice", async (req, res) => {
  const response = await createInvoice(req.body);
  res.send(response);
});

app.post("/getInvoice", async (req, res) => {
  const response = await getInvoice(req.body);
  res.send(response);
});

app.post("/getApi", async (req, res) => {
  console.log(req.body["url"]);
  const response = await axios.get(req.body["url"]);
  console.log(response);
  res.send(response.data);
});

app.post("/cc", async (req, res) => {
  console.log("cc");
  const response = await cc(req.body);
  res.send(response);
});

app.post("/csc", async (req, res) => {
  console.log("csc");
  const response = await csc(req.body);
  res.send(response);
});

app.post("/rate", async (req, res) => {
  console.log("rate");
  const response = await rate(req.body);
  res.send(response);
});

app.post("/write-customer-id", async (req, res) => {
  const { application_no, customer_id, token } = req.body;
  console.log(req.body);
  // res.send("c");
  const response = await updateCustomerData({
    applicantId: application_no,
    updatedData: { customer_id: customer_id },
    token: token,
  });
  res.send(response);
});

//jiska ststus 6 hai
app.post("/read-application", async (req, res) => {
  const applicants = await applicationAgainstStatus(6);
  res.send({
    flag: true,
    message: "request successful",
    body: readApplicationFormatter(applicants),
  });
});

app.get("/read-application-by-status/:status", async (req, res) => {
  const applicants = await applicationAgainstStatus(
    parseInt(req.params.status)
  );
  res.send(applicants);
});

app.post("/upload", upload.single("image"), (req, res) => {
  res.send(`http://localhost:3001/authanticImages/${req.body.fileName}`);
});

app.post("/updateUserData", async (req, res) => {
  const response = await updateuserData(req.body);
  res.send(response);
});

app.post("/get-all-user", async (req, res) => {
  try {
    const users = await db.users_system.findMany();
    console.log({
      flag: true,
      message: "fetch successful",
      data: users,
    });
    res.send({
      flag: true,
      message: "fetch successful",
      data: users,
    });
  } catch (e) {
    console.log({
      flag: false,
      message: "some error occured",
      error: e,
    });
    res.send({
      flag: false,
      message: "some error occured",
      error: e,
    });
  }
});

app.post("/get-all-user-by-role", async (req, res) => {
  try {
    const users = await db.users_system.findMany({
      where: {
        user_role: req.body.user_role,
      },
    });
    console.log({
      flag: true,
      message: "fetch successful",
      data: users,
    });
    res.send({
      flag: true,
      message: "fetch successful",
      data: users,
    });
  } catch (e) {
    console.log({
      flag: false,
      message: "some error occured",
      error: e,
    });
    res.send({
      flag: false,
      message: "some error occured",
      error: e,
    });
  }
});

//luiglititlyitlyitliytiy
app.get("/read-invoice", async (req, res) => {
  console.log("asdluadsgils");
  const response = await readInvoice();
  res.send("response");
});

app.post("/write-invoice", async (req, res) => {
  const response = await writeInvoice(req.body);
  res.send(response);
});

app.post("/matrix-rate-category", async (req, res) => {
  let response = await db.matrix_rate_category.findUnique({
    where: {
      id: req.body.id,
    },
  });
  console.log(response);
  res.send({ flag: true, data: response });
});

app.post("/master-customer-sub-classification", async (req, res) => {
  let response = await db.master_customer_sub_classification.findUnique({
    where: {
      id: req.body.id,
    },
  });
  console.log(response);
  res.send({ flag: true, data: response });
});

app.post("/master-customer-classification", async (req, res) => {
  let response = await db.master_customer_classification.findUnique({
    where: {
      id: req.body.id,
    },
  });
  console.log(response);
  res.send({ flag: true, data: response });
});

app.post("/update-customer-rate-matrix", async (req, res) => {
  console.log(req.body);
  const response = await updateRateMatrix(req.body);
  res.send(response);
});

app.get("/ma/:id", (req, res) => {
  console.log("get request");
  console.log(req.params.id);
  res.send(req.params.id);
});
app.get("/documents/:userId/:doctype", (req, res) => {
  let img;
  try {
    img = path.resolve(
      __dirname,
      `./Documents/${req.params.userId}/${req.params.doctype}`
    );
  } catch (e) {
    res
      .render(
        "no file exist please check file name andtry again '/documents/:userId/:doctype'"
      )
      .status(404);
    res.render("No File Exists");
  }

  res.sendFile(img);
});
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`localhost:${process.env.PORT}`);
});
