import os, sys
import re
from datetime import date
from algoliasearch.search_client import SearchClient

# get articles from blog

path = "/home/ec2-user/environment/blog/content/aws"
dirs = os.listdir( path )

tiexp = 'title = "(.+?)"'
tgexp = 'tags = \[(.+?)\]'
dtexp = 'date = "(.+?)"'
coexp = '\n[+]{3}\n(.*)'

articles = []

for filename in dirs:
    fpt = os.path.join(path, filename)
    fop = open(fpt, 'r')
    fco = fop.read()
    
    mat = re.search(tiexp, fco)
    if mat:
        title = mat.group(1)
        
    mat = re.search(tgexp, fco)
    if mat:
        found = mat.group(1)
        tags = [stg.replace('"', '').strip() for stg in found.split(',')]
        
    mat = re.search(dtexp, fco)
    if mat:
        found = mat.group(1)
        dte = date.fromisoformat(found)
    
    mat = re.search(coexp, fco, flags=re.DOTALL)
    if mat:
        fco = mat.group(1)
    
    articles.append({
        'filename': filename,
        'title': title,
        'tags': tags,
        'date': dte,
        'content': fco,
    })
    
# put articles to algolia

client = SearchClient.create('xxxx', 'xxxxx')
index = client.init_index('articles')

res = index.save_objects(articles, {'autoGenerateObjectIDIfNotExist': True})

index.set_settings({
    'customRanking': [
        'desc(relevance)'
    ]
})

print(res)