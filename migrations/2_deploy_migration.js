const Color = artifacts.require("Color");
const ColorAccessControl = artifacts.require("ColorAccessControl");
const ColorBase = artifacts.require("ColorBase");
const ColorOwnership = artifacts.require("ColorOwnership");
const ColorAuction = artifacts.require("ColorAuction");
const ColorMinting = artifacts.require("ColorMinting");
const ColorCore = artifacts.require("ColorCore");


module.exports = function(deployer) {
    deployer.deploy(Color);
    deployer.deploy(ColorAccessControl);
    deployer.deploy(ColorBase);
    deployer.deploy(ColorOwnership);
    deployer.deploy(ColorAuction);
    deployer.deploy(ColorMinting);
    deployer.deploy(ColorCore);
};
