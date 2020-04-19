pragma solidity >=0.4.22 <0.7.0;

contract Point {
    string public fundsUser;           // Where should the raised ETH go?

    /// @return total amount of tokens
    function totalSupply() constant returns (uint256 supply) {}

    //포인트 확인
    function balanceOf(string user) constant returns (uint256 balance) {}

    //포인트 생성
    function supply(uint256 _value) returns (bool success) {}

    //포인트 분배
    // function transfer(string _to, uint256 _value) returns (bool success) {}

    //포인트 전송
    function transferFrom(string _from, string _to, uint256 _value) returns (bool success) {}

    //포인트 소멸
    function extinct(string _from, uint256 _value) returns (bool success) {}

    /// @notice `msg.sender` approves `_addr` to spend `_value` tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _value The amount of wei to be approved for transfer
    /// @return Whether the approval was successful or not
    function approve(string _spender, uint256 _value) returns (bool success) {}

    /// @param _owner The address of the account owning tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @return Amount of remaining tokens allowed to spent
    function allowance(string _owner, string  _spender) constant returns (uint256 remaining) {}

    event Transfer(string indexed _from, string indexed _to, uint256 _value);
    event Approval(string indexed _owner, string indexed _spender, uint256 _value);

}
