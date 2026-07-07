import re
import json

existing = [
    {"id": "potato", "name": "Potato", "kannada": "Aloo", "image": "/products/prod_1.png", "cat": "Root Vegetables"},
    {"id": "carrot", "name": "Carrot", "kannada": "Gajar", "image": "/products/prod_2.png", "cat": "Root Vegetables"},
    {"id": "radish", "name": "Radish", "kannada": "Mooli", "image": "/products/prod_3.png", "cat": "Root Vegetables"},
    {"id": "beetroot", "name": "Beetroot", "kannada": "", "image": "/products/prod_4.png", "cat": "Root Vegetables"},
    {"id": "tomato", "name": "Tomato", "kannada": "Tamatar", "image": "/products/tt.png", "cat": "Exotic Vegetables"},
    {"id": "eggplant", "name": "Eggplant", "kannada": "Baingan", "image": "/products/prod_6.png", "cat": "Exotic Vegetables"},
    {"id": "capsicum", "name": "Capsicum", "kannada": "Shimla Mirch", "image": "/products/prod_7.png", "cat": "Exotic Vegetables"},
    {"id": "okra", "name": "Okra", "kannada": "Bhindi", "image": "/products/prod_8.png", "cat": "Exotic Vegetables"},
    {"id": "peas", "name": "Green Peas", "kannada": "Matar", "image": "/products/prod_9.png", "cat": "Exotic Vegetables"},
    {"id": "beans", "name": "Beans", "kannada": "", "image": "/products/prod_10.png", "cat": "Exotic Vegetables"},
    {"id": "spinach", "name": "Spinach", "kannada": "Palak", "image": "/products/prod_14.png", "cat": "Leafy Vegetables"},
    {"id": "cabbage", "name": "Cabbage", "kannada": "Patta Gobhi", "image": "/products/prod_15.png", "cat": "Leafy Vegetables"},
    {"id": "cucumber", "name": "Cucumber", "kannada": "Kheera", "image": "/products/prod_16.png", "cat": "Gourds"},
    {"id": "pumpkin", "name": "Pumpkin", "kannada": "Kaddu", "image": "/products/prod_12.png", "cat": "Gourds"},
    {"id": "bitter_gourd", "name": "Bitter Gourd", "kannada": "Karela", "image": "/products/prod_17.png", "cat": "Gourds"},
    {"id": "bottle_gourd", "name": "Bottle Gourd", "kannada": "Lauki", "image": "/products/prod_18.png", "cat": "Gourds"},
    {"id": "ridge_gourd", "name": "Ridge Gourd", "kannada": "Turai", "image": "/products/prod_19.png", "cat": "Gourds"},
    {"id": "broccoli", "name": "Broccoli", "kannada": "", "image": "/products/prod_20.png", "cat": "Exotic Vegetables"}
]

# Create a fast lookup for existing items by lowercase name
existing_map = {}
for e in existing:
    # simplify the name for matching
    base = e['name'].lower().split(' / ')[0].strip()
    existing_map[base] = e

