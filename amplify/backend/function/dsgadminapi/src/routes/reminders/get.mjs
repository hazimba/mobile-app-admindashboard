// import identity from "../identity.mjs"; //where the caregiver id is extracted
// import {new_client} from "../msgraph.mjs";


//is it by client OR by caregiver?? current code is by client

import clidata from './ClientPage.vue';
export default async (context,req)=>{
    let cli_id = clidata.id
    let headers = {"Content-Type":"application/json"};
    
    let sesh = new URLSearchParams({
        $select:``,
        $expand:``,
        $filter:``
    })

    try {
        let {data:{value}} = await $.get(`/[relevant table]?${sesh.toString()}`);

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