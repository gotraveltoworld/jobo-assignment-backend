# jubo-backend

jubo-backend

Instruction
> Please implement the following features in backend
> - an endpoint to get all patients
> - an endpoint to get one order
> - an endpoint to add or update order by patient's ID
>

## Running application on localhost

### Setup your environment variables at first

How to set up this application on your localhost? The following steps bring you to step by step.

1. Make sure your node version is `v20.11.0`.
2. Install libraries by `npm install`.
3. Take a look configures(`config/localhost.cjs`) that under config folder.

MACOS
- run `chmod ug+x .husky/*`, ensure `husky` can work as normal.

After you have set the project up, the followings steps can help you to run it on localhost.

### Linux Or MACOS

1. Set credentials via environment variable(On linux or MACOS).

    ```bash
    # DB connection AND port
    export DB_HOST=127.0.0.1
    export DB_UMS_PORT=5432
    export DB_USER=user
    export DB_PWD=password
    export PORT=3000
    ```
2. Run the application by `npm run start:local`, it will be running.

### Windows

1. Set credentials via environment variable(On linux or MACOS).

    ```shell
    # DB connection AND port
    set DB_HOST=127.0.0.1
    set DB_UMS_PORT=5432
    set DB_USER=user
    set DB_PWD=password
    set PORT=3000
    ```

2. Run the application by `npm run start:local`, it will be running.

### Database (docker)

Run postgreSQL by dock-compose,
```shell
docker-compose up # run service and database on docker
```

### API

Postman Collection
```JSON
{
	"info": {
		"_postman_id": "fad7a788-a8a2-478a-a069-9910f36b231a",
		"name": "Jubo",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "18854559"
	},
	"item": [
		{
			"name": "Get Patient List",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "{{host}}/patients",
					"host": [
						"{{host}}"
					],
					"path": [
						"patients"
					]
				}
			},
			"response": []
		},
		{
			"name": "Get Order By Id",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "{{host}}/orders/:orderId",
					"host": [
						"{{host}}"
					],
					"path": [
						"orders",
						":orderId"
					],
					"variable": [
						{
							"key": "orderId",
							"value": "{{orderId}}"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "Update Order",
			"event": [
				{
					"listen": "test",
					"script": {
						"exec": [
							"pm.test('Success', function() {",
							"    pm.response.to.have.status(200);",
							"    const { data } = pm.response.json();",
							"    const { orderId } = data;",
							"    ",
							"    if (orderId) {",
							"        console.info('orderId', orderId);",
							"        pm.collectionVariables.set('orderId', orderId);",
							"    }",
							"        ",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n    \"patientId\": \"d9ce8ee8-42c2-4a8a-9b0b-c3bf456e9d9d\",\n    \"message\": \"超過120請施打8u\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{host}}/orders",
					"host": [
						"{{host}}"
					],
					"path": [
						"orders"
					]
				}
			},
			"response": []
		}
	],
	"event": [
		{
			"listen": "prerequest",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		},
		{
			"listen": "test",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		}
	],
	"variable": [
		{
			"key": "host",
			"value": "http://localhost:3000",
			"type": "string"
		},
		{
			"key": "orderId",
			"value": ""
		}
	]
}
```