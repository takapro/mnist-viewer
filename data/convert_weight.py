import pickle
import numpy as np
import json

with open('mnist_weight.pkl', 'rb') as f:
    network = pickle.load(f)

data = {
    'W1': network['W1'].tolist(),
    'W2': network['W2'].tolist(),
    'W3': network['W3'].tolist(),
    'b1': network['b1'].tolist(),
    'b2': network['b2'].tolist(),
    'b3': network['b3'].tolist(),
}

with open('mnist_weight.json', 'w') as f:
    json.dump(data, f, separators=(',', ':'))
