import pandas as pd
import numpy as np

def process_data(file):
    #file input is file name string excluding .csv
    input = f'../../Data/{file}.csv'
    df = pd.read_csv(input)

    df['Change'] = df['Close'] - df['Open']
    df['% Change'] = df['Change'] / df['Open']
    df['Up/Down'] = np.where(df['Change'] > 0, 'up', 'down')
    df.drop(['High', 'Low', 'Adj Close', 'Volume'], axis=1, inplace=True)

    output_file = f'../../Data/{file}_clean.csv'
    df.to_csv(output_file, index=False)