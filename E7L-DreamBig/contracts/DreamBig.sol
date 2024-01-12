// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "erc721l/contracts/ERC721Linkable.sol";

contract DreamBig is ERC721Linkable {

    IERC721 public immutable parentContract;

    mapping(uint256 => LinkableToken) private _tokensInfo;
    
    address public owner;
    string private BASE_URI;
    uint256 private supply = 0;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        IERC721 _parentContract
    ) ERC721Linkable(_name, _symbol) {
        owner = tx.origin;
        parentContract = _parentContract;
        BASE_URI = "https://mrcrypto-sources.s3.eu-central-1.amazonaws.com/3-0/dream-big/dream-big";
    }
   
    function mint() public {
        supply++;
        _safeMint(msg.sender, supply);
    }

    function _baseURI() internal view override returns (string memory) {
        return BASE_URI;
    }
    
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireMinted(tokenId);
       
        return
            string(
                abi.encodePacked(_baseURI(), ".json")
            );
          
    }

    function tokenInfo(
        uint256 tokenId
    ) public view virtual override returns (LinkableToken memory) {
        require(_exists(tokenId) == true, "ERC721: invalid token ID");
        return _tokensInfo[tokenId];
    }

    function linkToken(
        uint256 tokenId,
        uint256 parentTokenId,
        IERC721
    ) external {
        _linkToken(tokenId, parentTokenId, parentContract);
    }

    function unlinkToken(uint256 tokenId) external {
        _unlinkToken(tokenId);
    }

    function changeURI(string memory baseURI_) public onlyOwner {
        BASE_URI = baseURI_;
    }
}

