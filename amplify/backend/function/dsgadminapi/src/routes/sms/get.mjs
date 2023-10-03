import Identity from '../../classes/identity.mjs';

export default async (req, res) => {
  let phone = req.params.phone
  let output = {
    success: false
  };

  const result = await Identity.get_user_from_ph(phone);

  if (!result) {
    res.json(output);
    return;
  }

 




  try {
    await Identity.request_otp(phone);
  } catch (e) {
    output.error = e;
    res.json(output);
    return;
  }

  output.success = true;

  res.json(output);
};
