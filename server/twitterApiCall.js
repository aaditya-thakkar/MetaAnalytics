// var twitterAuth = require('twitter-oauth')({
//         consumerKey: "iDOtKjkdh5YyXNbrevmeRGmhF", /* per appication - create a comsumer key here: https://dev.twitter.com/apps */
//         domain: 'www.aaska.me',
//      consumerSecret: "dd6rSvOGkYLesZpeC0ltJAfx59usuenRXYf4KovQhzfKzQaYJC" /* create a comsumer key here: https://dev.twitter.com/apps */
//       /*loginCallback: "http://yourdomain.com/twitter/sessions/callback",  /* internal */
//    /*completeCallback:  "http://yourdomain.com/search/beagles"  /* When oauth has finished - where should we take the user too */
// });
//
// twitterAuth.search(req.params.term.split('|'),  req.session.oauthAccessToken, req.session.oauthAccessTokenSecret,  function(error, data) {
//     res.json(data);
//   });
//<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

var OAuth = require('oauth');
var util = require('util');
var request = require('request');
var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  'iDOtKjkdh5YyXNbrevmeRGmhF',
  'dd6rSvOGkYLesZpeC0ltJAfx59usuenRXYf4KovQhzfKzQaYJC',
  '1.0A',
  null,
  'HMAC-SHA1'
);
var temp_str;
var ans = [];
var avg = 0.0;
//array_avg= {};
module.exports = {

  getOauth: function() {
    console.log("in getoauth");
    console.log(oauth);
    oauth.get(
      'https://api.twitter.com/1.1/search/tweets.json?q=bbqnation&count=20',
      '746052386687455232-FCo68XmTMPKBHXUahcGDInFHQmhi5bj',
      //you can get it at dev.twitter.com for your own apps
      '5gzQI7letoD3UXmWRi2yn1LIS8u76QLYzCJbCtTP28bRU',
      //you can get it at dev.twitter.com for your own apps
      function (e, data, res){
        if (e) console.error(e);
        //var str = util.inspect(data);
        var stringify = JSON.stringify(data);
        ///  console.log(Object.keys(util.inspect(data,false,Infinity,true))[0]);
        var temp_str = JSON.parse(eval("(" + stringify + ")"));
        //  var json = JSON.stringify(eval("(" + str + ")"));
        //      console.log(temp_str.statuses.length);
        for (i = 0; i < temp_str.statuses.length; i++) {

          // Set the headers
          var headers = {
            'User-Agent':       'Super Agent/0.0.1',
            'Content-Type':     'application/x-www-form-urlencoded'
          }

          // Configure the request
          var options = {
            url: ' https://api.havenondemand.com/1/api/sync/analyzesentiment/v1',
            method: 'POST',
            headers: headers,
            form: {'text':temp_str.statuses[i].text,'language':'eng', 'apikey':'3d07e984-eae3-4844-beb6-63049de63a88'}
          }

          // Start the request
          request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              // Print out the response body
              var stringify = JSON.stringify(body);
              ///  console.log(Object.keys(util.inspect(data,false,Infinity,true))[0]);
              temp_str = JSON.parse(eval("(" + stringify + ")"));
              console.log(temp_str.aggregate.score);
              if(temp_str.aggregate.score>0.0 || temp_str.aggregate.score< 0.0){
                avg += temp_str.aggregate.score;
                ans.push(temp_str.aggregate.score);
                avg = avg/ans.length;
              }
            }
          })
        }


      });
      var array_avg = {
        "array": ans,
        "avg": avg
      };
      return array_avg;
    }
  }
