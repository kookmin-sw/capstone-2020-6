# -*- coding: utf-8 -*-
import numpy as np
from keras.preprocessing import image
from keras.applications.densenet import DenseNet201
from keras.applications.densenet import preprocess_input, decode_predictions
from keras.callbacks import ModelCheckpoint, EarlyStopping
from keras.optimizers import Adam
from keras.layers import Dense, GlobalAveragePooling2D, Dropout
from keras.models import Sequential,load_model, model_from_json
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import KFold

conv_base = DenseNet201(include_top = False, weights='imagenet', input_shape=(224,224,3))

early_stopping = EarlyStopping(monitor='val_loss', patience=10)

kf = KFold(n_splits=n_split, shuffle=True)

le = LabelEncoder()
dataset_df['label_encoding'] = list(map(str,le.fit_transform(dataset_df['label_temp'])))

# +
num_epochs = 300
batch_size = 64

learning_rate = 0.001

dropout_rate = 0.5

input_shape = (224, 224, 3)
num_classes = len(labels)

n_split = 5


# -

def model():
    
    model = Sequential()

    model.add(GlobalAveragePooling2D(input_shape=conv_base.output[0].shape))

    model.add(Dense(num_classes, activation='softmax'))
    
    #모델 컴파일
    model.compile(optimizer=Adam(learning_rate),  # Optimization
                  loss='categorical_crossentropy',  # Loss Function 
                  metrics=['accuracy'])  # Metrics / Accuracy
    
    return model

def extract_features(df, sample_count, num_classes):
    
    datagen = image.ImageDataGenerator(rescale=1./255)
    
    features = np.zeros(shape=(sample_count, 7, 7, 1920))  # Must be equal to the output of the convolutional base
    labels = np.zeros(shape=(sample_count, num_classes))
    # Preprocess data
    generator = datagen.flow_from_dataframe(df,
                                            x_col='path',
                                            y_col='label',
                                            target_size=input_shape[:2],
                                            batch_size=batch_size  
                                           )
    # Pass data through convolutional base
    i = 0
    for inputs_batch, labels_batch in generator:
        features_batch = conv_base.predict(inputs_batch)
        features[i * batch_size: (i + 1) * batch_size] = features_batch
        labels[i * batch_size: (i + 1) * batch_size] = labels_batch
        i += 1
        if i * batch_size >= sample_count:
            break
    return features, labels


def train_model(train_set, valid_set):

    for train_index, test_index in kf.split(total_features):
        x_train,x_test=total_features[train_index],total_features[test_index]
        y_train,y_test=total_labels[train_index],total_labels[test_index]

            # Train model
        history = model.fit(x_train, y_train,
                            epochs=num_epochs,
                            batch_size=batch_size, 
                            validation_data=(x_test, y_test),
                            callbacks = [early_stopping]
                           )


def predict_label(df):
    
    label_predicted = []
    
    for i in range(len(df)):
        img = image.load_img(df.iloc[i].data , target_size=(224,224))
        img_data = image.img_to_array(img)

        img_data = np.expand_dims(img_data, axis=0)
        img_data = preprocess_input(img_data)

        #모델로 특징 추출
        label_predicted.append(model.predict_classes(img_data))
        label_predicted = []
    
    return label_predicted
