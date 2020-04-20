pragma solidity >=0.4.22 <0.7.0;

import "./Point.sol";

contract StandardPoint is Point {
    }

    function extinct (string _from, uint256 _value) returns (bool success) {

    }

    function supply(uint256 _value) returns (bool success) {
    }


    function balanceOf(string user) constant returns (uint256 balance) {
    }

    function approve(string _spender, uint256 _value) returns (bool success) {
    }

    function allowance(string _owner, string _spender) constant returns (uint256 remaining) {
    }

    mapping (string => uint256) balances;
    mapping (string => mapping (string => uint256)) allowed;
    uint256 public totalSupply;
}
