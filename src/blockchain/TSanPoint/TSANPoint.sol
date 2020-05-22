contract Point {

      function totalSupply() constant returns (uint256 supply) {}

      function balanceOf(string user) constant returns (uint256 balance) {}

      function transfer(string _from, string _to, uint256 _value) returns (bool success) {}


      function approve(string _spender, uint256 _value) returns (bool success) {}

      function allowance(string _owner, string  _spender) constant returns (uint256 remaining) {}

      event Transfer(string indexed _from, string indexed _to, uint256 _value);
      event Approval(string indexed _owner, string indexed _spender, uint256 _value);
  }

  contract StandardPoint is Point {

      function transfer(string _from, string _to, uint256 _value) returns (bool success) {
          if (balances[_from] >= _value && _value > 0) {
              balances[_from] -= _value;
              balances[_to] += _value;
              Transfer(_from, _to, _value);
              return true;
          } else { return false; }
      }


      function balanceOf(string user) constant returns (uint256 balance) {
          return balances[user];
      }

      function approve(string _spender, uint256 _value) returns (bool success) {
          allowed["owner"][_spender] = _value;
          Approval("owner", _spender, _value);
          return true;
      }

      function allowance(string _owner, string _spender) constant returns (uint256 remaining) {
        return allowed[_owner][_spender];
      }

      mapping (string => uint256) balances;
      mapping (string => mapping (string => uint256)) allowed;
      uint256 public totalSupply;
  }

  contract TSANPoint is StandardPoint { // CHANGE THIS. Update the contract name.

  string public name;                   // Point Name
  uint8 public decimals;                // How many decimals to show. To be standard complicant keep it 18
  string public symbol;                 // An identifier: eg SBX, XPR etc..
  string public version = 'T1.0';
  string public fundsUser;           // Where should the raised ETH go?


  function TSANPoint() {
      balances["owner"] = 1000000000000000000000;               // Give the creator all initial tokens. This is set to 1000 for example. If you want your initial tokens to be X and your decimal is 5, set this value to X * 100000. (CHANGE THIS)
      totalSupply = 1000000000000000000000;                        // Update total supply (1000 for example) (CHANGE THIS)
      name = "TSanPoint";                                   // Set the name for display purposes (CHANGE THIS)
      decimals = 18;                                               // Amount of decimals for display purposes (CHANGE THIS)
      symbol = "TP";
      fundsUser = "owner";                                    // The owner of the contract gets ETH
  }


}
