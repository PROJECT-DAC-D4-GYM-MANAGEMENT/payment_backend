
const twilio=require("twilio");
const sms=(msg)=>{
const client=new twilio("ACcfa3b2924079c8662d0d5fea83ed5213","3d55f4da667ef67ce2e15741103179df");
return client.messages.create({body:msg,from:"12058758042",to:"+917000481797"})
}
module.exports=sms;

