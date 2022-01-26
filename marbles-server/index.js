var express = require("express");
var cors = require("cors");
var osUtils = require('os-utils');
var dateServer = express();
var cpuServer = express();

dateServer.use(cors())

dateServer.listen(3000, () => {
 console.log("Server running on port 3000");
});

dateServer.get("/date", (req, res, next) => {
    res.json({'now': Date.now()});
});

cpuServer.use(cors())

cpuServer.listen(3001, () => {
 console.log("Server running on port 3001");
});

cpuServer.get("/cpu", (req, res, next) => {
    osUtils.cpuUsage((v) => {
        res.json({'cpu': v});
    });
});
