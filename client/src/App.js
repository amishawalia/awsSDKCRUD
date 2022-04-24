import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import S3 from './Components/s3/s3';
import EC2 from './Components/ec2/ec2';
import CreateBucket from './Components/s3/Create';
import ListBucket from './Components/s3/List';
import ListObjects from './Components/s3/ListObjects';
import CreateFile from './Components/s3/CreateFile';
import CreateInstance from './Components/ec2/CreateInstance';
import ListInstance from './Components/ec2/ListInstance';

function App() {
  return (
    <div className="container">
      <Header/>
      <h1>Welcome to SDK CRUD APP</h1>
      <Routes>
        <Route path='/s3/*' element={<S3/>}>
          <Route path='createbucket' element={<CreateBucket/>}/>
          <Route path='listbucket' element={<ListBucket/>}/>
          <Route path='list/:name' element={<ListObjects/>}/>
          <Route path='upload/:name' element={<CreateFile/>}/>
        </Route>

        <Route path='/ec2/*' element={<EC2/>}>
          <Route path='createinstance' element={<CreateInstance/>}/>
          <Route path='listinstance' element={<ListInstance/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
