import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./screens/login";
import CreateUser from "./screens/createUser";
import CustomersLogin from "./screens/customersLogin";
import ApplicationForm from "./screens/applicationForm";
import AdminLogin from "./screens/customersLogin";
import CustomerDashboard from "./screens/customerDashboard";
import DepoManagerDashboard from "./screens/depoManagerDashboard";
import ApplicationDetails from "./screens/depoManagerDashboard/components/applicationDetails";
import CustomerApplicationStatus from "./screens/applicationStatus";
import HodDashboard from "./screens/hodDashboard";
import DoorToDoor from "./screens/doorToDoor";
import DoorToDoorVerification from "./screens/doorToDoorVerification";
import SendSms from "./screens/sendSms";
import TrackYourApplication from "./screens/trackYourApplication";
import HodApplicationDetails from "./screens/hodDashboard/components/applicationDetails";
import AccountManagerDashboard from "./screens/accountManagerDashboard";
import AccountsApplicationDetails from "./screens/accountManagerDashboard/components/applicationDetails";
import D2dApplicationDetails from "./screens/doorToDoorVerification/components/applicationDetails";
import CustomerReviewLetterPdf from "./screens/customerReviewLetterPdf";
import ApplicationFormPdf from "./screens/customerStatusPdf";
import FieldWorkerDashboard from "./screens/fieldWorkerDashboard";
import BillingManagerDashBoard from "./screens/billingManager";
import InvoicePdf from "./screens/invoicePdf";
import InvoicePage from "./screens/seeinvoice";
import CreateInvoice from "./screens/accountManagerDashboard/components/createInvoice";
import UpdateUserData from "./screens/updateUser/index";
import Depo_zone from "./screens/depo_zone";
import Supervisor from "./screens/accountManagerDashboard copy";
import DepoManager from "./screens/assets/depoManager";
import Details from "./screens/assets/details";
import AdminDashboard from "./screens/adminDashboard";
import Field_zone from "./screens/fieldManager_zone";

function App() {
  const [userData, setUserData] = useState("");
  const [applicantData, setApplicantData] = useState("");
  const [invoiceData, setInvoiceData] = useState("");
  const [user, setUser] = useState("");

  console.log(user);
  return (
    <>
      <div style={{ background: "#f0f2f7" }}>
        <Router>
          <Routes>
            <Route path="/" element={<CustomersLogin />} />
            <Route
              path="/somewhere/in/www/admin"
              element={<Login setUser={setUser} user={user} />}
            />
            <Route path="/application" element={<ApplicationForm />} />
            <Route
              path="/customerDashboard"
              element={
                <CustomerDashboard
                  userData={userData}
                  userName={user?.user_name}
                  isAdmin={user?.isAdmin}
                />
              }
            />
            <Route path="/adminLogin" element={<AdminLogin />} />
            <Route
              path="/depoManagerDashboard"
              element={
                <DepoManagerDashboard
                  setApplicantData={setApplicantData}
                  userName={user?.user_name}
                  isAdmin={user?.isAdmin}
                />
              }
            />
            <Route
              path="/adminDashboard"
              element={
                <AdminDashboard
                  setApplicantData={setApplicantData}
                  userName={user?.user_name}
                  isAdmin={user?.isAdmin}
                />
              }
            />
            <Route
              path="/depoManager"
              element={
                <DepoManager
                  setApplicantData={setApplicantData}
                  userName={user?.user_name}
                  isAdmin={user?.isAdmin}
                />
              }
            />

            <Route
              path="/applicationDetails"
              element={<ApplicationDetails applicantData={applicantData} />}
            />
            <Route
              path="Details"
              element={<Details applicantData={applicantData} />}
            />
            <Route
              path="/hodApplicationDetails"
              element={<HodApplicationDetails applicantData={applicantData} />}
            />
            <Route
              path="/accountsApplicationDetails"
              element={
                <AccountsApplicationDetails applicantData={applicantData} />
              }
            />
            <Route
              path="/AccountManagerDashboard"
              element={
                <AccountManagerDashboard
                  setApplicantData={setApplicantData}
                  userName={user?.user_name}
                  isAdmin={user?.isAdmin}
                />
              }
            />
            <Route
              path="/applicationStatus"
              element={<CustomerApplicationStatus userData={userData} />}
            />
            <Route
              path="/hodDashboard"
              element={
                <HodDashboard
                  setApplicantData={setApplicantData}
                  userName={user?.user_name}
                  isAdmin={user?.isAdmin}
                />
              }
            />
            <Route
              path="/hodDasAppDetails"
              element={<CustomerApplicationStatus rev={true} />}
            />
            {/* <Route
              path="/doorToDoor"
              element={<DoorToDoor/>}
            /> */}
            <Route
              path="/doorToDoorVerification"
              element={
                <DoorToDoorVerification
                  setApplicantData={setApplicantData}
                  userName={user?.user_name}
                  isAdmin={user?.isAdmin}
                />
              }
            />
            <Route
              path="/d2dApplicationDetails"
              element={<D2dApplicationDetails applicantData={applicantData} />}
            />
            <Route path="/sendSms" element={<SendSms />} />
            <Route
              path="/trackYourApplication"
              element={<TrackYourApplication setUserData={setUserData} />}
            />
            <Route
              path="/applicationFormPdf"
              element={<ApplicationFormPdf userData={userData} />}
            />
            <Route
              path="/customerReviewLetterPdf"
              element={<CustomerReviewLetterPdf userData={userData} />}
            />

            <Route
              path="/fieldWorkerDashboard"
              element={
                <FieldWorkerDashboard
                  userName={user?.user_name}
                  isAdmin={user?.isAdmin}
                />
              }
            />

            <Route
              path="/billingmanagerDashboard"
              element={
                <BillingManagerDashBoard
                  userName={user?.user_name}
                  isAdmin={user?.isAdmin}
                />
              }
            />
            <Route
              path="/supervisor"
              element={
                <Supervisor
                  setApplicantData={setApplicantData}
                  userName={user?.user_name}
                  isAdmin={user?.isAdmin}
                />
              }
            />
            <Route
              path="/invoicePdf"
              element={<InvoicePdf invoiceData={invoiceData} />}
            />
            <Route
              path="/invoice"
              element={<InvoicePage setInvoiceData={setInvoiceData} />}
            />
            <Route path="/createInvoice" element={<CreateInvoice />} />

            <Route path="/createUser" element={<CreateUser />} />
            <Route path="/editUser" element={<UpdateUserData />} />
            <Route path="/depo_zone" element={<Depo_zone />} />
            <Route path="/field_zone" element={<Field_zone />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
