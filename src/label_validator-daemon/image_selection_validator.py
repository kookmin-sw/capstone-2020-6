# -*- coding: utf-8 -*-
import numpy as np
import pandas as pd
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.densenet import DenseNet201
from tensorflow.keras.applications.densenet import preprocess_input, decode_predictions
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Sequential
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import KFold
from tqdm import tqdm


num_epochs = 20
batch_size = 64

learning_rate = 0.001

dropout_rate = 0.5

input_shape = (224, 224, 3)

n_split = 5

conv_base = DenseNet201(include_top = False, weights='imagenet', input_shape=(224,224,3))

kf = KFold(n_splits=n_split, shuffle=True)

le = LabelEncoder()

def create_classifier(num_classes):
    
    classifier = Sequential()

    classifier.add(GlobalAveragePooling2D(input_shape=conv_base.output[0].shape))

    classifier.add(Dense(num_classes, activation='softmax'))
    
    #모델 컴파일
    classifier.compile(optimizer=Adam(learning_rate),  # Optimization
                  loss='categorical_crossentropy',  # Loss Function 
                  metrics=['accuracy'])  # Metrics / Accuracy
    
    return classifier

def extract_features(df, sample_count, num_classes):
    datagen = image.ImageDataGenerator(rescale=1./255)
    data_features = np.zeros(shape=(sample_count, 7, 7, 1920))  # conv_base의 출력과 같아야 한다.
    data_labels = np.zeros(shape=(sample_count, num_classes))
    generator = datagen.flow_from_dataframe(df,
                                            x_col='data',
                                            y_col='label_encoding',
                                            target_size=input_shape[:2],
                                            batch_size=batch_size  
                                           )
    # data를 conv_base에 입력시키고 출력을 받는다.
    i = 0
    for inputs_batch, labels_batch in tqdm(generator):
        features_batch = conv_base.predict(inputs_batch)
        data_features[i * batch_size: (i + 1) * batch_size] = features_batch
        data_labels[i * batch_size: (i + 1) * batch_size] = labels_batch
        i += 1
        if i * batch_size >= sample_count:
            break
    return data_features, data_labels

def train_model(df):
    print("train_model 시작")
    df['label_encoding'] = list(map(str,le.fit_transform(df['label_temp'])))
    
    labels = set(df.label_temp.tolist())

    num_classes  = len(labels)

    classifier = create_classifier(num_classes)

    data_features, data_labels = extract_features(df, len(df), num_classes)

    early_stopping = EarlyStopping(monitor='val_loss', patience=3)

    for train_index, test_index in kf.split(data_features):
        x_train,x_test=data_features[train_index],data_features[test_index]
        y_train,y_test=data_labels[train_index],data_labels[test_index]
        
        history = classifier.fit(x_train, y_train,
                            epochs=num_epochs,
                            batch_size=batch_size, 
                            validation_data=(x_test, y_test),
                            callbacks = [early_stopping]
                        )

    trained_model = Sequential()
    trained_model.add(conv_base)
    trained_model.add(classifier)

    return trained_model

def predict_label(df, model):
    print("predict_label 시작")
    label_predicted = []
    
    for i in tqdm(range(len(df))):
        img = image.load_img(df.iloc[i].data , target_size=(224,224))
        img_data = image.img_to_array(img)

        img_data = np.expand_dims(img_data, axis=0)
        img_data = preprocess_input(img_data)

        #모델로 특징 추출
        label_predicted.append(model.predict_classes(img_data))
    
    label_predicted = le.inverse_transform(label_predicted)
    
    return label_predicted

def compare_label(df):
    print("compare_label 시작")
    trained_model = train_model(df)

    label_predicted = predict_label(df, trained_model)

    df['label_predicted'] = label_predicted

    matched_df = df[df['label_temp'] == df['label_predicted']]
    not_matched_df = df[df['label_temp'] != df['label_predicted']]

    print("compare_label 완료")
    return matched_df, not_matched_df
