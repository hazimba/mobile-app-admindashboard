import Twilio from "../../classes/twilio.mjs";


export default async (req, res) => {// eslint-disable-line 
    const {action, msgid, title, body, eventDate, eventTime, isEvent, convId, groupName} = req.body;
    console.log("EDITING", {...req.body})
    if (!action || !msgid) {
        return;
    }

    let tw = new Twilio();
    if (action === "remove") {
        let data = await tw.removeAnnouncementAll(msgid, convId);
        res.send(data);
        return;
    }

    if (action === "edit") {
        let data = await tw.editAnnouncementAll({convId, msgid, title, body, eventTime, eventDate, isEvent, groupName});
        res.send(data);
        return;
    }
}