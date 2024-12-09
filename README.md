## To pull the latest files, to the local mongodb and the images

`npm run mongodb:pull`

For this to work this has to be set in .env

DATABASE_URI=mongodb://127.0.0.1/tnorbert-payload
REMOTE_DATABASE_URI="mongodb://root:pass@10.metallbloadbalancerip.28:27017,10.metallbloadbalancerip.29:27017/tnorbert-payload?authSource=admin&replicaSet=rs0&readPreference=primary"

This will drop the local database and pulls the remote database values. Also downloads the images with scp
