
const _ = require("lodash");
function checkAuthorisation(ruleList, path, method){
    const status = _.map(ruleList, (o) => {
      let value;
      if (path.indexOf(o.resource) > -1) {
        if (o.action === "deny") {
          value = o.methods.indexOf(method) > -1 ? "deny" : "allow";
        } else if (o.action === "allow") {
          value = o.methods.indexOf(method) > -1 ? "allow" : "deny";
        }
        if (o.subResource) {
          let innerValue;
          _.map(o.subResource, (action) => {
            if (path.indexOf(action.resource) > -1) {
              if (action.action === "deny") {
                innerValue =
                  action.methods.indexOf(method) > -1 ? "deny" : "allow";
              } else if (action.action === "allow") {
                innerValue =
                  action.methods.indexOf(method) > -1 ? "allow" : "deny";
              }
            }
          });
          if (innerValue) {
            value = innerValue;
          }
        }
      }
  
      return value;
    });
    return status.indexOf("allow") > -1 ? "allow" : "deny";
  };

  module.exports = checkAuthorisation