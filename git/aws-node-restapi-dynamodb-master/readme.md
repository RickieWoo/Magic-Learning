REST API with NodeJS, Express and DynanoDB 

What you will need to install
Python/PIP
AWS CLI - http://docs.aws.amazon.com/cli/latest/userguide/installing.html
DynamoDB - http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html

To run local DynamoDB instance
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb

To query local instance, you will need to install AWS CLI and you can point to local instance with parameter --endpoint-url
aws dynamodb list-tables --endpoint-url http://localhost:8000