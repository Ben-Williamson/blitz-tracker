import json

with open("../data/data.json", "r") as f:
    data = json.load(f)

def expectedScore(aELO, bELO):
    return 1 / (1 + 10**((bELO-aELO)/400))

aELO = 1000
bELO = 1000

for game in data["games"]:
    # print(game["scores"])
    Sa = game["scores"]["Abi"] > game["scores"]["Ben"]
    Sb = game["scores"]["Abi"] < game["scores"]["Ben"]

    aELO = aELO + 16 * (Sa - expectedScore(aELO, bELO))
    bELO = bELO + 16 * (Sb - expectedScore(bELO, aELO))

    print(aELO, bELO)