import json

with open('assets/text/dares.txt', 'r') as file:
    data = file.read().replace('\n', '')

category_dictionary = {}
categories = data.split("#")

for category in categories:
    if len(category)<5 : continue
    lines = category.split(',')
    difficulty_dict = {"soft":[],'medium':[],"hard":[],"extreme":[]}
    for line in lines:
        ls = line.split('_s_')
        lm = line.split('_m_')
        lh = line.split('_h_')
        lx = line.split('_x_')
        if   len(ls) == 2: difficulty_dict["soft"].append(   ls[1])
        elif len(lm) == 2: difficulty_dict["medium"].append( lm[1])
        elif len(lh) == 2: difficulty_dict["hard"].append(   lh[1])
        elif len(lx) == 2: difficulty_dict["extreme"].append(lx[1])
    category_dictionary[lines[0]] = difficulty_dict

with open('assets/text/dares.json', 'w') as outfile:
    json.dump(category_dictionary, outfile)

print('complete')