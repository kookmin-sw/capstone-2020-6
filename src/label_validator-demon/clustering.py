import numpy as np
from sklearn.cluster import KMeans, AffinityPropagation

def kmeans_clustering(img_feature_list, n):
    
    img_feature_list_np = np.array(img_feature_list)

    kmeans = KMeans(n_clusters=n, random_state=0).fit(img_feature_list_np)
    
    return kmeans.labels_
