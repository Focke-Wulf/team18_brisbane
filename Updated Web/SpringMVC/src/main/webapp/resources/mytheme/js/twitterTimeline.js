//Function Add Twitter Information

function addTweet(tweet){
	var feedHTML = '';
	var displayCounter = 1; 
	var displaylimit = 5;

	var showdirecttweets = true;
	var showretweets = true;
	var showtweetlinks = true;
	var showprofilepic = true;
	var showtweetactions = true;
	var showretweetindicator = true;

	var headerHTML = '';
	var loadingHTML = '';

	var headerHTML = '';
	var loadingHTML = '';

	var tweetscreenname = tweet.doc.user.screen_name;
	var tweetusername = tweet.doc.user.name;
	var profileimage = tweet.doc.user.profileImageUrl;
	var status = tweet.doc.text; 
	var isaretweet = false;
	var isdirect = false;
	var tweetid = tweet.doc.id_str;

	//If the tweet has been retweeted, get the profile pic of the tweeter
	if(typeof tweet.doc.retweeted_status != 'undefined'){
		profileimage = tweet.doc.retweeted_status.user.profile_image_url_https;
		tweetscreenname = tweet.doc.retweeted_status.user.name;
		tweetusername = tweet.doc.retweeted_status.user.screen_name;
		tweetid = tweet.doc.retweeted_status.id_str;
		status = tweet.doc.retweeted_status.text; 
		isaretweet = true;
	};
	//console.log("NOW PROCESSING: " + tweetscreenname + " " + tweetusername + " "+ profileimage + " " + status + " " + isaretweet + " " + isdirect + " " + tweetid);

	//Check to see if the tweet is a direct message
	if (tweet.doc.text.substr(0,1) == "@") {
		isdirect = true;
	}


	//Generate twitter feed HTML based on selected options
	if (((showretweets == true) || ((isaretweet == true) && (showretweets == true))) && ((showdirecttweets == true) || ((showdirecttweets == true) && (isdirect == true)))) { 
		if ((tweet.doc.text.length > 1) && (displayCounter <= displaylimit)) {             
			if (showtweetlinks == true) {
				status = addlinks(status);
			}

			if (displayCounter == 1) {
				feedHTML += headerHTML;
			}

			feedHTML += '<div class="twitter-article" id="tw'+displayCounter+'">'; 										                 
			feedHTML += '<div class="twitter-pic"><a href="https://twitter.com/'+tweetusername+'" target="_blank"><img src="'+profileimage+'"images/twitter-feed-icon.png" width="42" height="42" alt="twitter icon" /></a></div>';
			feedHTML += '<div class="twitter-text"><p><span class="tweetprofilelink"><strong><a href="https://twitter.com/'+tweetusername+'" target="_blank">'+tweetscreenname+'</a></strong> <a href="https://twitter.com/'+tweetusername+'" target="_blank">@'+tweetusername+'</a></span><span class="tweet-time"><a href="https://twitter.com/'+tweetusername+'/status/'+tweetid+'" target="_blank">'+relative_time(tweet.doc.created_at)+'</a></span><br/>'+status+'</p>';

			if ((isaretweet == true) && (showretweetindicator == true)) {
				feedHTML += '<div id="retweet-indicator"></div>';
			}						
			if (showtweetactions == true) {
				feedHTML += '<div id="twitter-actions"><div class="intent" id="intent-reply"><a href="https://twitter.com/intent/tweet?in_reply_to='+tweetid+'" title="Reply"></a></div><div class="intent" id="intent-retweet"><a href="https://twitter.com/intent/retweet?tweet_id='+tweetid+'" title="Retweet"></a></div><div class="intent" id="intent-fave"><a href="https://twitter.com/intent/favorite?tweet_id='+tweetid+'" title="Favourite"></a></div></div>';
			}

			feedHTML += '</div>';
			feedHTML += '</div>';
			displayCounter++;
		}   
	}
	$('#twitter-feed2').append('<div>'+feedHTML +'</div>');
	//Add twitter action animation and rollovers
	if (showtweetactions == true) {				
		$('.twitter-article').hover(function(){
			$(this).find('#twitter-actions').css({'display':'block', 'opacity':0, 'margin-top':-20});
			$(this).find('#twitter-actions').animate({'opacity':1, 'margin-top':0},200);
		}, function() {
			$(this).find('#twitter-actions').animate({'opacity':0, 'margin-top':-20},120, function(){
				$(this).css('display', 'none');
			});
		});			

		//Add new window for action clicks

		$('#twitter-actions a').click(function(){
			var url = $(this).attr('href');
			window.open(url, 'tweet action window', 'width=580,height=500');
			return false;
		});
	}
}




//Function modified from Stack Overflow
function addlinks(data) {
	//Add link to all http:// links within tweets
	data = data.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
		return '<a href="'+url+'"  target="_blank">'+url+'</a>';
	});

	//Add link to @usernames used within tweets
	data = data.replace(/\B@([_a-z0-9]+)/ig, function(reply) {
		return '<a href="http://twitter.com/'+reply.substring(1)+'" style="font-weight:lighter;" target="_blank">'+reply.charAt(0)+reply.substring(1)+'</a>';
	});
	//Add link to #hastags used within tweets
	data = data.replace(/\B#([_a-z0-9]+)/ig, function(reply) {
		return '<a href="https://twitter.com/search?q='+reply.substring(1)+'" style="font-weight:lighter;" target="_blank">'+reply.charAt(0)+reply.substring(1)+'</a>';
	});
	return data;
}
