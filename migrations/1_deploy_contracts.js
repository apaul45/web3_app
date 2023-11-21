// Migration files help deploy contracts to eth network
// Staging deployment tasks

var TodoList = artifacts.require("./TodoList");

module.exports = function (deployer) {
  deployer.deploy(TodoList);
};
