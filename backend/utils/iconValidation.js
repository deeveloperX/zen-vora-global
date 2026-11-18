const MAX_ICON_BYTES = 128 * 1024;
const MAX_ICON_DATA_URI_LENGTH = Math.ceil(MAX_ICON_BYTES / 3) * 4 + 30;

const iconSignatures = {
  'image/png': (buffer) => buffer.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex')),
  'image/jpeg': (buffer) => buffer.subarray(0, 3).equals(Buffer.from('ffd8ff', 'hex')),
  'image/webp': (buffer) => (
    buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buffer.subarray(8, 12).toString('ascii') === 'WEBP'
  ),
};

function isCustomIconDataUri(value) {
  if (typeof value !== 'string' || value.length > MAX_ICON_DATA_URI_LENGTH) {
    return false;
  }

  const match = /^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/]+={0,2})$/.exec(value);
  if (!match) {
    return false;
  }

  const [, contentType, base64] = match;
  const buffer = Buffer.from(base64, 'base64');

  return buffer.length > 0 &&
    buffer.length <= MAX_ICON_BYTES &&
    buffer.toString('base64') === base64 &&
    iconSignatures[contentType](buffer);
}

module.exports = { isCustomIconDataUri };
