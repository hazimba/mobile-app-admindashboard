import Twilio from "../../classes/twilio.mjs";
let tw = new Twilio();

/**
 * @param req.body.
 * 
 */

export default async (req, res) => {// eslint-disable-line
  let {body,title, eventDate,eventTime, scheduleDate, isEvent, group, admin} = req.body

  if (!group) {
    let data = await tw.putAnnouncementAll({body, title, eventDate,eventTime, isEvent, admin}, scheduleDate);
    res.send(data);
    return;
  }

  let data = await tw.putAnnouncementGroup({body, title, eventDate, eventTime, isEvent, group, admin}, scheduleDate);
  res.send(data);
  return;

};
