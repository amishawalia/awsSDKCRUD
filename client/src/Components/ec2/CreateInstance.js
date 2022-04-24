import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instanceservice from '../../service/EC2Service'

const CreateInstance = () => {
    const [key,setKey] = useState('');
    const [groupName, setGroupName] = useState('');
    const [groupDesc, setGroupDesc] = useState('');
    const [instName,setInstName] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            key:key,
            gname:groupName,
            gdesc:groupDesc,
            iname:instName
        }; 
        console.log(data);
        instanceservice.createInstance(data).then(res => {
            navigate('/ec2/listinstance');
        }).catch(err => {
            console.log(err);
        })
    }
    return <>
        <div className='bucketlist'>
        <h3>Create a new instance</h3>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="name">KeyPair Name</label>
            <input
              type="text"
              name="name"
              id="key"
              placeholder="enter key pair name"
              className="form-control"
              value={key}
              onChange={(e) =>
                setKey(e.target.value)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Group Name</label>
            <input
              type="text"
              name="name"
              id="gname"
              placeholder="enter group name"
              className="form-control"
              value={groupName}
              onChange={(e) =>
                setGroupName(e.target.value)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Group Description</label>
            <input
              type="text"
              name="name"
              id="desc"
              placeholder="write group description"
              className="form-control"
              value={groupDesc}
              onChange={(e) =>
                setGroupDesc(e.target.value)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Instance Name</label>
            <input
              type="text"
              name="name"
              id="instance"
              placeholder="enter instance name"
              className="form-control"
              value={instName}
              onChange={(e) =>
                setInstName(e.target.value)
              }
            />
          </div>
          <br/>
          <div className="form-group">
            <input type="submit" value="Create Instance" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </>
};
export default CreateInstance;