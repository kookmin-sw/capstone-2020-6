import TSanPoint

##배포된 포인트 총량 확인
print(TSanPoint.totalSupply())

##'owner'의 point 확인
print(TSanPoint.balanceOf('owner'))
print(TSanPoint.balanceOf('kookmin'))

##'owner'에서 'kookmin'으로 100포인트 보내기
print(TSanPoint.transfer('owner','kookmin',100))

##'owner'에 1000포인트 생성
print(TSanPoint.approve('owner',1000))
