if [[ -z $(docker ps -q -f name=traviscontainer) ]]; then
  echo "It's empty"
else
  docker rm -f $(docker ps -q -f name=traviscontainer)
fi
docker-compose up
