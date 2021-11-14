// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './ColorBase.sol';
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract ColorOwnership is ColorBase, ERC721 {

  constructor() ERC721("ColorBlender", "CB"){
  }

  function getAllColors(address _owner) public returns(string[] memory){
      /* string[] storage colors;
       for(uint i=1; i < totalSupply(); i++){
          if(colorIndexToOwners[i] == _owner){
              colors.push(colors[i]);
          }
      }
      return colors; */
  }

}
