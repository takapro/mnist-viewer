const fs = require('fs');
const zlib = require('zlib');

const imagesFile = 't10k-images-idx3-ubyte.gz';
const labelsFile = 't10k-labels-idx1-ubyte.gz';

const outputCount = 10000;

const imagesHeader = 16;
const imageSize = 28 * 28;
const labelsHeader = 8;

const images = zlib.gunzipSync(fs.readFileSync(imagesFile));
const labels = zlib.gunzipSync(fs.readFileSync(labelsFile));

const data = [];
for (let i = 0; i < outputCount; i++) {
  const imageOffset = imagesHeader + i * imageSize;
  const imageData = images.slice(imageOffset, imageOffset + imageSize);
  const label = labels[labelsHeader + i];
  data.push({
    data: imageData.toString('base64'),
    label: label
  });
}

process.stdout.write(JSON.stringify(data));
