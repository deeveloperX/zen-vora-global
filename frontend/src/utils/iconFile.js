const MAX_ICON_BYTES = 128 * 1024;
const SUPPORTED_ICON_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);

export function readIconFile(file) {
  if (!SUPPORTED_ICON_TYPES.has(file.type)) {
    return Promise.reject(new Error("Choose a PNG, JPEG, or WebP image."));
  }

  if (file.size === 0 || file.size > MAX_ICON_BYTES) {
    return Promise.reject(new Error("Icon images must be 128 KB or smaller."));
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Could not read the selected icon image."));
      }
    };
    reader.onerror = () => reject(new Error("Could not read the selected icon image."));
    reader.readAsDataURL(file);
  });
}
