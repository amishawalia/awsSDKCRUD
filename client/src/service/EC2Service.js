import axios from "axios";
const baseUrl = "http://localhost:3001/ec2";
const headers = {
  "Content-Type": "application/json",
};

class EC2Service {
  
  getInstances() {
    return axios.get(baseUrl + "/list");
  }

  changeStatus(state,id) {
        return axios.get(baseUrl + '/state/' + state + '/' + id);
  }
 
  createInstance(data) {
    return axios.post(baseUrl + "/create", data, { headers: headers });
  }

  deleteInstance(image,secId) {
      return axios.delete(baseUrl + '/delete/' + image + '/' + secId);
  }
}
export default new EC2Service();
