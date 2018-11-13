```
curl -X POST \
  http://localhost:8080/api/v1/courses/416d6d52-dac3-4812-8b7e-3e158d23f10d \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 05e0aae1-4b3c-c19d-0386-33e740478cda' \
  -H 'x-user-id: 416d6d52-dac3-4812-8b7e-3e158d23f10b' \
  -d '{
		"sessionId": "416d6d52-dac3-4812-8b7e-3e158d23f10c",
        "totalModulesStudied": 1,
        "averageScore": 79.6,
        "timeStudied": 180132220
}'
```