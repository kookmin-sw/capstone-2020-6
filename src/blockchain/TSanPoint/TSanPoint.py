from web3 import Web3
import json
import binascii

def str_to_num(abc):
    num = 0
    a = [ord(i) for i in abc]
    for i in a:
        num = (num<<8)+i
    return num

####SETTING
ABI = '[{"constant": true, "inputs": [], "name": "name", "outputs": [{"name": "", "type": "bytes32"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "totalSupply", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": false, "inputs": [{"name": "_from", "type": "bytes32"}, {"name": "_to", "type": "bytes32"}, {"name": "_value", "type": "uint256"}], "name": "transferFrom", "outputs": [{"name": "success", "type": "bool"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": true, "inputs": [], "name": "decimals", "outputs": [{"name": "", "type": "uint8"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": false, "inputs": [{"name": "_value", "type": "uint256"}], "name": "supply", "outputs": [{"name": "success", "type": "bool"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": true, "inputs": [], "name": "fundsUser", "outputs": [{"name": "", "type": "bytes32"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": false, "inputs": [{"name": "_spender", "type": "bytes32"}, {"name": "_value", "type": "uint256"}], "name": "approve", "outputs": [{"name": "success", "type": "bool"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": true, "inputs": [], "name": "version", "outputs": [{"name": "", "type": "bytes32"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": false, "inputs": [{"name": "number", "type": "uint256"}, {"name": "_from", "type": "bytes32"}, {"name": "_to", "type": "bytes32[]"}, {"name": "_value", "type": "uint256[]"}], "name": "transferReward", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": true, "inputs": [{"name": "user", "type": "bytes32"}], "name": "balanceOf", "outputs": [{"name": "balance", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "symbol", "outputs": [{"name": "", "type": "bytes32"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "ownerAdr", "outputs": [{"name": "", "type": "address"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [{"name": "_owner", "type": "bytes32"}, {"name": "_spender", "type": "bytes32"}], "name": "allowance", "outputs": [{"name": "remaining", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": false, "inputs": [{"name": "_from", "type": "bytes32"}, {"name": "_value", "type": "uint256"}], "name": "extinct", "outputs": [{"name": "success", "type": "bool"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}, {"anonymous": false, "inputs": [{"indexed": true, "name": "_from", "type": "bytes32"}, {"indexed": true, "name": "_to", "type": "bytes32"}, {"indexed": false, "name": "_value", "type": "uint256"}], "name": "Transfer", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "name": "_owner", "type": "bytes32"}, {"indexed": true, "name": "_spender", "type": "bytes32"}, {"indexed": false, "name": "_value", "type": "uint256"}], "name": "Approval", "type": "event"}]'
ABI = json.loads(ABI)
##infura 연결
infura_url = "https://ropsten.infura.io/v3/63264f9ada7d4691a3333e445eddba49"
# print(ABI)
w3 = Web3(Web3.HTTPProvider(infura_url))

tx_hash ='0x8961afe33a042756fc4516ee9596c6276e4e597c3050b04ebae2ca0c3eaa40e3'
tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
contract_address = tx_receipt.contractAddress
contract = w3.eth.contract(contract_address, abi=ABI)

#####FUNCTIONS

print("check1")

##총 발행 Point 확인
def totalSupply():
    return contract.functions.totalSupply().call({'from': '0xA364820C7268C805604Fe7C98E613c4E17F68d21'})


##_user 잔액 확인
def balanceOf(_user):
    a = hex(int(str_to_num(_user)))
    return contract.functions.balanceOf(a).call({'from': '0xA364820C7268C805604Fe7C98E613c4E17F68d21'})
## Point 전송
def transferFrom(_from,_to,_value):
    acct = w3.eth.account.privateKeyToAccount('1EBA152E3D8A5CFDD002E203368A739D7CB6267A79B35322399700E5D9FE67E0')

    _from = hex(int(str_to_num(_from)))
    _to = hex(int(str_to_num(_to)))

    construct_txn = contract.functions.transferFrom(_from,_to,_value).buildTransaction({
        'from': acct.address,
        'nonce': w3.eth.getTransactionCount(acct.address),
        'gas': 60000,
        'gasPrice': w3.toWei('21', 'gwei')})
    signed = acct.signTransaction(construct_txn)
    w3.eth.sendRawTransaction(signed.rawTransaction)

    return 'transferFrom';

def transferReward(_from,_data):
    acct = w3.eth.account.privateKeyToAccount('1EBA152E3D8A5CFDD002E203368A739D7CB6267A79B35322399700E5D9FE67E0')

    _from = hex(int(str_to_num(_from)))
    _to = list(_data.keys())
    _to = [hex(int(str_to_num(i))) for i in _to]
    _value = list(_data.values())

    construct_txn = contract.functions.transferReward(len(_to),_from,_to,_value).buildTransaction({
        'from': acct.address,
        'nonce': w3.eth.getTransactionCount(acct.address),
        'gas':1000000,
        'gasPrice': w3.toWei('21', 'gwei')})
    signed = acct.signTransaction(construct_txn)
    w3.eth.sendRawTransaction(signed.rawTransaction)

    return 'transfer';

## Point 생성
def supply(_value):
    acct = w3.eth.account.privateKeyToAccount('1EBA152E3D8A5CFDD002E203368A739D7CB6267A79B35322399700E5D9FE67E0')
    # gas = contract.functions.supply(_value).estimateGas()

    construct_txn = contract.functions.supply(_value).buildTransaction({
        'from': acct.address,
        'nonce': w3.eth.getTransactionCount(acct.address),
        'gas': 60000,
        'gasPrice': w3.toWei('21', 'gwei')})
    signed = acct.signTransaction(construct_txn)
    w3.eth.sendRawTransaction(signed.rawTransaction)
    return 'approve';

# Point 소멸
def extinct(_from,_value):
    acct = w3.eth.account.privateKeyToAccount('a96580eb08a2a600911fa5b98a00fb6faf7417834131f81c070d804c45bc2729')

    construct_txn = contract.functions.extinct(_from,_value).buildTransaction({
        'from': acct.address,
        'nonce': w3.eth.getTransactionCount(acct.address),
        'gas': 60000,
        'gasPrice': w3.toWei('21', 'gwei')})
    signed = acct.signTransaction(construct_txn)
    w3.eth.sendRawTransaction(signed.rawTransaction)
    return 'extinct';
