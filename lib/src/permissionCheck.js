
const _ = require("lodash");
const checkAuth = require("../util/checkAuth");

class PermissionCheck {
    constructor(){
    }
    config(priority, acl){
        this.priority = priority;
        this.acl = acl
    }
  
    verify(roleList, path, method) {
        let check = true;
        const finalList = _.filter(this.priority, (ranking) => {
            return roleList.indexOf(ranking.role) > -1;
        });
        const sorted = _.sortBy(finalList, (o) => o.priority);
        const role = sorted.length > 0 ? sorted[0].role : "user";
        const byGroup = _.keyBy( this.acl, "group");
        if (byGroup[role].access && byGroup[role].access === "module") {
            const status = checkAuth(
              byGroup[role].permissions,
              path,
              method
            );
            if (status === "allow") {
              return check;
            }
            check = false
            return check;
          }
        return check;
    }

    static getInstance(conString) {
      if (!this.instance) {
        this.instance = new PermissionCheck();
      }
  
      return this.instance;
    }
  }


module.exports = new PermissionCheck()