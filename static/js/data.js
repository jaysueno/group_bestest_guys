let metrics = ['month', 'tweets', 'isRetweet', 'isDeleted',
'avg_sentiment_score', 'sum_sentiment_score', 'delta_avg', 'retweets',
'favorites', 'word_count', 'positive', 'negative', 'neutral',
'gspc_change', 'gspc_up_down', '%positive', '%negative', '%neutral',
'baseline', 'delta'];

let summary = {};

for (var i = 0; i < metrics.length; i++) {
    summary[metrics[i]] = [];
};

d3.csv("../Data/monthly_summary.csv").then((d) => {
    metrics.forEach(m => {
        if (m !== 'month') {
            summary[m] = +d.map;
        }
        
    })
    
});
