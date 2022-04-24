import axios from "axios";
const baseUrl = "http://localhost:3000/s3";
const headers = {
  "Content-Type": "application/json",
};

class S3Service {
  
  getBuckets() {
    console.log(headers);
    return axios.get(baseUrl + "/listbuckets");
  }
  getObjects(name) {
    return axios.get(baseUrl + "/listobjects/" + name);
  }
  createBucket(data) {
    return axios.post(baseUrl + "/create", data, { headers: headers });
  }
  uploadFile(data) {
      return axios.post(baseUrl + '/upload', data, { headers: headers })
  }
  deleteBucket(name) {
      return axios.delete(baseUrl + '/delete/' + name);
  }
}
export default new S3Service();
