const {TWILIO_ADMIN_PARTICIPANT_ID} = process.env;
import Twilio from '../../classes/twilio.mjs';
export default async (req, res) => {
    let tw = new Twilio();
    const token = tw.getChatToken(TWILIO_ADMIN_PARTICIPANT_ID);
    //const tw = new Twilio();

    res.json({
        token,
    });



    return;
}