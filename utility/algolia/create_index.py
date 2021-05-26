from algoliasearch.search_client import SearchClient

client = SearchClient.create('xxxx', 'xxxxx')
index = client.init_index('articles')

