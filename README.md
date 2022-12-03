
# AccessCtrl
AccessCtrl library to generate standard configuration based on the API resource comments to secure API access and also provide a method to verify that incoming request has the permission to access the resource or not.



## License
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
## Features

- ACL Configuration Generator
- Resource level Access Verification


## Installation

```bash
  npm i accessctrl --save
```
    

## Usage/Examples

### Generate Access configuration JSON
```javascript
    /**
	 * @apiType POST
	 * @apiKey Create User
	 * @apiPath /api/i/user
	 * @apiGroup User
	 * @apiPermission admin
	 */
```

| Parameter | Description                |
| :-------- | :------------------------- |
| @apiType| **Required**. Methods GET, POST, PATCH, DELETE |
| @apipKey  | Unique Reference String     |
| @apiPath | **Required**. Resource Path |
| @apiGroup | **Required**. Resource Group, unique Value |
| @apiPermission | **Required**. comma seperated string e.g: admin,user,moderator|

### Usage
```javascript
    const list = accessCtrl.generateACL({
        source: "server/**/*.routes.js"  //location of the routes/controller
    });
```

### Output
```bash
  Generated Successfully
```

### Verify JSON

#### Prerequisite
Need Role priority

```javascript
  const rank = [
    { role: "user", priority: 3 },
    { role: "moderator", priority: 2 },
    { role: "admin", priority: 1 },
  ];
```

| Parameter | Description                |
| :-------- | :------------------------- |
| userRole| **Required**. ["user"] |
| requestPath  | **Required**. '/api/i/article"' Current request resource path  |
| requestMethod | **Required**. "POST" Current Request method |

### Usage
```javascript
    const accessCtrl = require("accessctrl");
    const aclConfig = require("./acl.json");

    accessCtrl.initAcl(rank, aclConfig)
    const status = accessCtrl.verifyPermission( userRole, requestPath, requestMethod);
```

### Output
```bash
  true/false
```