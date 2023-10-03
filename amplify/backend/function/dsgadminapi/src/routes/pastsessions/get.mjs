// import identity from "../identity.mjs"; //where the caregiver id is extracted
// import {new_client} from "../msgraph.mjs";

import clidata from './ClientPage.vue';
export default async (context,req)=>{
    let cli_id = clidata.id
    let headers = {"Content-Type":"application/json"};
    
    let sesh = new URLSearchParams({
        $select:`crb5c_client,crb5c_session,crb5c_checkin_time,crb5c_checkout_time`,
        $expand:`crb5c_client($select=crb5c_no,crb5c_fow_customerid,crb5c_photo)`,
        $filter:`crb5c_fowsessionattendance_client_crb5c_F/any(d: d/crb5c_client_value eq '${cli_id}')` //filter to prev
    })

    try {
        let {data:{value}} = await $.get(`/crb5c_fowsessionattendances?${sesh.toString()}`);

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
                sesh:sesh.toString(),
                err:error.response.data
            }
        };
        
    }

    
        return;
    
}