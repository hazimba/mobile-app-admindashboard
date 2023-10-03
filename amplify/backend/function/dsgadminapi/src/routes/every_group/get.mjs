//import identity from "../../classes/identity.mjs"; //where the caregiver id is extracted
import msgraph from "../../classes/msgraph.mjs";
export default async (req, res)=>{
    console.log("getting session info");

    let $ = await msgraph.new_client();
    let care = new URLSearchParams({
        $select: "crb5c_session_id",
        $expand: "crb5c_FOW_Customer_session_schedule_crb5c($select=crb5c_no)"
    })

    try {
        let {data:{value}} = await $.get(`/crb5c_fow_session_schedules?${care.toString()}`);

        let resD = {
            sessions: value,
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
