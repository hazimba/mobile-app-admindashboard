<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    
    <router-view/> 

  </div>
</template>

<script>
import * as msal from "@azure/msal-browser";
import axios from 'axios'
export default {
  async mounted() {
        await this.init();
  },
  data() {
        return {
            logindata: { ready: false },
            msalApp: null,
            promptLogin: false,
        }
    },
  created() {
        this.reInitInterval = setInterval(
      () => (this.init(), console.log("reinit")),
      60000 * 4
    );
    },
  methods: {
    async login() {
      try {
        await this.msalApp.loginRedirect({
          scopes: [`https://${this.logindata.DATAVERSE_DOMAIN}/.default`],
          redirectUri: location.origin + "/home",
        });
        !this.$store.state.msalApp && this.msalApp
          ? this.$store.commit("msalApp", this.msalApp)
          : console.log("not");
        await this.$root.prepareAxios();

        this.promptLogin = false;
      } catch (e) {
        console.log(e);
      }
    },
    async init() {
      return axios.get("/api/init").then(async (rsp) => {
        this.logindata = rsp.data;
        this.$store.commit("logindata", rsp.data);
        const msalConfig = {
          auth: {
            clientId: this.logindata.MS_APP_ID,
            authority: `https://login.microsoftonline.com/${this.logindata.TENANT_ID}`,
          },
        };
        console.log(msalConfig, 'confff');
        let msalApp = (this.msalApp = new msal.PublicClientApplication(
          msalConfig
        ));
        let accounts = msalApp.getAllAccounts();
        console.log(accounts);
        if (accounts.length > 0) {
          msalApp.setActiveAccount(accounts[0]);
          this.$store.commit("msalApp", msalApp);
          await this.$root.prepareAxios();
        } else {
          msalApp
            .handleRedirectPromise()
            .then(async () => {
              // Check if user signed in
              const account = msalApp.getActiveAccount();
              this.$store.commit("msalApp", msalApp);
              await this.$root.prepareAxios();
              if (!account) {
                this.login();
              }
            })
            .catch(() => {
              this.login();
            });
          this.login();
        }

        return rsp;
      });
    },
  }
}
</script>

<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";

:root{
  --btn-color: rgb(118, 80, 137);
}

*{
  font-size: 16px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
