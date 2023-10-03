// import twilio_client from '../twilio.mjs';
// const {TWILIO_MSG_SVC} = process.env;
//twilio imports

// import identity from "../identity.mjs"; //where the caregiver id is extracted
// import {new_client} from "../msgraph.mjs";
export default async (context,req)=>{
    console.log("getting session info");
    if(!req.headers["x-cty-authorization"]){
        console.log("Missing token");
        
        context.res = {status:403,body:"UNAUTHORISED"}
        return;
    }
    let token = req.headers["x-cty-authorization"];
    //console.log(token);
    let id = new identity(token);
    await id.ready;

    if(!id.user){
        context.res = {status:403,body:"UNAUTHORISED"}
        return;
    }

    //if one to many (caregiver(1) client (+) is being implemented)
    let user_ph = id.user; //use phone number instead
    let $ = await new_client();

    let {data:cont} = await $.get(`/[relevant table](${user_ph})/?$select= [relevant attr]`).catch(err=>{
        
        success = false;
        status = 404;
        console.log(err.response.data);
        return err.response;
    })

    let {['relevant attr']: name} = cont
    
    if(success && action=="send_sms"){
        let link = `${URLObj.origin}/[relevant table]/${user_ph}`
        await twilio_client.messages.create({
            to:phone,
            messagingServiceSid:TWILIO_MSG_SVC,
            body:``
        })
    }
    if(success && action=="send_email"){
        let link = `${URLObj.origin}/cr_response/${user_ph}`
        const $g = await new_graph_client();
        let rsp = await  $g.post(`/users/[no-reply@exampleemail.com]/sendMail`,{
            message:{
                toRecipients:[
                    {
                        emailAddress:{
                            address:email,
                            name: name
                        },
                    }
                ],
                ccRecipients:[
                    {
                        emailAddress:{
                            address: "",
                            name: "",
                        }

                    },
                    
                ],
                body:{
                    content: ``,
                    contentType:"text"
                },
                subject:""
            }
        })
        console.log(rsp.data);
    }

    context.res = {
        headers: {
            "Content-Type": "application/json"
        },
        status,
        body:{
            success,
            cr_result,
            error
        }
    };
}
