import { readIconFile } from "../../utils/iconFile";

export default function IconUploadField({ id, value, onChange, onError }) {
  const handleFileChange = async (event) => {
    const [file] = event.target.files || [];
    event.target.value = "";

    if (!file) return;

    try {
      onChange(await readIconFile(file));
    } catch (error) {
      onError(error.message);
    }
  };

  return (
    <div className="mt-3">
      <label htmlFor={id} className="form-label fw-semibold small text-secondary">
        Upload custom icon
      </label>
      <input
        id={id}
        type="file"
        className="form-control"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileChange}
      />
      <div className="form-text">PNG, JPEG, or WebP; maximum size 128 KB.</div>
      {value?.startsWith("data:image/") && (
        <img
          src={value}
          alt="Selected custom icon preview"
          className="mt-2"
          style={{ width: 40, height: 40, objectFit: "contain" }}
        />
      )}
    </div>
  );
}
