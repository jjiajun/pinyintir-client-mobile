/* eslint-disable no-param-reassign */

import { Buffer } from 'buffer';

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  const byteCharacters = Buffer.from(b64Data, 'base64').toString('ascii');
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i += 1) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

export default function imagetoblob(base64String) {
  // Get the content type of the image
  const contentType = 'image/jpeg'; // In this case "image/gif"
  // Convert it to a blob to upload
  return b64toBlob(base64String, contentType);
}
