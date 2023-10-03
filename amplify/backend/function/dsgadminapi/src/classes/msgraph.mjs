import axios from 'axios';
import * as msal from "@azure/msal-node";
const {MS_APP_ID,MS_APP_SECRET,TENANT_ID,DATAVERSE_DOMAIN, DATAVERSE_VERSION} = process.env;

const clientConfig = {
    auth: {
        clientId: MS_APP_ID,
        clientSecret: MS_APP_SECRET,
        authority: `https://login.microsoftonline.com/${TENANT_ID}`
    }
};
const cca = new msal.ConfidentialClientApplication(clientConfig);

export default class msgraph {
    $ = null;

    static async init() {
        let {accessToken} = await cca.acquireTokenByClientCredential({
            scopes: [`https://${ DATAVERSE_DOMAIN}/.default`],
            skipCache: true
        });
        const baseURL = `https://${DATAVERSE_DOMAIN}/api/data/${DATAVERSE_VERSION}/`;
        return axios.create({
            baseURL,
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'OData-MaxVersion': '4.0',
                'OData-Version': '4.0',
                'Authorization':'Bearer '+ accessToken,
                'Prefer': 'return=representation'
            }
        });
    }

    static async new_client() {
        return await msgraph.init();
    }
}