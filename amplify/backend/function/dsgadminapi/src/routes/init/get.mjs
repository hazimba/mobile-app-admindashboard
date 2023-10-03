const {MS_APP_ID,MS_APP_SECRET,TENANT_ID,DATAVERSE_DOMAIN, DATAVERSE_VERSION} = process.env;
import axios from 'axios';
import * as msal from "@azure/msal-node";

const clientConfig = {
    auth: {
        clientId: MS_APP_ID,
        clientSecret: MS_APP_SECRET,
        authority: `https://login.microsoftonline.com/${TENANT_ID}`
    }
};

const cca = new msal.ConfidentialClientApplication(clientConfig);

export default async (req, res)=>{

    let {accessToken} = await cca.acquireTokenByClientCredential({
        scopes: [`https://${ DATAVERSE_DOMAIN}/.default`],
        skipCache: true
    });
    const baseURL = `https://${DATAVERSE_DOMAIN}/api/data/${DATAVERSE_VERSION}/`;
    let $ = axios.create({
        baseURL,
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'OData-MaxVersion': '4.0',
            'OData-Version': '4.0',
            'Authorization':'Bearer '+ accessToken,
            'Prefer': 'return=representation'
        }
    })
    let params = new URLSearchParams({$select: `crb5c_name, crb5c_value, crb5c_configurationname, crb5c_configurationdescription, crb5c_valuetype`});
    let {data} = await $.get(`/crb5c_configs?${params.toString()}`); 

    res.json({
        MS_APP_ID,TENANT_ID,DATAVERSE_DOMAIN,DATAVERSE_VERSION, ready: true,
        config: data?.value
    })
}