import {useState } from "react";
import { useNavigate } from "react-router-dom";
import bucketservice from '../../service/S3Service'
const CreateBucket = () => {

   const [name,setName] = useState('') 
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const bucket = {
      name:name
    };
    bucketservice.createBucket(bucket).then((res) => {
      if (res.status === 200) {
        navigate("/s3/listbucket");
      }
    });
  };
  
  return (
    <>
      <div className='bucketlist'>
        <h3>Create a new bucket</h3>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="enter bucket name"
              className="form-control"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>
          <br/>
          <div className="form-group">
            <input type="submit" value="Add Bucket" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateBucket;
