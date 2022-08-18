"use strict";

const express = require("express");
const accessCtrl = require("../lib/index");
const app = express();
const aclConfig = require("./acl.json");

const PORT = process.env.PORT;
app.set("port", PORT || 3100);

const rank = [
    { role: "user", priority: 3 },
    { role: "moderator", priority: 2 },
    { role: "admin", priority: 1 },
  ];
  
const list = accessCtrl.generateACL({
	source: "server/**/*.js"
});
accessCtrl.initAcl(rank, aclConfig)
const status = accessCtrl.verifyPermission(["user"], '/api/i/article"', "POST");
console.log(status)

// Listen for incoming HTTP requests.
app.listen(PORT);
