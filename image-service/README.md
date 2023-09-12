# image-service

## Routes

_*GET /*_  

res: `Hello from a HandleFunc #1`

_*GET /upload*_  

req: form-data `image: <file>` params `?collection=<collection name>`  
res: json `message: string, id: string`

_*GET /display*_  

req: params `?_id=<image object id>&collection=<collection name>`  
res: Content-Type will be a file

_*DELETE /delete*_  

req: params `?_id=<image object id>&collection=<collection name>`  
req: json `message: string, id: string`
