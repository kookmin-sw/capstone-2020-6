pragma solidity >=0.4.22 <0.7.0;

import "./StandardPoint.sol";

contract TSANPoint is StandardPoint { // CHANGE THIS. Update the contract name.

    string public name;                   // Point Name
    uint8 public decimals;                // How many decimals to show. To be standard complicant keep it 18
    string public symbol;                 // An identifier: eg SBX, XPR etc..
    string public version = 'T1.0';

    // uint256 public unitsOneEthCanBuy;     // How many units of your coin can be bought by 1 ETH?
    // uint256 public totalEthInWei;         // WEI is the smallest unit of ETH (the equivalent of cent in USD or satoshi in BTC). We'll store the total ETH raised via our ICO here.

    // This is a constructor function
    // which means the following function name has to match the contract name declared above
    constructor() {
        fundsUser = "owner";
        balances[fundsUser] = 1000000000000000000000;               // Give the creator all initial tokens. This is set to 1000 for example. If you want your initial tokens to be X and your decimal is 5, set this value to X * 100000. (CHANGE THIS)
        totalSupply = 1000000000000000000000;                        // Update total supply (1000 for example) (CHANGE THIS)
        name = "TSanPoint";                                   // Set the name for display purposes (CHANGE THIS)
        decimals = 18;                                               // Amount of decimals for display purposes (CHANGE THIS)
        symbol = "TP";                                          // The owner of the contract gets ETH
    }


}
