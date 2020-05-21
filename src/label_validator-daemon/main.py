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


def cal_cor_pers(total_label_df, correct_df): 
    cor_pers = {}
    cor_id = {}
    
    path_label = {}
    total_paths = set(total_label_df.path.tolist())
    
    for i in range(len(correct_df)):
        path = correct_df.iloc[i].path
        path_label[path] = correct_df.iloc[i].label
#     일단 path로 
    path_df = total_label_df.loc[:, ['path', 'label_user', 'id']]

    for path in path_label:
        if path in total_paths:
            cor_df = path_df[(path_df['path'] == path) & (path_df['label_user']== path_label[path])]
            correct = len(cor_df)

            cor_per = correct / len(path_df[path_df['path'] == path])

            cor_pers[path] = cor_per
            cor_id[path] = cor_df.id.tolist()
        
    return cor_pers, cor_id


def cal_credibility(total_label_df, cor_pers, right_id):
    new_cred = 0
    new_creds = {}
    cred_df = total_label_df.loc[:, ['path', 'id', 'credibility']]
    
    for i in range(len(cred_df)):
        index = cred_df.iloc[i]
        new_creds[index.id] = index.credibility
    
    total_paths = set(cred_df.path.tolist())
    total_ids = cred_df.id.tolist()
    
    for path in total_paths:
        tmp_df = cred_df[cred_df['path']== path]
        id_list = tmp_df.id.tolist()
        for id in id_list:
            if id in right_id[path]:
                new_cred = 0.01 * cor_pers[path]
            else:
                new_cred = -0.01 * cor_pers[path]
            new_creds[id] += new_cred
    
    new_cred_list = [new_creds[id] for id in total_ids]
    total_label_df['new_cred'] = new_cred_list
    return total_label_df


def second_labeling(df, rest_df):
#     df_temp_labeling = pd.DataFrame({'file_index' : [], 'path' : [], 'label_temp' : []})
    
    total_paths = set(df.path.tolist())
    mode_labels = []
    
    for path in total_paths:
        temp_df = df[df['path'] == path]
        
        credibilities = temp_df.new_cred.tolist()
        credibilities.sort()
        
        if len(credibilities) > 2:
            labels = temp_df[temp_df['new_cred'] >= credibilities[-3]].label.tolist()
            mode_label = find_mode_label(labels)
            mode_labels.append(mode_label)
#         data = pd.Series([i, temp_df['path'].iloc[0], mode_label], index = ['file_index', 'path', 'label_temp'])  
#         df_temp_labeling = df_temp_labeling.append(data, ignore_index = True)

    rest_df['second_label'] = mode_labels
            
    return rest_df


def main():
    
    df = make_dataframe()
    df_temp_label = temp_labeling(df)
    
    df_temp_label['kmeans_label'] = label_validate(df_temp_label)
    
    print(df_temp_label)
      
    return


if __name__ == '__main__' :
    main()


