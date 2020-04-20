pragma solidity >=0.4.22 <0.7.0;

import "./Point.sol";

contract StandardPoint is Point {

function transferFrom(string _from, string _to, uint256 _value) returns (bool success) {
      require(balances[_from] >= _value);
      require(_value > 0);

      balances[_from] -= _value;
      balances[_to] += _value;
      Transfer(_from, _to, _value);
      return true;
    }
    function extinct (string _from, uint256 _value) returns (bool success) {
          require(balances[_from] >= _value);
         require(_value > 0);

         balances[_from] -= _value;
         totalSupply -= _value;
         return true;

    }

    function supply(uint256 _value) returns (bool success) {
      require(_value > 0);

      balances[fundsUser] += _value;
      totalSupply += _value;
      return true;

    }


    function balanceOf(string user) constant returns (uint256 balance) {
    }

    function approve(string _spender, uint256 _value) returns (bool success) {
      allowed["owner"][_spender] = _value;
           Approval("owner", _spender, _value);
           return true;
    }

    function allowance(string _owner, string _spender) constant returns (uint256 remaining) {
    }

    mapping (string => uint256) balances;
    mapping (string => mapping (string => uint256)) allowed;
    uint256 public totalSupply;
}
