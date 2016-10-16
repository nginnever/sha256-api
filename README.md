# sha256-api
A RESTful api for creating and indexing sha256 digests
This is just a tooling example

##URL

``http://149.56.133.176:3000``

##USAGE

####Endpoint

``http://149.56.133.176:3000/messages/``

####cURL Examples

####POST Request

Input: String

Adds sha256 digest to mongodb with value key: 'sha256(message)' value: 'message'

Response: JSON digest

```
curl -X POST -H "Content-Type: application/json" -d '{"message": "foo"}' http://149.56.133.176:3000/messages
>{
>   "digest": "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae"
>}
```

#### GET Request

Input: sha256(message)

Response: JSON message

```
curl http://149.56.133.176:3000/messages/2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae
>{
>   "message": "foo"
>}
```

#### GET 404ed

Input: not in the database

Response Headers: 404 not found

```
curl -i http://149.56.133.176:3000/messages/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
>HTTP/1.1 404 Not Found
>X-Powered-By: Express
>Content-Type: application/json; charset=utf-8
>Content-Length: 38
>ETag: W/"26-tGypDMtog/44ADhTxKWX/w"
>Date: Thu, 01 Sep 2016 07:09:42 GMT
>Connection: keep-alive
>
>{
>   "err_msg": "message not found"
>}
```
