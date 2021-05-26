import os, sys
import re
from datetime import date

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
        content = mat.group(1)
        
    
    articles.append({
        'filename': filename,
        'title': title,
        'tags': tags,
        'date': dte,
        'content': content,
    })
    
print(articles[1])