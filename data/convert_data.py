import sys
import gzip
import pickle
import numpy as np
import base64
import json

prefix = 't10k';
imagesFile = prefix + '-images-idx3-ubyte.gz'
labelsFile = prefix + '-labels-idx1-ubyte.gz'

if len(sys.argv) >= 2:
    outputCount = int(sys.argv[1])
    outputFile = prefix + '-%d.json' % outputCount
else:
    outputCount = 10000
    outputFile = prefix + '-all.json'

imagesHeader = 16
imageSize = 28 * 28
labelsHeader = 8

with gzip.open(imagesFile, 'rb') as f:
    images = np.frombuffer(f.read(), np.uint8, offset=imagesHeader)
    images = images.reshape(-1, imageSize)

with gzip.open(labelsFile, 'rb') as f:
    labels = np.frombuffer(f.read(), np.uint8, offset=labelsHeader)

with open('mnist_weight.pkl', 'rb') as f:
    network = pickle.load(f)

W1, W2, W3 = network['W1'], network['W2'], network['W3']
b1, b2, b3 = network['b1'], network['b2'], network['b3']

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def softmax(a):
    c = np.max(a)
    exp_a = np.exp(a - c)
    sum_exp_a = np.sum(exp_a)
    y = exp_a / sum_exp_a
    return y

def predict(network, x):
    x1 = x.astype(np.float32) / 255.0
    a1 = np.dot(x1, W1) + b1
    z1 = sigmoid(a1)
    a2 = np.dot(z1, W2) + b2
    z2 = sigmoid(a2)
    a3 = np.dot(z2, W3) + b3
    y = softmax(a3)
    return y

data = []
for i in range(outputCount):
    image = base64.b64encode(images[i]).decode('utf-8')
    y = predict(network, images[i])
    p = np.argmax(y)
    data.append({
        'id': prefix + '-%d' % (i + 1),
        'image': image,
        'label': labels[i].item(),
        'result': p.item()
    })

with open(outputFile, 'w') as f:
    json.dump(data, f, separators=(',', ':'))
