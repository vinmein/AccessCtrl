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
		// 1. Insert the new article into db
		const newDbArticle = this.articleDbDriver.insert(req.body);
		// 2. Respond with the new article
		res.status(201).send(newDbArticle);
	}

	/**
	 * @apiPath PUT /api/i/article/:id
	 * @apiPermission admin,moderator
	 * @apiKey Update Article
	 * @apiGroup Article
	 */
	updateArticle(req, res, next) {
		// 1. Update the article in the db
		const updatedDbArticle = this.articleDbDriver.updateById(req.params.id, req.body);
		// 2. Respond with the new article
		res.status(200).send(updatedDbArticle);
	}

	/**
	 * @apiType GET
	 * @apiPath /api/i/article/:id
	 * @apiKey Get Article
	 * @apiGroup Article
	 * @apiPermission admin,moderator,user
	 */
	getArticle(req, res, next) {
		// 1. Insert the user into db
		const dbArticle = this.articleDbDriver.getById(req.params.id);
		// 2. Respond with the article
		res.status(200).send(dbArticle);
	}

	/**
	 * @apiType DELETE
	 * @apiPath /api/i/article/:id
	 * @apiKey Delete Article
	 * @apiGroup Article
	 * @apiPermission admin,moderator
	 */
	deleteArticle(req, res, next) {
		// 1. Delete the article by its id
		this.articleDbDriver.deleteById(req.params.id);
		// 2. Respond with true
		res.status(200).send(true);
	}
}
module.exports = ArticleApiController;