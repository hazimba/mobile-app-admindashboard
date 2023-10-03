//import identity from "../../classes/identity.mjs"; //where the caregiver id is extracted
import msgraph from "../../classes/msgraph.mjs";
export default async (req, res)=>{
    console.log("getting session info");
    

    let $ = await msgraph.new_client();
    let care = new URLSearchParams({
        $select:`crb5c_no,crb5c_photo`,
    })

    let cgLinksParam = new URLSearchParams({
        $select: 'crb5c_name',
        $expand: `crb5c_Client($select=crb5c_no,crb5c_fow_customerid),crb5c_Caregiver($select=crb5c_name)`, //name, id and image of client
      });
      let {
        data: { value: cgLinks },
      } = await $.get(`/crb5c_clientcaregiverbridgetables?${cgLinksParam.toString()}`);

    try {
        let {data:{value}} = await $.get(`/crb5c_fow_customers?${care.toString()}`);
        let {data:{value: value2}} = await $.get(`/crb5c_fow_caregivers?$select=crb5c_name`);

        let resD = {
            cli_list: value,
            cg_list: value2,
            cgLinks
        }

        res.json(resD);
    } catch (error) {
        let resD = {
                err:error.response.data
            }
        res.json(resD);
    }

    
        return;
       
}
