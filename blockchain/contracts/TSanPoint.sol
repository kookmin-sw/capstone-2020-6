pragma solidity >=0.4.22 <0.7.0;

import "./StandardPoint.sol";

contract TSANPoint is StandardPoint { // CHANGE THIS. Update the contract name.

    string public name;                   // Point Name
    uint8 public decimals;                // How many decimals to show. To be standard complicant keep it 18
    string public symbol;                 // An identifier: eg SBX, XPR etc..
    string public version = 'T1.0';


}
