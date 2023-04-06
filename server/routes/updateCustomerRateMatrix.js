const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();


async function updateRateMatrix({customer_id,updateValue}){
    const up = await db.matrix_customer_rate.update({
        where:{
            customer_id:customer_id,
        },data:updateValue
    })
    return {flag:true,message:"updated"}
}

module.exports = updateRateMatrix