//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// MOCKTOKENERC20 DEPLOYED AT 0xA5a6752F244a34Ff9010Ae7F2C8dFEeA615576e1

contract MockERC20 is ERC20 {
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 supply
    ) ERC20(_name, _symbol) {
        _mint(msg.sender, supply * 10 ** decimals());
    }

    function mint() public {
        _mint(msg.sender, 100 * 10 ** decimals()); // Al mintear, se reciben 100 tokens
    }
}