raw_list = """1	Tomato	ಟೊಮೇಟೊ
2	Potato	ಆಲೂಗಡ್ಡೆ
3	Onion	ಈರುಳ್ಳಿ
4	Brinjal (Eggplant)	ಬದನೆಕಾಯಿ
5	Okra (Lady's Finger)	ಬೆಂಡೆಕಾಯಿ
6	Bottle Gourd	ಸೊರೆಕಾಯಿ
7	Ridge Gourd	ಹೀರೇಕಾಯಿ
8	Snake Gourd	ಪಡವಲಕಾಯಿ
9	Bitter Gourd	ಹಾಗಲಕಾಯಿ
10	Ash Gourd	ಬೂದು ಕುಂಬಳಕಾಯಿ
11	Pumpkin	ಕುಂಬಳಕಾಯಿ
12	Ivy Gourd	ತೊಂಡೆಕಾಯಿ
13	Cucumber	ಸೌತೆಕಾಯಿ
14	Raw Banana	ಬಾಳೆಕಾಯಿ
15	Drumstick	ನುಗ್ಗೆಕಾಯಿ
16	Beans	ಬೀನ್ಸ್
17	Cluster Beans	ಗೊರವನಕಾಯಿ
18	Field Beans (Avarekai)	ಅವರೆಕಾಯಿ
19	Cowpea	ಅಲಸಂದೆ
20	French Beans	ಫ್ರೆಂಚ್ ಬೀನ್ಸ್
21	Cabbage	ಎಲೆಕೋಸು
22	Cauliflower	ಹೂಕೋಸು
23	Beetroot	ಬೀಟ್ರೂಟ್
24	Carrot	ಕ್ಯಾರೆಟ್
25	Radish	ಮೂಲಂಗಿ
26	Turnip	ಶಲ್ಗಂ
27	Sweet Potato	ಸಿಹಿ ಗೆಣಸು
28	Tapioca	ಮರಗೆಣಸು
29	Elephant Foot Yam	ಸೂರಣ
30	Colocasia (Arbi)	ಕೆಸುವಿನ ಗಡ್ಡೆ
31	Green Chilli	ಹಸಿಮೆಣಸಿನಕಾಯಿ
32	Capsicum	ದಪ್ಪ ಮೆಣಸಿನಕಾಯಿ
33	Sweet Corn	ಜೋಳ
34	Green Peas	ಬಟಾಣಿ
35	Garlic	ಬೆಳ್ಳುಳ್ಳಿ
36	Ginger	ಶುಂಠಿ
37	Spinach	ಪಾಲಕ್ ಸೊಪ್ಪು
38	Amaranth	ದಂಟಿನ ಸೊಪ್ಪು
39	Fenugreek Leaves	ಮೆಂತ್ಯ ಸೊಪ್ಪು
40	Dill Leaves	ಸಬ್ಬಸಿಗೆ ಸೊಪ್ಪು
41	Coriander Leaves	ಕೊತ್ತಂಬರಿ ಸೊಪ್ಪು
42	Curry Leaves	ಕರಿಬೇವು
43	Mint Leaves	ಪುದೀನಾ
44	Malabar Spinach	ಬಸಳೆ ಸೊಪ್ಪು
45	Banana Stem	ಬಾಳೆದಿಂಡು
46	Banana Flower	ಬಾಳೆಹೂವು
47	Raw Papaya	ಹಸಿ ಪಪ್ಪಾಯಿ
48	Cucumber	ಮಂಗಳೂರು ಸೌತೆ"""

def get_category(name):
    name = name.lower()
    if 'gourd' in name or 'pumpkin' in name or 'cucumber' in name:
        return 'Gourds'
    elif 'leaf' in name or 'leaves' in name or 'spinach' in name or 'amaranth' in name or 'cabbage' in name:
        return 'Leafy Vegetables'
    elif 'potato' in name or 'onion' in name or 'radish' in name or 'carrot' in name or 'turnip' in name or 'beetroot' in name or 'garlic' in name or 'ginger' in name or 'yam' in name or 'tapioca' in name or 'colocasia' in name:
        return 'Root Vegetables'
    else:
        return 'Exotic Vegetables'

lines = raw_list.split('\n')
products = []

for line in lines:
    parts = line.split('\t')
    if len(parts) >= 3:
        eng_name = parts[1].strip()
        kan_name = parts[2].strip()
        
        # Clean eng name
        search_name = eng_name.lower().split(' (')[0].strip()
        if search_name == 'brinjal':
            search_name = 'eggplant'
        if search_name == 'okra':
            search_name = 'okra'
            
        ex = existing_map.get(search_name)
        if not ex:
            # try finding partial match
            for k, v in existing_map.items():
                if k in search_name or search_name in k:
                    ex = v
                    break
        
        if ex:
            img = ex['image']
            cat = ex['cat']
        else:
            img = '/about.png' # temporary placeholder
            cat = get_category(eng_name)
            
        _id = eng_name.lower().replace(' ', '_').replace('(', '').replace(')', '').replace("'", "")
        # Add index to avoid duplicate cucumber ID
        _id = f"{_id}_{parts[0]}"

        obj = f"""  {{
    id: '{_id}',
    name: '{eng_name} ({kan_name})',
    price: 50,
    unit: 'kg',
    description: 'Fresh {eng_name}, delivered straight from the farm.',
    category: '{cat}',
    image: '{img}',
    inStock: true,
  }}"""
        products.append(obj)

final_ts = f"""export type Category = 'Root Vegetables' | 'Leafy Vegetables' | 'Gourds' | 'Exotic Vegetables';

export interface Product {{
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
  category: Category;
  image: string;
  inStock: boolean;
}}

export const vegetables: Product[] = [
{",\\n".join(products)}
];
"""

with open('src/data/vegetables.ts', 'w', encoding='utf-8') as f:
    f.write(final_ts)

print("Done generating!")
