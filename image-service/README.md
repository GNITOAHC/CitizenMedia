# image-service

## Routes

_*GET /*_  

res: `Hello from a HandleFunc #1`

_*GET /upload*_  

req: form-data `image: <file>`  
res: json `message: string, id: string`

_*GET /display*_  

req: params `?_id=<image object id>`  
res: Content-Type will be a file

_*DELETE /delete*_  

req: x-www-urlencoded `id: string`  
req: json `message: string, id: string`
