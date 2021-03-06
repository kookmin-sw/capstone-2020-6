# -*- coding: utf-8 -*-
import image_selection_validator
import text_selection_validator

import pandas as pd
import operator
from tqdm import tqdm

def image_df():

    df = pd.read_csv("_dummy_labeling_dataset_furniture-images.csv", index_col = 0)

    return df

def text_df():
    
    df = pd.read_csv("dummy_labeling_dataset_movie_sentiment-text.csv", index_col = 0)

    return df

def make_dataframe() :
    
    print("dataframe 생성")
    #text
    # df = pd.read_csv("dummy_labeling_dataset_movie_sentiment-text.csv", index_col = 0)

    #image
    df = pd.read_csv("_dummy_labeling_dataset_furniture-images.csv", index_col = 0)
    
    # df = pd.DataFrame({'project_id':[], 'data_index':[],'data':[],'label_user':[],'user_id':[],'user_credibility':[]})
    
    print("dataframe 완료")

    return df

def find_mode_label(labels):
    label_count = {}
    labels_set = set(labels)
    
    for label in labels_set:
        if label == None:
            continue
        label_count[label] = labels.count(label)
        
    label_count = sorted(label_count.items(), key=operator.itemgetter(1), reverse=True)
    
    return label_count[0][0]


def temp_labeling(df, n):
    
    print("temp_labeling 시작")

    temp_labeling_df = pd.DataFrame({'data_index' : [], 'data' : [], 'label_temp' : []})
    
    data_indices = set(df.data_index.tolist())
    
    for i in tqdm(data_indices):
        temp_df = df[df['data_index'] == i]
        
        credibilities = temp_df.user_credibility.tolist()
        credibilities.sort()
        
        if len(credibilities) > n-1:
            credibilities_n_df = temp_df[temp_df['user_credibility'] >= credibilities[-n]]
            
            labels = credibilities_n_df.label_user.tolist()
            
            mode_label = find_mode_label(labels)
            
            credibilities_n = temp_df[temp_df['label_user'] == mode_label].user_credibility.tolist()
            
            credibility_label_temp = sum(credibilities_n) / len(credibilities_n)
        
        data = pd.Series([i, temp_df.data.iloc[0], mode_label, credibility_label_temp], index = ['data_index', 'data', 'label_temp', 'credibility_label_temp'])  
        temp_labeling_df = temp_labeling_df.append(data, ignore_index = True)

    print("temp_labeling 완료")   

    return temp_labeling_df

def cal_cor_pers(df, correct_df): 
    cor_pers = {}
    cor_id = {}
    
    index_label = {}
    data_indices = set(df.data_index.tolist())
    
    for i in range(len(correct_df)):
        index = correct_df.iloc[i].data_index
        index_label[index] = correct_df.iloc[i].label_predicted

    index_df = df.loc[:, ['data_index', 'label_user', 'user_id']]

    for index in tqdm(index_label):
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
    
    for index in tqdm(cor_data_indices):
        tmp_df = cred_df[cred_df['data_index']== index]
        id_list = tmp_df.user_id.tolist()
        for id in id_list:
            if id in right_id[index]:
                new_cred = 0.01 * cor_pers[index] * (1-new_creds[id])
            else:
                new_cred = -0.01 * cor_pers[index] * (new_creds[id])
            new_creds[id] += new_cred / ids.count(id)
    
    new_cred_list = [round(new_creds[id],4) if new_creds[id] < 1 else 0.9999 for id in ids]
             
    df['user_credibility_temp'] = new_cred_list
    
    return df

def find_second_label(labels):
    idx = 0
    label_count = {}
    labels_set = set(labels)
    
    for label in labels_set:
        if label == None:
            continue
        label_count[label] = labels.count(label)
        
    label_count = sorted(label_count.items(), key=operator.itemgetter(1), reverse=True)
    
    if len(label_count) > 1:
        idx = 1
        
    return label_count[idx][0]

def second_labeling(df, false_df, n):
        
    data_indices = false_df.data_index.tolist()
    
    mode_labels = []
    
    for i in data_indices:
        temp_df = df[df['data_index'] == i]
        
        credibilities = temp_df.user_credibility_temp.tolist()
        credibilities.sort()
        
        if len(credibilities) > n-1:
            labels = temp_df[temp_df['user_credibility_temp'] >= credibilities[-n]].label_user.tolist()
            mode_label = find_second_label(labels)
            mode_labels.append(mode_label)
    
    false_df['label_second'] = mode_labels
            
    return false_df


