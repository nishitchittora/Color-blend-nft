// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './ColorAccessControl.sol';


contract ColorBase is ColorAccessControl {

      /* struct Color{
          uint color_hex;
          uint64 birthTime;
          uint16 generation;
      } */

      string[] colors;

      // maps owner with color index
      mapping(uint => address) colorIndexToOwners;

      // index will start from 1
      mapping(string => uint) _colorIndex;

      function totalSupply() external  view returns (uint) {
          return colors.length;
      }

}
