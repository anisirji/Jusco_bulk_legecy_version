const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();
const axios = require("axios");

async function sms({ phone, message }) {
  console.log(phone,message);
  console.log("sms");
  try {
    console.log("in try catch");
    const url = `https://enterprise.smsgupshup.com/GatewayAPI/rest?method=SendMessage&send_to=${phone}%20&msg=${message}&msg_type=TEXT&userid=2000060285&auth_scheme=plain&password=jusco&v=1.1&format=text`;

    // const url = `http://prodnd.bulkssms.com/httpapi/smsapi?uname=RUDRAYATI&password=Rud@1122&sender=WEBSMS&receiver=${phone}&route=TA&msgtype=1&sms=${message}`;

    const s = await axios.get(url);
    const check = s.data.split( ' | ')[0]

    if(check ==="success"){
      console.log(s.data);
      return { flag: true, message: "sent" };
    }else{
      console.log(s.data);
      return { flag: false, message: `Failed to send message` };
    }

  } catch (e) {
    console.log(e);
    return { flag: false, message: `ERROR : ${e}` };
  }
}

module.exports = { sms };
