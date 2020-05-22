# -*- coding: utf-8 -*-
import cnn_model 
import clustering

import pandas as pd
import operator


def make_dataframe() :
    
    df = pd.read_csv("sample_furniture-images.csv", index_col = 0)
    
    return df

def find_mode_label(labels):
    label_count = {}
    labels_set = set(labels)
    
    for label in labels_set:
        label_count[label] = labels.count(label)
        
    label_count = sorted(label_count.items(), key=operator.itemgetter(1), reverse=True)
    
    return label_count[0][0]


def temp_labeling(df, n):
    
    temp_labeling_df = pd.DataFrame({'data_index' : [], 'data' : [], 'label_temp' : []})
    
    data_indicis = set(df.data_index.tolist())
    
    for i in data_indicis:
        temp_df = df[df['data_index'] == i]
        
        credibilities = df.user_credibility.tolist()
        credibilities.sort()
        
        if len(credibilities) > n-1:
            credibilities_n_df = temp_df[temp_df['user_credibility'] >= credibilities[-n]]
            
            labels = credibilities_n_df.label_user.tolist()
            
            mode_label = find_mode_label(labels)
            
            credibilities_n = temp_df[temp_df['label_user'] == mode_label].user_credibility.tolist()
            
            credibility_label_temp = sum(credibilities_n) / len(credibilities_n)
        
        ##라벨러 n 명 이하일 때
        ##추가##
        
        data = pd.Series([i, temp_df.data.iloc[0], mode_label, credibility_label_temp], index = ['data_index', 'data', 'label_temp', 'credibility_label_temp'])  
        temp_labeling_df = temp_labeling_df.append(data, ignore_index = True)
            
    return temp_labeling_df


def label_validate(df):
    model = cnn_model.model()
    paths = df.path.tolist()
    
    label_num = len(set(df.label_temp.tolist()))
    
    img_feature = cnn_model.feature_extract(model, paths)
    
    kmeans_labels = clustering.kmeans_clustering(img_feature, label_num)
    
    return kmeans_labels


def cal_cor_pers(df, correct_df): 
    cor_pers = {}
    cor_id = {}
    
    index_label = {}
    data_indices = set(df.data_index.tolist())
    
    for i in range(len(correct_df)):
        index = correct_df.iloc[i].data_index
        index_label[index] = correct_df.iloc[i].label_predicted

    index_df = df.loc[:, ['data_index', 'label_user', 'user_id']]

    for index in index_label:
        if index in data_indices:
            cor_df = index_df[(index_df['data_index'] == index) & (index_df['label_user']== index_label[index])]
            correct = len(cor_df)

            cor_per = correct / len(index_df[index_df['data_index'] == index])

            cor_pers[index] = cor_per
            cor_id[index] = cor_df.user_id.tolist()
        
    return cor_pers, cor_id


def cal_credibility(df, cor_pers, right_id):
    new_cred = 0
    new_creds = {}
    cred_df = df.loc[:, ['data_index', 'user_id', 'user_credibility']]
    
    for i in range(len(cred_df)):
        index = cred_df.iloc[i]
        new_creds[index.user_id] = index.user_credibility
    
    cor_data_indices = cor_pers.keys()
    ids = cred_df.user_id.tolist()
    
    for index in cor_data_indices:
        tmp_df = cred_df[cred_df['data_index']== index]
        id_list = tmp_df.user_id.tolist()
        for id in id_list:
            if id in right_id[index]:
                new_cred = 0.01 * cor_pers[index] * (1-new_creds[id])
            else:
                new_cred = -0.01 * cor_pers[index] * (new_creds[id])
            new_creds[id] += new_cred / ids.count(id)
    
    new_cred_list = [round(new_creds[id],4) if new_creds[id] < 1 else 0.9999 for id in ids]
             
    df['user_credibility_new_1'] = new_cred_list
    
    return df


def second_labeling(df, false_df, n):
    
    data_indices = set(false_df.data_index.tolist())
    
    mode_labels = []
    
    for index in data_indices:
        temp_df = df[df['data_index'] == index]
        
        credibilities = temp_df.user_credibility_new_1.tolist()
        credibilities.sort()
        
        if len(credibilities) > n-1:
            labels = temp_df[temp_df['user_credibility_new_1'] >= credibilities[-n]].label_user.tolist()
            mode_label = find_mode_label(labels)
            mode_labels.append(mode_label)
    
    false_df['second_label'] = mode_labels
            
    return false_df


def main():
    
    df = make_dataframe()
    df_temp_label = temp_labeling(df)
    
    df_temp_label['kmeans_label'] = label_validate(df_temp_label)
    
    print(df_temp_label)
      
    return


if __name__ == '__main__' :
    main()


