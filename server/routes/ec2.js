const express = require('express')
const router = express.Router()
const AWS = require('aws-sdk');
// Set the credentials
const SESConfig = {
  apiVersion: "latest",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,  
  region: "ap-south-1"
}
console.log(SESConfig);
AWS.config.update(SESConfig);
// // Set the region
// AWS.config.update({region: 'ap-south-1'});
const ec2 = new AWS.EC2();

// list instances
router.get('/list',(req,res) => {

    let params = {
        DryRun: false
      };
      
    ec2.describeInstances(params, function(err, data) {
        if (err) {
          console.log("Error", err.stack);
        } else {
          console.log("Success", JSON.stringify(data));
          res.send(data.Reservations);
        }
      });

});

// start/stop instance
router.get('/state/:state/:id',(req,res) => {
    var params = {
        InstanceIds: [`${req.params.id}`],
        DryRun: true
      };
      let state = `${req.params.state}`
      if (state.toUpperCase() === "START") {
        // Call EC2 to start the selected instances
        ec2.startInstances(params, function(err, data) {
          if (err && err.code === 'DryRunOperation') {
            params.DryRun = false;
            ec2.startInstances(params, function(err, data) {
                if (err) {
                  console.log("Error", err);
                } else if (data) {
                  console.log("Success", data.StartingInstances);
                  res.send(data.StartingInstances)
                }
            });
          } else {
            console.log("You don't have permission to start instances.");
          }
        });
      } else if (state.toUpperCase() === "STOP") {
        // Call EC2 to stop the selected instances
        ec2.stopInstances(params, function(err, data) {
            res.send(err);
          if (err && err.code === 'DryRunOperation') {
            params.DryRun = false;
            ec2.stopInstances(params, function(err, data) {
                if (err) {
                  console.log("Error", err);
                } else if (data) {
                  console.log("Success", data.StoppingInstances);
                  res.send(data.StoppingInstances)
                }
            });
          } else {
            console.log("You don't have permission to stop instances");
          }
        });
      }
});


// create an instance
router.post('/create', (req,res) => {

    // create a key pair
    let params = {
        KeyName: `${req.body.key}`
    };
     
    ec2.createKeyPair(params, function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log(JSON.stringify(data));
    }
    });

    //create security group
    // Variable to hold a ID of a VPC
    let vpc = null;

    // Retrieve the ID of a VPC
    ec2.describeVpcs(function(err, data) {
    if (err) {
        console.log("Cannot retrieve a VPC", err);
    } else {
        vpc = data.Vpcs[0].VpcId;
        let paramsSecurityGroup = {
            Description: `${req.body.gdesc}`,
            GroupName: `${req.body.gname}`,
            VpcId: vpc
        };
        // Create the instance
        ec2.createSecurityGroup(paramsSecurityGroup, function(err, data) {
            if (err) {
            console.log("Error", err);
            } else {
            let SecurityGroupId = data.GroupId;
            console.log("Success", SecurityGroupId);
            let paramsIngress = {
                GroupId: `${SecurityGroupId}`,
                IpPermissions:[
                    {
                    IpProtocol: "tcp",
                    FromPort: 80,
                    ToPort: 80,
                    IpRanges: [{"CidrIp":"0.0.0.0/0"}]
                },
                {
                    IpProtocol: "tcp",
                    FromPort: 22,
                    ToPort: 22,
                    IpRanges: [{"CidrIp":"0.0.0.0/0"}]
                }
                ]
            };
            ec2.authorizeSecurityGroupIngress(paramsIngress, function(err, data) {
                if (err) {
                console.log("Error", err);
                } else {
                console.log("Ingress Successfully Set", data);
                }
            });
            }
        });
    }
    });


    // finally create instance
    let instanceParams = {
        ImageId: 'ami-0851b76e8b1bce90b', 
        InstanceType: 't2.micro',
        KeyName: `${req.body.key}`,
        MinCount: 1,
        MaxCount: 1
    };
     
     // Create a promise on an EC2 service object
    let instancePromise = ec2.runInstances(instanceParams).promise();
     
     // Handle promise's fulfilled/rejected states
    instancePromise.then(
       function(data) {
        console.log(data);
        var instanceId = data.Instances[0].InstanceId;
        console.log("Created instance", instanceId);
        // Add tags to the instance
        tagParams = {Resources: [instanceId], Tags: [
            {
               Key: 'Name',
               Value: `${req.body.iname}`
            }
        ]};
         // Create a promise on an EC2 service object
        var tagPromise = ec2.createTags(tagParams).promise();
         // Handle promise's fulfilled/rejected states
        tagPromise.then(
           function(data) {
            console.log("Instance tagged");
            res.send(data)
           }).catch(
            function(err) {
            console.error(err, err.stack);
           });
       }).catch(
        function(err) {
        console.error(err, err.stack);
       });
});

router.delete('/delete/:image/:secId',(req,res) => {
    let  params = {
        InstanceIds: [ `${req.params.image}`]
      };
      ec2.terminateInstances(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        } // an error occurred
        else { 
            console.log(data);
            res.send(data)
        }           // successful response
      });
    var secparams = {
        GroupId: `${req.params.secId}`
     };
     
     // Delete the security group
     ec2.deleteSecurityGroup(secparams, function(err, data) {
        if (err) {
           console.log("Error", err);
        } else {
           console.log("Security Group Deleted");
           
        }
     });
});
module.exports = router;