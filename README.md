# Express api
Express api using nodejs version `16.x`.

## Getting started
- **Clone This Repository Using HTTPS** 
```bash
git clone https://github.com/firmanJS/nodejs-kubernetes.git
cd existing_repo
```

## DIAGRAM
![diagram](https://github.com/firmanJS/nodejs-kubernetes/blob/main/diagram.png)

### Run Application
running application three methods manually, using docker or via Makefile
* Manually :

```bash
# Install package via npm or yarn
yarn install

```

* Via Make :

```bash

# Build application
make docker-build

# run application after build
make docker-start

# Stop aplication
CTRL+C 
# then 
make docker-down

# stop application and others service
make docker-stop

# run seed
make docker-seed
```

### Deploy Application
```bash
kubectl apply -f deployment
```

### Users dummy

```bash

Admin 
username :admin
password: admin

User
username :user
password: user
```
