
import Twilio from "../../classes/twilio.mjs"
export default async (req, res)=>{
    const tw = new Twilio();

    //  let all = await tw.getAllConversations();
    //  res.json(all);

    //let createEveryone = await tw.createEveryone();
    //res.json(createEveryone);

    // let createEveryone = await tw.createEveryone();
    let resz = await tw.putAdminInAllConversations();
    res.json(resz);
}