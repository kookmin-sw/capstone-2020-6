# -*- coding: utf-8 -*-
import numpy as np
from keras.preprocessing.image import ImageDataGenerator
from keras.applications.densenet import DenseNet201
from keras.applications.densenet import preprocess_input, decode_predictions

def conv_base():
    
    conv_base = DenseNet201(include_top = False, weights='imagenet', input_shape=(224,224,3))
    
    return conv_base

def extract_features(df, sample_count, num_classes):
    
    datagen = ImageDataGenerator(rescale=1./255)
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