def final_labeling(project_id, correct_df, second_df):
    
    final_df = pd.DataFrame({'project_id': [], 'data_index':[], 'data':[], 'label_final':[]})
    
    for i in tqdm(range(len(correct_df))):
        data = pd.Series([project_id, correct_df.iloc[i].data_index, correct_df.iloc[i].data, correct_df.iloc[i].label_predicted],index = ['project_id', 'data_index', 'data', 'label_final'])   
        final_df = final_df.append(data, ignore_index=True)
    
    for i in tqdm(range(len(second_df))):
        data = pd.Series([project_id, second_df.iloc[i].data_index, second_df.iloc[i].data, second_df.iloc[i].label_second],index = ['project_id', 'data_index', 'data', 'label_final'])   
        final_df = final_df.append(data, ignore_index=True)
    
    final_df = final_df.sort_values(by=['data_index'], axis=0).reset_index(drop=True)
    
    return final_df


def final_cor_pers(df, final_df): 
    cor_pers = {}
    cor_id = {}
    
    index_label = {}
    data_indices = set(df.data_index.tolist())
    
    for i in range(len(final_df)):
        index = final_df.iloc[i].data_index
        index_label[index] = final_df.iloc[i].label_final

    index_df = df.loc[:, ['data_index', 'label_user', 'user_id']]

    for index in index_label:
        if index in data_indices:
            cor_df = index_df[(index_df['data_index'] == index) & (index_df['label_user']== index_label[index])]
            correct = len(cor_df)

            cor_per = correct / len(index_df[index_df['data_index'] == index])

            cor_pers[index] = cor_per
            cor_id[index] = cor_df.user_id.tolist()
        
    return cor_pers, cor_id


def final_credibility(df, cor_pers, right_id):
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
    
    id_list = [id for id in new_creds.keys()]
    new_cred_list = [round(cred,4) if cred < 1 else 0.9999 for cred in new_creds.values()]
    
    user_cred_df = pd.DataFrame({'user_id':id_list, 'user_credibility' : new_cred_list})
    
    return user_cred_df   

def image_selection_label(df):

    print("image_selection_label validation 시작")

    n = len(set(df.user_id.tolist()))
    
    temp_label_df = temp_labeling(df, n)
    
       
    matched_df, not_matched_df = image_selection_validator.compare_label(temp_label_df)
    
    
    cor_pers, right_id = cal_cor_pers(df, matched_df)
    
   
    temp_credibility_df = cal_credibility(df, cor_pers, right_id)

       
    second_temp_label_df = second_labeling(temp_credibility_df, not_matched_df, n)##

    project_id = df.iloc[0].project_id

    final_df = final_labeling(project_id, matched_df,  second_temp_label_df)

    final_json = final_df.to_json(orient='records')

    cor_pers, right_id = final_cor_pers(df, final_df)

    user_cred_final_df = final_credibility(df, cor_pers, right_id)

    user_cred_json = user_cred_final_df.to_json(orient='records')
    
    return final_json, user_cred_json

def image_capture_label(df):
    #####
    return

def text_selection_label(df):

    print("text_selection_label validation 시작")

    n = len(set(df.user_id.tolist()))
    
    temp_label_df = temp_labeling(df, n)
    
      
    matched_df, not_matched_df = text_selection_validator.compare_label(temp_label_df)
    
    
    cor_pers, right_id = cal_cor_pers(df, matched_df)
    
    
    temp_credibility_df = cal_credibility(df, cor_pers, right_id)
     
    second_temp_label_df = second_labeling(temp_credibility_df, not_matched_df, n)##

    project_id = df.iloc[0].project_id

    final_df = final_labeling(project_id, matched_df,  second_temp_label_df)

    final_json = final_df.to_json(orient='records')

    cor_pers, right_id = final_cor_pers(df, final_df)

    user_cred_final_df = final_credibility(df, cor_pers, right_id)

    user_cred_json = user_cred_final_df.to_json(orient='records')
    
    return final_json, user_cred_json

def main(idx):
    
    # df = make_dataframe()
    
    # 1: image_selection, 2: image_capture, 3: text_selection
    if idx == 1:
        df = image_df()
        final_json, user_cred_json = image_selection_label(df)
        print(final_json, user_cred_json)
    elif idx == 2:
        image_capture_label(df)
    elif idx == 3:
        df = text_df()
        final_json, user_cred_json = text_selection_label(df)
        print(final_json, user_cred_json)

    else:
        print('type error')

    return final_json, user_cred_json


if __name__ == '__main__' :
    while True:
        try:
            idx = int(input('type : '))
            main(idx)
        except AttributeError as e:
            print(e)
    # idx = int(input('type : '))
    # main(idx)



