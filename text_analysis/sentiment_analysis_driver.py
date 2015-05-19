__author__ = 'team18'
# Members:
#    - Shawn Fallon
#    - Luke Jones
#    - Ivan Sanchez
#    - Pablo Serrano
#    - Youhan Xia
# Description:
#   script for sentiment analysis


import sys
import couchdb
import sentiment_analysis as sa
from collections import Counter
from textblob import TextBlob

couchlogin = sys.argv[1] #'/Users/lukejones/Developer/twitter_harvester/couchDB.txt' - space delineated login
couchserver = sys.argv[2] #'http://115.146.95.216:5984/' - as a string
dbfrom_name = sys.argv[3] #'brisbanetweets' as a string
dbto_name = sys.argv[4] #'brisbanetweets' as a string


def main():
    couch = couchdb.Server(couchserver)
    username, password = get_login(couchlogin)
    couch.resource.credentials = (username, password)

    #check if source database created if Exception create it
    try:
        dbfrom = couch[dbfrom_name]
    except Exception, e:
        exit(1)

    #check if target database created if Exception create it
    try:
        dbto = couch[dbto_name]
    except Exception, e:
        dbto = couch.create(dbto_name)

    # get the trained model for binary classifier
    classifier = sa.sent_anal_classifier()

    pos = 0
    neg = 0

    for doc in dbfrom:
        # ignore all tweets already in the target database
        # if doc in dbto:
        #     continue
        tweet = dbfrom[doc]

        # the binary label predicted
        labelBin = sa.predict_unlabeled(classifier, tweet['text'])
        if labelBin == 'pos':
            pos += 1
        else:
            neg += 1

        # continuous label predicted by textblob
        labelCont = TextBlob(tweet['text']).sentiment


        tweet['sentiment'] = labelBin
        tweet['sentiment_textblob'] = labelCont
        dbto.save(tweet)


# Helper method to set the keys
def get_login(loginfile):
    with open(loginfile) as textfile:
        logins = textfile.readline().split()

        username = logins[0]
        password = logins[1]

    return username, password


# Run the Main Method
if __name__ == '__main__':
    main()
