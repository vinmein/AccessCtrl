"use strict";
const { parse } = require('comment-parser');
const _ = require("lodash");

function proccessTags(obj) {
	const filtered = _.filter(obj.tags, (obj) => {
		if (obj.tag === "apiPath" && ['GET', 'PUT', 'PATCH', 'DELETE', 'POST'].indexOf(obj.name) > -1) {
			return true
		}
	});

	const response = {}
	obj.tags.map(entry => {

		if (entry.tag === "apiPath") {
			if (filtered.length > 0) {
				response.path = entry.description
				response.method = entry.name;
			} else {
				response.path = entry.name
			}
		}
		if (entry.tag === "apiType") {
			response.method = entry.name;
		}
		if (entry.tag === "apiPermission") {
			response.permission = entry.name.split(',');
		}
	});

	return response;
}

function prepareObject(grouped, count) {
	const finalized = []
	_.map(Object.keys(grouped), (item) => {
		const apiList = grouped[item];
		const obj = {}
		obj.group = item;
		if (apiList.length === count) {
			obj.permissions = [
				{
					"resource": "*",
					"methods": "*",
					"action": "allow"
				}
			];
			obj.access = "*";
		} else if (apiList.length === 0) {
			obj.permissions = [
				{
					"resource": "*",
					"methods": "*",
					"action": "deny"
				}
			];
			obj.access = "*";
		} else {
			obj.permissions = [];
			_.map(apiList, (api) => {
				const apiObj = {
					"resource": api.path,
					"methods": [api.method],
					"action": "allow"
				}
				obj.permissions.push(apiObj)
			});
			obj.access = "module"
		}

		finalized.push(obj)
	})
	return finalized;
}

function PrepareRoleBased(list) {
	const groups = {}
	_.map(Object.keys(list), (item) => {
		const entry = list[item];
		entry.map((obj) => {
			obj.permission.map((group) => {
				if (!(group in groups)) {
					groups[group] = []
				}
				obj.key = item
				groups[group].push(obj)
			})
		})
	})
	return groups
}

function genControllerRoutes(file) {
	try {
		let fileComments;
		let parsed;
		if (file.content.includes("@apiPath")) {
			parsed = parse(file.content);
		} else {
			return;
		}
		const list = {}
		let count = 0
		parsed.map(obj => {
			obj.tags.map(tagObj => {
				if (tagObj.tag === "apiGroup") {
					count++;
					const name = tagObj.name.toLowerCase()
					if (!(name in list))
						list[name] = [];
					list[name].push(proccessTags(obj))
				}
			})
		})
		return list
	} catch (e) {
		throw e
	}
}

module.exports = {
	genRoutes: genControllerRoutes,
	aclGenerate: prepareObject,
	roleBased: PrepareRoleBased,
};