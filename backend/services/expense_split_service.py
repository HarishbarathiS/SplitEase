from collections import defaultdict
from collections import OrderedDict

class Transaction:
    def __init__(self, payer, recipient, amt):
        self.payer = payer
        self.recipient = recipient
        self.amt = amt


class ExpenseSplitter:
    def __init__(self, members):
        self.payer_to_total_share = OrderedDict()
        self.members = members
        self.contribution = OrderedDict()
    
    def calculate_shares_for_expense(self, item_to_payers : defaultdict, items : dict, paraticipants : list):

        payer_share_to_item = defaultdict(dict)

        for item, payers in item_to_payers.items():
            number_of_payers = len(payers)
            share = round(items[item] / number_of_payers,2)
            for payer in payers:
                payer_share_to_item[payer][item] = share
        
        for paraticipant in paraticipants:
            if paraticipant in payer_share_to_item.keys():
                total_share = 0
                for _,share in payer_share_to_item[paraticipant].items():
                    total_share += share
                self.payer_to_total_share[paraticipant] = self.payer_to_total_share.get(paraticipant, 0.0) + round(total_share,2)
            else:
                self.payer_to_total_share[paraticipant] = 0.0
        # print(payer_share_to_item)
        # print(self.payer_to_total_share)
        
    def calculate_transactions(self, contribution : OrderedDict, tax : int, paraticipants : list):
        self.payer_to_total_share = OrderedDict(sorted(self.payer_to_total_share.items(), key=lambda x: x[1]))
        contribution = OrderedDict(sorted(contribution.items(), key=lambda x: x[1]))
        
        
        net_balance = OrderedDict()
        tax_share = round(tax / len(paraticipants), 2)
        
        for paraticipant in paraticipants:
            if paraticipant in self.payer_to_total_share.keys():
                if paraticipant in contribution.keys():
                    self.contribution[paraticipant] = self.contribution.get(paraticipant, 0.0) + contribution[paraticipant]
                    net_balance[paraticipant] = round(self.contribution[paraticipant] - self.payer_to_total_share[paraticipant] - tax_share,2)
                else:
                    net_balance[paraticipant] = -self.payer_to_total_share[paraticipant] - tax_share
        
        net_balance = OrderedDict(sorted(net_balance.items(), key=lambda x: x[1]))   
        # print(net_balance)
        low = 0
        high = len(net_balance) - 1
        names = list(net_balance.keys())
        balance = list(net_balance.values())
        transactions = []
        while low < high:
            if -balance[low] > balance[high]:
                obj = Transaction(names[low], names[high], round(balance[high],2))
                transactions.append(obj)
                balance[low] += balance[high]
                balance[high] = 0.0
                high -= 1                
            elif balance[high] > -balance[low]:
                obj = Transaction(names[low], names[high], round(-balance[low],2))
                transactions.append(obj)
                balance[high] += balance[low]
                balance[low] = 0.0
                low += 1 
            else:
                obj = Transaction(names[low], names[high], round(balance[high],2))
                transactions.append(obj)
                balance[low] = 0.0
                balance[high] = 0.0
                low += 1
                high -= 1
        
        for transaction in transactions:
            print(f"{transaction.payer} owes {transaction.receipent} {transaction.amt}")
    

def get_transactions(paraticipants : list, items : dict, items_to_payers : defaultdict, contribution : OrderedDict, tax : int):
    