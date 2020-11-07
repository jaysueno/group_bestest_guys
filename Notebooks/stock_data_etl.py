import pandas as pd
import numpy as np
import datetime as dt

def process_data(file):
    #file input is file name string excluding .csv
    df = pd.read_csv(file)
    df.columns = [col.lower() for col in df.columns]
    
    df['date'] = pd.to_datetime(df['date']).dt.normalize()
    df['change'] = df['close'] - df['open']
    df['%change'] = df['change'] / df['open']
    df['up/down'] = np.where(df['change'] > 0, 'up', 'down')
    df.drop(['high', 'low', 'adj close', 'volume'], axis=1, inplace=True)

    output_file = f'../Data/clean_{file}'
    df.to_csv(output_file, index=False)