"use strict";
const mapFiles = require("map-files");
const routeGen = require("../util/fetchRoutes");
const fs = require('fs');
const _ = require('lodash');

function generate(config, roles) {

    try {
        const { source: sourceFilesGlob } = config;
        const list = []
        mapFiles(sourceFilesGlob, {
            renameKey: file => generateList(file, list)
        });
        let apiCount = 0
        const apiList = {}
        _.map(list, (item) => {
            _.map(Object.keys(item), (key) => {
                const obj = item[key]
                if (key != "protection") {
                    apiList[key] = obj
                    apiCount = apiCount + obj.length
                }
            })
        });
        const roleBased = routeGen.roleBased(apiList)
        const aclList = routeGen.aclGenerate(roleBased, apiCount)
        writeJson(aclList, "acl.json")
        return "Generated Successfully"
    } catch (e) {
        throw e;
    }
    return list
}

function generateList(file, list) {
    const routes = routeGen.genRoutes(file);
    if (!routes) {
        return;
    }
    list.push(routes)

}

const writeJson = function (json, fileName) {
    json.protection = true;
    let content = {};
    content = JSON.stringify(json, null, 4);
    fs.writeFileSync(fileName, content);
};

module.exports = generate