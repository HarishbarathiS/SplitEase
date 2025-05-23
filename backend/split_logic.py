from collections import defaultdict
from collections import OrderedDict

class Transaction:
    def __init__(self, payer, receipent, amt):
        self.payer = payer
        self.receipent = receipent
        self.amt = amt


class ExpenseSplitter:
    def __init__(self, total_members : int, items : dict, tax = 0):
        self.total_members = total_members
        self.items = items
        self.payer_share_to_item = defaultdict(dict)
        self.tax = tax
        self.payer_to_total_share = OrderedDict()
        self.contribution = OrderedDict()
        self.members = []
    
    def split_by_items(self,item_to_payers : defaultdict):
        
        tax_share = round(self.tax / self.total_members,2)
        for item, payers in item_to_payers.items():
            number_of_payers = len(payers)
            share = round(self.items[item] / number_of_payers,2)
            for payer in payers:
                self.payer_share_to_item[payer][item] = share
        # print(self.payer_share_to_item)
        
        # total_amt = 0
        for name, items in self.payer_share_to_item.items():
            total_share = 0
            for _,share in items.items():
                # total_amt += share
                total_share += share
            self.payer_to_total_share[name] = round(total_share + tax_share,2)
        # print(self.payer_share_to_item)
        # print(self.payer_to_total_share)
        
    def calculateTransactions(self, contribution, members):
        self.members = members
        self.payer_to_total_share = OrderedDict(sorted(self.payer_to_total_share.items(), key=lambda x: x[1]))
        self.contribution = OrderedDict(sorted(contribution.items(), key=lambda x: x[1]))
        # print(self.contribution)
        
        net_balance = OrderedDict()
        
        for member in self.members:
            if member in self.payer_to_total_share.keys():
                if member in self.contribution.keys():
                    net_balance[member] = round(self.contribution[member] - self.payer_to_total_share[member],2)
                else:
                    net_balance[member] = -self.payer_to_total_share[member]
        # print(net_balance)
        
        net_balance = OrderedDict(sorted(net_balance.items(), key=lambda x: x[1]))   
        print(net_balance)
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
        
        
        
# # Case 1 : 1 member pays the total_amt and equal split


# items = {"pasta" : 200 , "pizza" : 350}
# item_to_payers = {"pizza" : {"harish","amma","naveen","appa"}, "pasta" : {"harish","naveen","appa","amma"}}
# tax = 97.8 
# total_members = 4
# contribution = OrderedDict({"harish" : 550})
# members = ["harish","amma","appa","naveen"]

# obj = ExpenseSplitter(total_members,items,tax)
# obj.split_by_items(item_to_payers)
# obj.calculateTransactions(contribution, members)

# Case 2 : 1 member pays the total_amt and unequal split


# items = {"pasta" : 200 , "pizza" : 350}
# item_to_payers = {"pizza" : {"harish","naveen","appa"}, "pasta" : {"appa","amma"}}
# tax = 97.8 
# total_members = 4
# contribution = OrderedDict({"harish" : 550})
# members = ["harish","amma","appa","naveen"]

# obj = ExpenseSplitter(total_members,items,tax)
# obj.split_by_items(item_to_payers)
# obj.calculateTransactions(contribution, members)

# Case 3 : Multiple members pay the total_amt and equal split


# items = {"pasta" : 200 , "pizza" : 350}
# item_to_payers = {"pizza" : {"harish","amma","naveen","appa"}, "pasta" : {"harish","naveen","appa","amma"}}
# tax = 97.8 
# total_members = 4
# contribution = OrderedDict({"harish" : 200, "naveen" : 100, "amma" : 250})
# members = ["harish","amma","appa","naveen"]


# obj = ExpenseSplitter(total_members,items,tax)
# obj.split_by_items(item_to_payers)
# obj.calculateTransactions(contribution, members)


# # Case 4 : Multiple member pay the total_amt and unequal split


items = {"pasta" : 200 , "pizza" : 350}
item_to_payers = {"pizza" : {"harish","naveen","appa"}, "pasta" : {"appa","amma"}}
tax = 97.8 
total_members = 4
contribution = OrderedDict({"harish" : 200, "naveen" : 100, "appa" : 250})
members = ["harish","amma","appa","naveen"]

        
obj = ExpenseSplitter(total_members,items,tax)
obj.split_by_items(item_to_payers)
obj.calculateTransactions(contribution, members)