<h1 align="center"> Trump Tweet Analysis </h1>
<p align="center"> A look at President Trump’s Tweet Sentiment and how it affects the US Market Economy. Please note this is not meant to take any political stance. </p>

###
<img src= "https://images.indianexpress.com/2017/11/trump-twitter-copy.jpg" align = "center"/>

## To run the site do the following:

Option A: 
1. Export FLASK_APP=app
2. Run Flask
3. Navigate to your flask sever (Default should be http://127.0.0.1:5000/)

Option B:

Horoku site https://team-beastest-guys.herokuapp.com/

## Contributors (in alphabetical order)

- Drew Gilmore
- Elisa Gipe
- Jay Sueno
- Patrick Plaisted

## Background

<img src= "/static/Images/top 10 days on twitter by volumne.png" align = "center"/>

Social media has changed communication channels across the world, the highest office in the country is not immune. Throughout his time in office, President Donald Trump has notably used Twitter and other social media platforms to engage with the nation. From his official declaration of candidacy in June 2015 through the first two-and-a-half years of his presidency, he tweeted over 17,000 times. Since early in his presidency, his tweets have been considered official statements by the president of the United States. While the rate of tweeting has varied, the president’s most prolific day was June 5, 2020 where he tweeted 200 times. In addition to the tweets he puts out, he is also the intended recipient of tweets by others. In 2019, Donald Trump was tagged on Twitter at a rate of 1,000 times per minute, according to The New York Times.

The S&P 500 (S&P) is a stock market index that measures stock performance of the 500 largest companies listed on the stock exchange in the United States. The index is one of the factors in computation of the Conference Board Leading Economic Index, used to forecast the direction of the economy. 

## Project Purpose and Overview

This project will evaluate any correlation that may exist between President Donald Trump’s Tweet History and the movement of the S&P index. 
The analysis of the historical tweet data will be used to evaluate if future tweets can predict market fluctuation. 

The Hedonometer Word Sentiment Data, in order "to quantify the happiness of the atoms of language, merged the 5,000 most frequent words from a collection of four corpora: Google Books, New York Times articles, Music Lyrics, and Twitter messages, resulting in a composite set of roughly 10,000 unique words. Using Amazon’s Mechanical Turk service, we (research of Peter Dodds and Chris Danforth and their team in the Computational Story Lab, including visualization by Andy Reagan, at the University of Vermont Complex Systems Center, and the technology of Brian Tivnan, Matt McMahon and their team from The MITRE Corporation) had each of these words scored on a nine point scale of happiness: (1) sad to (9) happy. You can explore the average scores of each word on our words page, or download the entire list from the publication supplement here. On a few occasions, we've updated the word list to include new terms that were uncommon when the original survey was conducted.

This data set was used to evaluate the sentiment of President Trump's tweets during his Presidency from 2016-2020 by taking an average of the rating based on each of the words used in his tweets. That sentiment value was put on a categorical scale, ranking tweets as positive, negative or neutral, and compared over time against the S&P 500 percentage change over time. Assuming correlation, those data sets were also modeled to see if we could predict and up or downturn of the market based on the President's sentiment scores averaged over the course of a given day. 

## Data Source
- Yahoo Finance:https://finance.yahoo.com/quote/%5EGSPC?p=%5EGSPC 
- Trump Tweet Data 2009-June 2020: https://www.kaggle.com/austinreese/trump-tweets 
- Hedonometer Word Sentiment Data: https://hedonometer.org/words/labMT-en-v1/

## Methodology
1. Cleaning the Data
- Each data set was converted to Pandas Dataframe.
- S&P Data: Data was grouped by day, week and month, and the percentage change and trend(up/down) was calculated. 
- Trump Tweet data: Sentiment data was calculated by associating score with each word of the tweet and an average and sum of all of the words within each tweet was calculated. Tweets were grouped by day with an average of tweet sentiment across all tweets in a given day, assigned categorical values (negative, neutral, positive) based on average sentiment value (brought from Hedonometer data).

<img src="/static/Images/Cleaning2.PNG" align = "center"/>

2. Visualizing the Data
- Visualization of the data was done using both Tableau and Javascript Libraries (Plotly).

<img src="/static/Images/plotly1_bar_and_scatter.svg" class="tensix" align = "center"/>
<img src="/static/Images/plotly3_positivity.svg" class="tensix" align = "center"/>

3. Machine Learning Modeling
- Seeking to test correlation between tweet sentiment data and S&P, machine learning algorithms were used to evaluate the relationship between the data sets.
- Features of the data were selected for importance and an extra tree classifier was used to further decide which were best suited for model.
- Selected features were used within several algorithms (Random Forest, Neural Network and K-Nearest Neighbor) using the sklearn library.
- Data was split into training and test group, pre-processed by scaling features, and the models were then trained to gather accuracy scores.
- Hyper-tuning of the models was done to further define parameters in each model for suggestions.
- Following the hyper-tuning, the data was re-entered to improve accuracy of the training models to decide which had highest accuracy. 
- Though decreasing the size of the data set from 10,000+ to 600-700 records, accuracy of the model was increased by 10% when the data was filtered to use only tweets that included the terms "economy", "stock" and "market".

<img src="/static/Images/Screenshot 2020-11-14 105109.jpg" align = "center"/>
<img src="/static/Images/image.png"  align = "center"/>

4. Front-end Delivery
- Preparation of the web app started with a base flask application and 4 routes were built.
- A base template for flask was built using Jinja to serve webpages for the content. Bootstrap was used for a carousel on the homepage and to make the webpage responsive. 
- The site was given the ability to switch between light and dark themes using Javascript and CSS to set the mode and create a toggle between the two themes. 
- To publish site to Heroku, various files were added to Github repository necessary for publishing (runtime.txt, requirements.txt, Procfile). The page was automatically deployed from GitHub repository. 

## Findings
- Because the markets are impacted by a large magnitude of events, sources and people, the president's influence, as marked by the hapiness sentiment score using the methodology chosen by this project, in the market generally had low to no influence. 
- Even if a correlation was found, the likelihood of causation versus correlation is also generally low. 
- Using the methodology, we were able to present several unique visualizations, monitoring the tweets and S&P 500 over time, finding that the majority of Trump's tweets carried a positive sentiment value, trending more positive over time. Additionally, the President's tweet volume increased dramatically over the course of his 4-year term. 
- The Random Forest model was the most accurate model giving us an accuracy score of 56% on the test data (87% on the training data); accuracy was improved by nearly 10% when data was limited to include tweets that only mentioned "market" "stock" or "economy". 

<img src="../static/Images/average sentiment score vs sap.png" align = "center"/>



