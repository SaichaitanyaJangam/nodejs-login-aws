const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient({
    region: "us-east-1" // 🔴 change to your region
});

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const { email, password } = body;

        const params = {
            TableName: "Users",
            Key: { email }
        };

        const data = await dynamo.get(params).promise();

        if (!data.Item) {
            return response(404, "User not found");
        }

        if (data.Item.password === password) {
            return response(200, "Login successful");
        } else {
            return response(401, "Invalid credentials");
        }

    } catch (error) {
        return response(500, error.message);
    }
};

const response = (statusCode, message) => {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ message })
    };
};
