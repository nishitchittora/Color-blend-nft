
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract ColorAccessControl {
    address public admin;

    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    function setAdmin(address _newAdmin) external onlyAdmin {
        require(_newAdmin != address(0));

        admin = _newAdmin;
    }
}
