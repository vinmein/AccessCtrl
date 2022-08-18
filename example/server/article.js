"use strict";

class ArticleApiController {
	/**
	 * @apiType POST
	 * @apiKey Create Article
	 * @apiPath /api/i/article
	 * @apiGroup Article
	 * @apiPermission admin,moderator
	 */
	createArticle(req, res, next) {
		res.status(201).send({});
	}

	/**
	 * @apiPath PUT /api/i/article/:id
	 * @apiPermission admin,moderator
	 * @apiKey Update Article
	 * @apiGroup Article
	 */
	updateArticle(req, res, next) {
		res.status(200).send({});
	}

	/**
	 * @apiType GET
	 * @apiPath /api/i/article/:id
	 * @apiKey Get Article
	 * @apiGroup Article
	 * @apiPermission admin,moderator,user
	 */
	getArticle(req, res, next) {
		res.status(200).send({});
	}

	/**
	 * @apiType DELETE
	 * @apiPath /api/i/article/:id
	 * @apiKey Delete Article
	 * @apiGroup Article
	 * @apiPermission admin,moderator
	 */
	deleteArticle(req, res, next) {
		res.status(200).send(true);
	}
}
module.exports = ArticleApiController;