__author__ = 'team18'
# Members:
#    - Shawn Fallon
#    - Luke Jones
#    - Ivan Sanchez
#    - Pablo Serrano
#    - Youhan Xia
# Description:
#   script for topic searching, sex related tweets


import json
import copy
import sys
import couchdb
from elasticsearch import Elasticsearch

couchserver = sys.argv[1] # 'http://115.146.87.51:5984/'
db_name = sys.argv[2] # 'brisbane_bali9'
couchlogin = sys.argv[3] # 'couchDB.txt' - space delineated login
elastic_index = sys.argv[4] # "last_stem_index_sentiment3"
elastic_doc_type = sys.argv[5] # "last_stemmed_tweets_sentiment3"
fileName = sys.argv[6] # "sex-terms.txt"

def main():


    baseQuery = open("query_sex.txt").read()

    es = Elasticsearch([{'host': '115.146.95.161', 'port': 9200}])

    couch = couchdb.Server(couchserver)
    username, password = get_login(couchlogin)
    couch.resource.credentials = (username, password)

    #check if database created if Exception create it
    try:
        db = couch[db_name]
    except Exception, e:
        db = couch.create(db_name)

    query_obj = json.loads(baseQuery)
    phrase_obj = query_obj['query']['bool']['should'].pop()

    with open(fileName) as tf:
        for term in tf:
            if term.lstrip(' ')[0] == '#':
                continue
            phrase_obj['match']['text']['query'] = term.rstrip()
            query_obj['query']['bool']['should'].append(copy.deepcopy(phrase_obj))

    query = json.dumps(query_obj)
    res = es.search(index=elastic_index, doc_type=elastic_doc_type, body=query)

    numHits = res['hits']['total']
    print numHits

    query_obj['size'] = numHits
    query = json.dumps(query_obj)
    res = es.search(index=elastic_index, doc_type=elastic_doc_type, body=query)

    for doc in res['hits']['hits']:
        tweet = doc['_source']
        if tweet['_id'] in db:
            continue
        # print tweet['text']
        # raw_input()
        db.save(tweet)

# Helper method to set the keys
def get_login(loginfile):
    with open(loginfile) as textfile:
        logins = textfile.readline().split()

        username = logins[0]
        password = logins[1]

    return username, password

if __name__ == '__main__':
    main()
    # print get_syn('controlled_substance.n.01')
