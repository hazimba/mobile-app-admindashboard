import express from 'express';
import init from "./init/router.mjs";
import sms from "./sms/router.mjs";
import verify from "./verify/router.mjs";
import announcement from "./announcement/router.mjs";
import admin_init from "./admin_init/router.mjs";
import chat from "./chat/router.mjs";
import every_client from "./every_client/router.mjs";
import every_group from "./every_group/router.mjs";

const router = express.Router({mergeParams:true});

router.use("/init",init);
router.use("/sms", sms);
router.use("/verify",verify);
router.use("/announcement",announcement);
router.use("/admin_init",admin_init);
router.use("/chat",chat);
router.use("/every_client",every_client);
router.use("/every_group",every_group);

export default router