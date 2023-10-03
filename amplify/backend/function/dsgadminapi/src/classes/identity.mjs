import msgraph from './msgraph.mjs';
import twilio from 'twilio';
import {phone} from 'phone';
import jwt from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid';
const {LOGIN_SECRET,TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,TWILIO_VERIFY_SERVICE_ID} = process.env;
const twClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const normalize = (number)=>{
    let {phoneNumber} = phone(number);

    if(!phoneNumber){
        phoneNumber = phone(number, {country:"MY"}).phoneNumber
    }
    return phoneNumber
}

/* 
Flow:

1. User enters mobile phone and click Send OTP
2. Mobile phone number is checked in Caregiver database, if exists, proceed to step 3. If not, end here.
3. Send the OTP to the mobile phone number.
4. User enters the received OTP and click Login in the front-end.
5. The OTP + Mobile is sent over to Twilio's Verify endpoint. If passes, proceed to step 6. If not, end here.
6. Get the user data based on the mobile number from step 5.
7. Genrate JWT from data in step 6.
8. Send the JWT to front-end.
9. Subseqent requests, other than the SMS / Verify endpoints (which are unprotected by JWT verification), are protected with JWT verification.
*/

class identity{
    constructor(token){
        this.ready = this.login_check(token);
    }
    async login_check(token){
        try {
            let decoded = jwt.verify(token, LOGIN_SECRET, { audience: 'DSG Caregiver',issuer: "DSG Caregiver App"});
            let uuid = decoded.uuid;
            if(decoded.sub != `login-${uuid}`){
                throw "Invalid Token"
            }
            
            
            this.user = await identity.get_user_from_ph(uuid);
            this.user_id = uuid;
            
        } catch(err) {
            console.log(err);
            // err
            return;
        }
    }
    static async get_user_from_ph(phoneNumber){
        let $ = await msgraph.new_client();
        let params = new URLSearchParams({
            $filter: `crb5c_contactnumbermobile eq '${phoneNumber}'`,
        });
        let { data } = await $.get(`/crb5c_fow_caregivers?${params.toString()}`);
        return data?.value?.[0] || false;
    }
    static async check_uuid_mobile({c,n}){
        let user = await identity.get_user_from_ph(c);

        if(normalize(user.crf69_volunteerphonenumber)!= normalize(n)){
            throw "Invalid Mobile Number or Login Code";
        }
        return true;
    }
    static async check_mobile_otp(n,o){
        const phone = normalize(n);
        console.log('verifyinxg', phone, o)
        try{
            let verify = await twClient.verify.v2.services(TWILIO_VERIFY_SERVICE_ID).verificationChecks.create(
                {to: phone, code: o}
            );
            //console.log(verify);
            if(verify.status !="approved"){
                throw "Invalid or Expired Validation"
            }
        }catch(err){
            console.log(err);
            throw "Invalid or Expired Validation"
        }
        return true;
    }
    static create_login(phone){
        return identity.generate_jwt(phone);
    }
    static async request_otp(phone){

        try{
            let {status} = await twClient.verify.v2.services(TWILIO_VERIFY_SERVICE_ID)
            .verifications
            .create(
                {to: normalize(phone), channel: 'sms'}
            );
            if(status !='pending'){
                throw "Unable to Send verification code";
            }
        }catch(err){
            console.log(err);
            throw err
        }
        return true;

    }
    static generate_jwt(phone){
        return jwt.sign({phone},LOGIN_SECRET,{
            notBefore:0,
            audience:"DSG Caregiver",
            issuer:"DSG Caregiver App",
            jwtid:uuidv4(),
            subject:`login-${phone}`,
        })
    }





}

export default identity;