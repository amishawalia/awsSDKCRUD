import { useNavigate, useParams } from "react-router-dom";
import bucketservice from '../../service/S3Service';
const CreateFile = () => {

    const params = useParams()
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(e.target[0].files[0].name);
        var tmppath = (window.URL || window.webkitURL).createObjectURL(e.target[0].files[0]);
        console.log(tmppath);
        const data = {
            name:params.name,
            file:tmppath
        }
        bucketservice.uploadFile(data).then(res => {
            navigate(`/s3/list/${params.name}`)
        }).catch(err => {
            console.log(err);
        })
    }

    return <>
        <div className='bucketlist'>
        <h3>Upload a new file</h3>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="myfile">Select a file:</label><br/>
            <input type="file" id="myfile" name="myfile"/>
          </div>
          <br/>
          <div className="form-group">
            <input type="submit" value="Upload File" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </>
};

export default CreateFile;