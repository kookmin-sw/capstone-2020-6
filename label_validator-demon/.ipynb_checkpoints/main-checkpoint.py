import model
import clustering

import pandas as pd
import operator


def make_dataframe() :
    
    
    
    return df

def find_mode_label(labels):
    label_count = {}
    labels_set = set(labels)
    
    for label in labels_set:
        label_count[label] = labels.count(label)
        
    label_count = sorted(label_count.items(), key=operator.itemgetter(1), reverse=True)
    
    return label_count[0][0]


def temp_labeling(df):
    df_temp_labeling = pd.DataFrame({'file_index' : [], 'path' : [], 'label_temp' : []})
    
    file_indices = set(df.file_index.tolist())
    
    for i in file_indices:
        temp_df = df[df['file_index'] == i]
        
        credibilities = temp_df.credibility.tolist()
        credibilities.sort()
        
        if len(credibilities) > 2:
            labels = temp_df[temp_df['credibility'] >= credibilities[-3]].label.tolist()
            mode_label = find_mode_label(labels)
        
        
        data = pd.Series([i, temp_df['path'].iloc[0], mode_label], index = ['file_index', 'path', 'label_temp'])  
        df_temp_labeling = df_temp_labeling.append(data, ignore_index = True)
            
    return df_temp_labeling


def label_validate(df):
        
    
    return new_df


def main():
    
    
    
    return

if '__name__' == '__main__' :
    main()
