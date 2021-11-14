// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './ColorAuction.sol';

contract ColorMinting is ColorAuction{

  function mint(string memory _color) public returns(string memory){
      require(_colorIndex[_color] != 0);
      colors.push(_color);
      uint _id = colors.length - 1;
      _mint(msg.sender, _id);
      colorIndexToOwners[_id] = msg.sender;
      _colorIndex[_color] = _id;
      return _color;
  }

}
