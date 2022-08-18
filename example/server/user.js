"use strict";

class UserApiController {
	/**
	 * @apiType POST
	 * @apiKey Create User
	 * @apiPath /api/i/user
	 * @apiGroup User
	 * @apiPermission admin
	 */
	createUser(req, res, next) {
		res.status(201).send({});
	}

}
module.exports = UserApiController;