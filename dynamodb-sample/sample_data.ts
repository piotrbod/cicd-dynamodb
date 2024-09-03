import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { fromSSO } from '@aws-sdk/credential-provider-sso';
import { marshall } from '@aws-sdk/util-dynamodb';

// Set the SSO profile name
const ssoProfileName = 'your-aws-profile';

// Initialize the DynamoDB client with SSO credentials
const dynamodbClient = new DynamoDBClient({
  credentials: fromSSO({
    profile: ssoProfileName
  }),
  region: 'us-east-1'
});

// Sample data
const data = [
  { employeeId: 'e1', timestamp: 1, employerId: 'emp1', email: 'alice@company1.com', name: 'Alice' },
  { employeeId: 'e2', timestamp: 2, employerId: 'emp1', email: 'bob@company1.com', name: 'Bob' },
  { employeeId: 'e3', timestamp: 3, employerId: 'emp2', email: 'carol@company2.com', name: 'Carol' },
  { employeeId: 'e4', timestamp: 4, employerId: 'emp2', email: 'dave@company2.com', name: 'Dave' }
];

// Function to insert sample data
const insertSampleData = async () => {
  for (const item of data) {
    try {
      await dynamodbClient.send(new PutItemCommand({
        TableName: 'EmployeesTable',
        Item: marshall(item) // Correctly marshal the item to DynamoDB format
      }));
      console.log(`Inserted item: ${item.employeeId}`);
    } catch (error) {
      console.error(`Failed to insert item: ${item.employeeId}`, error);
    }
  }
};

// Run the function
insertSampleData().then(() => {
  console.log("Sample data inserted successfully.");
}).catch((error) => {
  console.error("Failed to insert sample data.", error);
});
