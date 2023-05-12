#!/bin/bash

export MSYS_NO_PATHCONV=0

mongo <<EOF
var config = {
    "_id": "dbrs",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "mongo1:27017",
            "priority": 3
        },
        {
            "_id": 2,
            "host": "mongo2:27017",
            "priority": 2
        },
        {
            "_id": 3,
            "host": "mongo3:27017",
            "priority": 1
        }
    ]
};
rs.initiate(config, { force: true });
rs.status();

EOF

# Without it replica set members don't have time to determine the main replica set and next commands won't work
sleep 45

mongo <<EOF

use mvcdb

if(!(db.getUser('mvcuser'))){
db.createUser( { user: 'mvcuser',
pwd: 'mvcpwd',
roles: [ { role: "readWrite", db: 'mvcdb' } ]
} );
print("Database user was created successfully");
} else{
print("Database user already exists");
}

EOF