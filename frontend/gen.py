
abi = """
14
19
18
16
22
21
11
19
17
-6
27
20
24
4
-5
15
16
20
"""
ben = """
21
12
2
22
-2
8
19
21
10
24
14
29
11
18
13
17
19
10
"""

abi= [int(a) for a in abi.split()]
ben= [int(b) for b in ben.split()]

for i in range(len(abi)):
    print('{ "date": "Game ' + str(i+1) + '", "scores": { "Abi": ' + str(abi[i]) + ' , "Ben": ' + str(ben[i]) + ' } },')