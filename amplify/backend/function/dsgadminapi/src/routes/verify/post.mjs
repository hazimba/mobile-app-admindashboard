import Identity from '../../classes/identity.mjs';

export default async (req, res) => {
  let { token, phone } = req.body
  try {
    const result = await Identity.check_mobile_otp(phone, token);
    console.log('valid', result)
    if (!result?.valid) {

      const userData = await Identity.get_user_from_ph(phone);
      const jwt = Identity.create_login(phone);

      res.send({ 
        success: true,
        jwt,
        userData
      });
    }

    res.json({
      success: true
    });
    return;
  } catch (e) {
    console.log('errr')
    res.json({
      success: false
    })
    return;
  }
};
