
for _ in range(int(input())):
	n = int(input())
	a = list(map(int,input().split()))
	a.sort()
	ans = 0
	x = 0 
	for i in a:
		if i>x:
			x = i
		else:
			x+=1
		ans+=x
	print(ans)