import json
from urllib.request import urlopen
from bs4 import BeautifulSoup

html = urlopen('https://merolagani.com/LatestMarket.aspx')
bs = BeautifulSoup(html.read(), 'lxml')
namelist = bs.find('div', {'id': 'ctl00_ContentPlaceHolder1_LiveTrading'})

childtag = namelist.find('table')
childchildtag = childtag.find('tbody')
gettrtag = childchildtag.find_all('tr')

data = {}
for elements in gettrtag:
    tdtag = elements.find_all('td')
    name = tdtag[0].text.strip()
    row_data = {
        'open': tdtag[1].text.strip(),
        'high': tdtag[2].text.strip(),
        'low': tdtag[3].text.strip(),
        'close': tdtag[4].text.strip(),
        'quantity': tdtag[5].text.strip()
    }
    data[name] = row_data

json_data = json.dumps(data, indent=4)

# Write JSON data to a file
with open('data.json', 'w') as file:
    file.write(json_data)
