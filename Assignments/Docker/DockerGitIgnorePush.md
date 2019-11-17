docker tag week04-docker-composer_main:latest charliecalvert/gitignore_main:try
$ docker push charliecalvert/gitignore_main:try

docker tag week04-docker-composer_route-tester:latest charliecalvert/gitignore_router:try
docker push charliecalvert/gitignore_router:try

docker tag week04-docker-composer_system-environment:latest charliecalvert/gitignore_system:try
docker push charliecalvert/gitignore_system:try

## Pull GitIgnore

docker network create -d bridge elfnet

docker pull charliecalvert/gitignore_main:try
docker container run --name main -d -p 30025:30025 --network elfnet charliecalvert/gitignore_main:try

docker pull charliecalvertgitignore_router:try
docker container run --name router -d -p 30029:30029 --network elfnet charliecalvert/gitignore_router:try

docker pull charliecalvertgitignore_system:try
docker container run --name system-environment -d -p 30028:30028 --network elfnet charliecalvert/gitignore_system:try
