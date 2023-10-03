import identity from "../identity.mjs"; //where the caregiver id is extracted
import {new_client} from "../msgraph.mjs";
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
    let user_ph = id.user //use phone number instead
    let $ = await new_client();
    let care = new URLSearchParams({
        $select:`crb5c_name, crb5c_email`,
        $expand:`crb5c_client($select=crb5c_no,crb5c_fow_customerid,crb5c_photo)`,
        $filter:`crb5c_fow_caregiver_client_crb5c_FOW_Cust/any(d: d/crb5c_contactnumbermobile eq '${user_ph}')`
    })

    try {
        let {data:{value}} = await $.get(`/crb5c_fow_caregiver?${care.toString()}`);

        context.res = {
            headers:{
                "Content-Type":"application/json"
            },
            body: {cli_list: value}
        };
    } catch (error) {
        context.res = {
            headers:{
                "Content-Type":"application/json"
            },
            body: {
                care:care.toString(),
                err:error.response.data
            }
        };
        
    }

    
        return;
       
}
