import Twilio from '../../classes/twilio.mjs'
export default async (req, res) => {
  const {chatRoomId, senderId, msg, admin} = req.body;

  const tw = new Twilio();
  const result = await tw.putMessageInConversation(chatRoomId, senderId, {body: msg, admin});
  res.json({
    result,
  });
  return;
};
