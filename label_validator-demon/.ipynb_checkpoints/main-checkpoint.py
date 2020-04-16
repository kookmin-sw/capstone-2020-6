import model
import clustering

import pandas as pd


def make_dataframe() :
    
    
    
    return df

def temp_labeling(df):
    file_indices = set(df.file_index.tolist())
    
    for i in file_indices:
        temp_df = df[df['file_index'] == i]
        
        credibilities = temp_df.credibility.tolist()
        credibilities.sort()
         
        if len(credibilities) > 2:
            labels = temp_df[temp_df['credibility'] >= credibilities[-3]].label.tolist()
            
    return new_df


def label_validate(df):
        
    
    return new_df


def main():
    
    
    
    return

if '__name__' == '__main__' :
    main()
