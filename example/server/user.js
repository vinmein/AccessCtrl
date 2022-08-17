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
		// 1. Insert the new article into db
		const newDbArticle = this.articleDbDriver.insert(req.body);
		// 2. Respond with the new article
		res.status(201).send(newDbArticle);
	}

}
module.exports = ArticleApiController;