let metrics = ['month', 'tweets', 'isRetweet', 'isDeleted',
'avg_sentiment_score', 'sum_sentiment_score', 'delta_avg', 'retweets',
'favorites', 'word_count', 'positive', 'negative', 'neutral',
's&p_%change', 's&p_up/down', '%positive', '%negative', '%neutral',
'baseline', 'delta'];

let summary = {};

for (var i = 0; i < metrics.length; i++) {
    summary[metrics[i]] = [];
};

d3.csv("../Data/monthly_summary.csv").then((data) => {
    data.forEach(d => {
        metrics.forEach(m => {
            summary[m].push(d[m]);
        })
    });
});
