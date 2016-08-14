# MetaAnalytics
`MetaAnalytics` provides complete assessment of restaurants all over the world using Google Maps api, Twitter api and HPE Havens Sentimental Analysis api.

## What it's all about

Choices! The worst dilemma we experience when trying to figure out where to go out to eat. Do you choose something you like? Or try out something new? In either case, how are you going to figure out where to go? Where do you go to see if the mystery locale has good reviews? Our app helps you find answers to all these questions and figures out the best place to eat.

## How it works?

`MetaAnalytics` springs on `Google Maps` where user can search for a location to get all the nearby restaurants. This skips the tedious job of searching individual restaurants and enables comparison at a glance. User can visit the website for the details or review page of restaurants for the analysis. Here we use `twitter api` to fetch all the tweets with #restaurant_name. Then we use `HPE Haven api` to run sentiment analysis for the all the tweets to receive meaningful data. Sentiment analysis outputs value in the range from [-1,1]. Positive values indicate a positive review and negative values indicate a negative review. This user experience helps us to get the best opinion and we show the average rating for the restaurant.

## How is it different?

Many frameworks like Zomato, Foodpanda also produces reviews and ratings, but they work differently! If a user visits a restaurant, he is more likely to tweet about his awesome/aweful food rather than posting a review on Zomato. Furthermore, recent claims show that Zomato ratings can be misleading from a user's perpective. If the restaurant owner is financially well-off, he gives in to Zomato’s monopoly and pays up to get “good ratings". On top of this Zomato uses its own algorithm to rate restaurants. The ratings are not simply calculated as “No. of Ratings divided by No. of Users”, it provides its own ratings to most restaurants (based on the deal it strikes with them). This violates the neutrality of Zomato as a platform.

`MetaAnalytics` parses tweets from twitter which showcases the best user perspective. Our ratings based on sentimental analysis picks up the best restaurant one looks for.

## Future

At the core, `metaAnalytics` is a combination of ideal user experience through google maps and strong user-oriented review system based on sentimental analysis of tweets. This opens up diversied areas where the app can be used in future.
