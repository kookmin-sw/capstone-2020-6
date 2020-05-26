from web3 import Web3
from solc import compile_source
from web3.middleware import geth_poa_middleware

####SETTING
ABI = '[{"constant": true, "inputs": [], "name": "name", "outputs": [{"name": "", "type": "string"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "totalSupply", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "decimals", "outputs": [{"name": "", "type": "uint8"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [{"name": "user", "type": "string"}], "name": "balanceOf", "outputs": [{"name": "balance", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "fundsUser", "outputs": [{"name": "", "type": "string"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "version", "outputs": [{"name": "", "type": "string"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "symbol", "outputs": [{"name": "", "type": "string"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": false, "inputs": [{"name": "_from", "type": "string"}, {"name": "_to", "type": "string"}, {"name": "_value", "type": "uint256"}], "name": "transfer", "outputs": [{"name": "success", "type": "bool"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": true, "inputs": [{"name": "_owner", "type": "string"}, {"name": "_spender", "type": "string"}], "name": "allowance", "outputs": [{"name": "remaining", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": false, "inputs": [{"name": "_spender", "type": "string"}, {"name": "_value", "type": "uint256"}], "name": "approve", "outputs": [{"name": "success", "type": "bool"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}, {"anonymous": false, "inputs": [{"indexed": true, "name": "_from", "type": "string"}, {"indexed": true, "name": "_to", "type": "string"}, {"indexed": false, "name": "_value", "type": "uint256"}], "name": "Transfer", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "name": "_owner", "type": "string"}, {"indexed": true, "name": "_spender", "type": "string"}, {"indexed": false, "name": "_value", "type": "uint256"}], "name": "Approval", "type": "event"}]'
ABI = json.loads(ABI)

##infura 연결
infura_url = "https://ropsten.infura.io/v3/63264f9ada7d4691a3333e445eddba49"

w3 = Web3(Web3.HTTPProvider(infura_url))
w3.middleware_onion.inject(geth_poa_middleware, layer=0)

tx_hash ='0xd797f8f477252055108e524cbf286288e25d04c7179b3113ee048e846b7e2ca5'
tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
contract_address = tx_receipt.contractAddress
contract = w3.eth.contract(contract_address, abi=ABI)

#####FUNCTIONS

##총 발행 Point 확인
def totalSupply():
    return contract.functions.totalSupply().call({'from': '0xA364820C7268C805604Fe7C98E613c4E17F68d21'})

##_user 잔액 확인
def balanceOf(_user):
    return contract.functions.balanceOf(_user).call({'from': '0xA364820C7268C805604Fe7C98E613c4E17F68d21'})


## Point 전송
def transfer(_from,_to,_value):
    # acct = w3.eth.account.privateKeyToAccount('a96580eb08a2a600911fa5b98a00fb6faf7417834131f81c070d804c45bc2729')
    #
    # construct_txn = contract.functions.transfer(_from,_to,_value).buildTransaction({
    #     'from': acct.address,
    #     'nonce': w3.eth.getTransactionCount(acct.address),
    #     'gas': 4700000000000,
    #     'gasPrice': w3.toWei('21', 'gwei')})
    # signed = acct.signTransaction(construct_txn)
    # w3.eth.sendRawTransaction(signed.rawTransaction)
    return 'transfer';

## Point 생성
def approve(_spender,_value):
    # acct = w3.eth.account.privateKeyToAccount('a96580eb08a2a600911fa5b98a00fb6faf7417834131f81c070d804c45bc2729')
    #
    # construct_txn = contract.functions.approve(_spender,_value).buildTransaction({
    #     'from': acct.address,
    #     'nonce': w3.eth.getTransactionCount(acct.address),
    #     'gas': 4700000000000,
    #     'gasPrice': w3.toWei('21', 'gwei')})
    # signed = acct.signTransaction(construct_txn)
    # w3.eth.sendRawTransaction(signed.rawTransaction)
    return 'approve';

## Point 소멸
# def transfer(_from,_to,_value):
#     acct = w3.eth.account.privateKeyToAccount('a96580eb08a2a600911fa5b98a00fb6faf7417834131f81c070d804c45bc2729')
#
#     construct_txn = contract.functions.transfer(_from,_to,_value).buildTransaction({
#         'from': acct.address,
#         'nonce': w3.eth.getTransactionCount(acct.address),
#         'gas': 4700000000000,
#         'gasPrice': w3.toWei('21', 'gwei')})
#     signed = acct.signTransaction(construct_txn)
#     w3.eth.sendRawTransaction(signed.rawTransaction)

#     return true;
