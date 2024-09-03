import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class CicdDynamodbStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the DynamoDB table
    const table = new dynamodb.Table(this, 'EmployeesTable', {
      partitionKey: { name: 'employeeId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'timestamp', type: dynamodb.AttributeType.NUMBER },
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Only for dev environments
      tableName: 'EmployeesTable',
    });

    // Define a Global Secondary Index (GSI) on `employerId`
    table.addGlobalSecondaryIndex({
      indexName: 'EmployerIndex',
      partitionKey: { name: 'employerId', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL, // Project all attributes
    });

    // Outputs or other resources can be defined here
  }
}

const app = new cdk.App();
new CicdDynamodbStack(app, 'CicdDynamodbStack');
