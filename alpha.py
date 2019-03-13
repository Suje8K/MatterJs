from urllib.request import Request, urlopen
from lxml import html
from urllib.parse import quote
import json

def scrapper(recentTweets, qryString, lang):
    # User Agent Headers
    hdrs = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'}
    url = "https://twitter.com/search?l={}".format(lang)
    # Build URL based on recent Tweet Flag
    if(recentTweets):
        url = url + "&q=%s&src=typed&f=tweets"
    else:
        url = url + "&q=%s&src=typed"
    url = url % (quote(qryString))
    request = Request(url, headers=hdrs)
    print('Done Fetching....')
    contents = urlopen(request)
    print('Done Response....')
    tree = html.fromstring(contents.read().decode('utf-8'))
    print('Parsed Data -> Now Extracting...')
    textOnlyTweets = tree.xpath('//li[@data-item-type="tweet"]/div')
    objArr = []
    for item in textOnlyTweets:
        itmArr = {}
        myTweet = ' '.join(item.xpath('.//div[@class="js-tweet-text-container"]/p//text()'))
        imgCount = item.xpath('.//@data-image-url')
        twtReply = item.xpath('.//span[@class="ProfileTweet-action--reply u-hiddenVisually"]//@data-tweet-stat-count')
        twtRetwt = item.xpath('.//span[@class="ProfileTweet-action--retweet u-hiddenVisually"]//@data-tweet-stat-count')
        twtFav = item.xpath('.//span[@class="ProfileTweet-action--favorite u-hiddenVisually"]//@data-tweet-stat-count')
        userDet = item.xpath('.//div[@class="stream-item-header"]/a')
        time = item.xpath('.//div[@class="stream-item-header"]/small[@class="time"]/a/span')
        timePretty = item.xpath('.//div[@class="stream-item-header"]/small[@class="time"]/a')
        itmArr['tweet'] = myTweet
        itmArr['imgUrls'] = imgCount
        itmArr['retweet'] = int(twtRetwt[0])
        itmArr['favorite'] = int(twtFav[0])
        itmArr['reply'] = int(twtReply[0])
        itmArr['fullname'] = ' '.join(userDet[0].xpath('.//span[@class="FullNameGroup"]//strong//text()'))
        itmArr['handle'] = ''.join(userDet[0].xpath('.//span[@class="username u-dir u-textTruncate"]//text()'))
        itmArr['time'] = time[0].get('data-time')
        itmArr['timeP'] = timePretty[0].get('title')
        objArr.append(itmArr)
    return json.dumps(objArr, indent = 4)

if __name__ == "__main__":
    recentTweets = True
    qryString = 'rafale'
    lang = 'enus'
    jsn = scrapper(recentTweets, qryString, lang)
    print(jsn)