import gzip
import numpy as np
import base64
import json

imagesFile = 't10k-images-idx3-ubyte.gz'
labelsFile = 't10k-labels-idx1-ubyte.gz'

outputFile = 't10k-all.json'
outputCount = 10000

imagesHeader = 16
imageSize = 28 * 28
labelsHeader = 8

with gzip.open(imagesFile, 'rb') as f:
    images = np.frombuffer(f.read(), np.uint8, offset=imagesHeader).reshape(-1, imageSize)

with gzip.open(labelsFile, 'rb') as f:
    labels = np.frombuffer(f.read(), np.uint8, offset=labelsHeader)

data = []
for i in range(outputCount):
    image = base64.b64encode(images[i]).decode('utf-8')
    data.append({ 'data': image, 'label': labels[i].item() })

with open(outputFile, 'w') as f:
    json.dump(data, f, separators=(',', ':'))
