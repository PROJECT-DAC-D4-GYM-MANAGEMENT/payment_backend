const express = require("express");
const axios=require("axios")
const app=express();
const crypto=require("crypto")


app.get("/:amount", async(req,res)=>{
console.log("hello")

try{
      const data = {
        merchantId: "PGTESTPAYUAT",
        merchantTransactionId: "T7887590068188104",
        merchantUserId: "MUID6037302229373",
        name: "Dummy",
        amount: req.params.amount*100,
        redirectUrl: `http://localhost:9999/payment/status`,
        redirectMode: 'POST',
        mobileNumber: "9999999999",
        paymentInstrument: {
            type: 'PAY_PAGE'
        }
    };



    const payload = JSON.stringify(data);
    
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"
        const options = {
            method: 'POST',
            url: prod_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };
      
      
        axios.request(options).then(function (response) {
            console.log(response.data.data.instrumentResponse.redirectInfo.url)


            res.send(JSON.stringify({ data: response.data.data.instrumentResponse.redirectInfo.url, status: true }))
            
            
        })
        .catch(function (error) {
            console.error(error);
        });
    }

    catch(e){
    return e;
    }
      

      

})


app.post("/status", async(req,res)=>{
    // console.log(res.req.body)
    // const merchantTransactionId = res.req.body.transactionId
    // const merchantId = res.req.body.merchantId

    const keyIndex = 1;
    const string = `/pg/v1/status/PGTESTPAYUAT/T7887590068188104` + "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + keyIndex;

    const options = {
    method: 'GET',
    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/PGTESTPAYUAT/T7887590068188104`,
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'X-MERCHANT-ID': `PGTESTPAYUAT`
    }
    };

    // CHECK PAYMENT TATUS
    axios.request(options).then(async(response) => {
        if (response.data.success === true) {
            const url = `http://localhost:3000/success?id=plans`
             res.redirect(url)
        } else {
            const url = `http://localhost:3000/failure`
            return res.redirect(url)
        }
    })
    .catch((error) => {
        console.error(error);
    });
    
          
    
    })
module.exports = app;