import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instanceservice from '../../service/EC2Service';
import '../s3/s3.css'

const ListInstance = () => {
    const [lists,setList] = useState([]);
    const navigate = useNavigate();
    const changeState = (state,id) =>{
        console.log(state,id);
        instanceservice.changeStatus(state,id).then(res => {
            navigate('/ec2/listinstance')
        }).catch(err => {
            console.log(err);
        })
    }
    const deleteInstance = (image,secId) => {
        console.log(image,secId);
        instanceservice.deleteInstance(image,secId).then(res => {
            console.log(res);
            navigate('/ec2/listinstance')
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        instanceservice.getInstances().then(res => {
            setList(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);
   
    return <>
         <div className='bucketlist'>
         {lists.length === 0 ? <p>No instance is created yet.</p> : <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Created At</th>
                        <th>InstanceId</th>
                        <th>InstanceType</th>
                        <th>state</th>
                        <th>Action</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                {lists.map(list => {
                    return list.Instances.map(inst => {
                        
                        return <tr key={inst.LaunchTime}>
                                <td>{inst.LaunchTime}</td>
                                <td>{inst.InstanceId}</td>
                                <td>{inst.InstanceType}</td>
                                <td>{inst.State.Name}</td>
                                <td>
                                    <button disabled={inst.State.Name === 'terminated' ? true : false} type="button" className="btn btn-danger" onClick={() => changeState(inst.State.Name === 'stopped' ? 'START' : 'STOP', inst.InstanceId)}>{inst.State.Name === 'stopped' ? 'START' : 'STOP'}</button>
                                </td>
                                <td>
                                    <button disabled={inst.State.Name === 'terminated' ? true : false} type="button" className="btn btn-danger" onClick={() => deleteInstance(inst.InstanceId, inst.SecurityGroups[0].GroupId)}>Terminate Instance</button>
                                </td>
                            </tr>
                    })
                })}
               
                </tbody>
            </table>
            </>}
        </div>
    </>
};
export default ListInstance;

