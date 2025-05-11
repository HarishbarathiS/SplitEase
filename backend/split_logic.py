from collections import defaultdict
class ExpenseSplitterFromBill:
    def __init__(self,total_members, items : dict, tax = 0):
        self.total_members = total_members
        self.items = items
        self.payer_share_to_item = defaultdict(dict)
        self.tax = tax
        self.payer_to_total_share = dict()
    
    def split_by_items(self,item_to_payers : defaultdict):
        tax_share = round(self.tax / self.total_members,2)
        for item,payers in item_to_payers.items():
            number_of_payers = len(payers)
            share = round(self.items[item] / number_of_payers,2)
            for payer in payers:
                self.payer_share_to_item[payer][item] = share
        total_members_ate = len(self.payer_share_to_item)
        tax_split = self.tax / total_members_ate 
        print(self.payer_share_to_item)
        
        
        for name,items in self.payer_share_to_item.items():
            total_share = 0
            for _,share in items.items():
                total_share += share
            self.payer_to_total_share[name] = total_share
            
        print(self.payer_to_total_share)
        print(f"Tax share for each member : {tax_share}")
        
        

items = {"pasta" : 132.23 , "pizza" : 324.45}
item_to_payers = {"pizza" : {"harish","amma"}, "pasta" : {"harish","naveen","appa"}}
tax = 97.8 # (cgst + sgst)
total_members = 4
        
obj = ExpenseSplitterFromBill(total_members,items,tax)
obj.split_by_items(item_to_payers)