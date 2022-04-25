# awsSDKCRUD

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# To run the app in your machine you have to install docker first
Then you need to pull two images which can be done by this two commands 
sudo docker pull amishainnogeeks/sdkfrontend
sudo docker pull amishainnogeeks/sdkbackend

Then to make container out of it use 
sudo docker run -p 3000:3000 --name <container name>  amishainnogeeks/sdkfrontend  for  client side app
sudo docker run --name  <container name> -p 3001:3001 -e AWS_ACCESS_KEY_ID=<key> -e AWS_SECRET_ACCESS_KEY=<key> amishainnogeeks/sdkbackend
Then Select the instance, in details go to the securtiy tab.Select the security group.Edit the inbound rules and add port 3000 & 3001 and SAVE.  
Your app will be running if you will fill the aws credentials in the last command!

# Runs the app in the development mode.
Open http://35.154.97.1:3000/ to view it in your browser.

There are 2 sdk cruo functionalities in the app. 
  # CRUD for ec2 instances and s3 buckets
  
  ## Routes for s3
  
  1. For listing buckets 
  GET METHOD
  http://35.154.97.1:3000/s3/listbuckets
  
  2. For creating buckets 
  POST METHOD
    http://35.154.97.1:3000/s3/create
  For Postman json: 
  {
    "name":"<bucket_name>"
  }

  3.For listing objects inside Bucket 
  GET METHOD
      http://35.154.97.1:3000/s3/listobjects/<bucket_name>
  For Postman url:http://35.154.97.1:3000/s3/listobjects/<name of the bucket>
  
   4.For deleting Bucket
    DELETE METHOD
      http://35.154.97.1:3000/s3/delete/<bucket_name>
  For Postman url:http://35.154.97.1:3000/s3/delete/<name of the bucket>

  
## Routes for EC2 
  
  1. For listing instances
  GET METHOD
   http://35.154.97.1:3000/ec2/list
  
  2. For creating instances
  POST METHOD
    http://35.154.97.1:3000/ec2/create
    For Postman json: 
    {
      "key":"<key pair name to be created>",
      "gdesc":"< Description of the group>",
      "gname":"<Name of the securiy group to be created>",
      "iname":"<Name of the instance in the tag field>"
    }
  
  3. For changing the state of instance
  GET METHOD
        http://35.154.97.1:3000/ec2/state/<state which can only be 'START/STOP'>/<instance id>
  
  4. For deleting instance
  DELETE METHOD
      http://35.154.97.1:3000/ec2/delete/<image id of the machine>/<security group id>
      For Postman url:http://35.154.97.1:3000/s3/delete/<name of the bucket>
  
  
