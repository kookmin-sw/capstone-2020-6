# -*- coding: utf-8 -*-
import numpy as np
from keras.preprocessing import image
from keras.applications.resnet50 import ResNet50
from keras.applications.resnet50 import preprocess_input, decode_predictions

def model():
    
    model = ResNet50(weights='imagenet', include_top=False)
    
    return model

def feature_extraction(path):
    
    img_feature_list = []
    
    for img_path in path:

        img = image.load_img(img_path, target_size=(224,224))
        img_data = image.img_to_array(img)

        img_data = np.expand_dims(img_data, axis=0)
        img_data = preprocess_input(img_data)

        #모델로 특징 추출
        img_feature = model.predict(img_data)
        img_feature_np = np.array(img_feature)
        img_feature_list.append(img_feature_np.flatten())
    
    return img_feature_list
