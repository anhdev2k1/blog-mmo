import axios from "axios";
import {
  CLOUD_NAME,
  CLOUD_FOLDER_UPLOAD,
  CLOUD_KEY_PRESET,
} from "./config";

export const uploadToCloudinary = ({
  file,
  fileType,
  successCallback,
  failureCallback,
}: any) => {
  const url = `https://api.cloudinary.com/v1_1/dsm3b0zvb/${fileType}/upload`;
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", 'fuxkslhv');
  data.append("tags", 'mmo_uploads');
  axios
    .post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => successCallback(response.data))
    .catch((err) => {
      const error = new Error(err);
      failureCallback({ event: error });
    });
};