import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import bucketservice from '../../service/S3Service'

const ListObjects = () => {
    const params = useParams();
    const [lists,setList] = useState([]);
    useEffect(() => {
        bucketservice.getObjects(params.name).then(res => {
            console.log(res);
            setList(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);
    return <>
        <div className='bucketlist'>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Modified At</th>
                    </tr>
                </thead>
                <tbody>
                    {lists.map(list => {
                        return <tr key={list.LastModified}>
                                <td>{list.Key}</td>
                                <td>{list.LastModified}</td>
                            </tr>
                    })}
                    {lists.length === 0 && <p>No file to show</p>}
                </tbody>
            </table>
        </div>
    </>
}

export default ListObjects