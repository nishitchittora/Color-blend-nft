// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Color is ERC721{
    address public admin;

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
    constructor() ERC721("ColorBlender", "CB"){

    }

    function totalSupply() public view returns (uint) {
        return colors.length;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    function setAdmin(address _newAdmin) external onlyAdmin {
        require(_newAdmin != address(0));

        admin = _newAdmin;
    }

    function mint(string memory _color) public returns(string memory){
        require(_colorIndex[_color] != 0);
        colors.push(_color);
        uint _id = totalSupply() - 1;
        _mint(msg.sender, _id);
        colorIndexToOwners[_id] = msg.sender;
        _colorIndex[_color] = _id;
        return _color;
    }

    function getAllColors(address _owner) public view returns(string[] memory){
        uint totalCount = totalSupply();
        uint j = 0;
        string[] memory _colors = new string[](totalCount);
        for(uint i=1; i < totalCount; i++){
            if(colorIndexToOwners[i] == _owner){
                _colors[j] = colors[i];
                j++;
            }
        }
        return colors;
    }

}
