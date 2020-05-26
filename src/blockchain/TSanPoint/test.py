import TSanPoint

#발행된 포인트 총량 확인
print(TSanPoint.totalSupply())

#남은 포인트 확인
print(TSanPoint.balanceOf('owner'))

print(TSanPoint.balanceOf('kookmin'))

##전송
TSanPoint.transferFrom('owner','kookmin',100)

##생성
TSanPoint.supply(1000)
