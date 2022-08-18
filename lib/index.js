"use strict";

const aclGenerator = require("./src/generateACL");
const permissionCheck = require("./src/permissionCheck");

module.exports = {
	generateACL: aclGenerator,
	initAcl: permissionCheck.config,
	verifyPermission: permissionCheck.verify
};