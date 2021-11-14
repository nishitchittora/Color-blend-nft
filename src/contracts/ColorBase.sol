pragma solidity ^0.8.0;
import './ColorAccessControl.sol';


contract ColorBase in ColorAccessControl {

      struct Color{
          uint color_hex;
          uint64 birthTime;
          uint16 generation;
      }

      Color[] colors;
      mapping(uint => address) colorIndexToOwners;
      
}
