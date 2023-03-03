# %% [markdown]
# IMPORT STATEMENTS

# %%
import boto3
import subprocess
import sys
import time

# %% [markdown]
# CONFIGURATION CODE

# %%
s3_client = boto3.client('s3')
db_client = boto3.client('dynamodb')
sns_client = boto3.client('sns')
lam_client = boto3.client('lambda')

# %%
# Creating S3 bucket for '.txt' files
s3txt_response = s3_client.create_bucket(
    Bucket='4452txtbuckett',
    ObjectOwnership='BucketOwnerEnforced'
)

s3lam_response = s3_client.create_bucket(
    Bucket='4452codebucket',
    ObjectOwnership='BucketOwnerEnforced'
)

# %%
# Creating SNS service
sns_response = sns_client.create_topic(
    Name='4452app2'
)

topARN = sns_response['TopicArn']

### Creating subcription to send email to user 
sns_sub_response = sns_client.subscribe(
    TopicArn=topARN,
    Protocol='email',
    Endpoint='4452vernellm@gmail.com',
    ReturnSubscriptionArn=True
)

# %%
# Creating Lambda Function

s3 = boto3.resource('s3')
s3.Bucket('4452codebucket').upload_file('/Users/vtmangum/4452func1.zip', '4452func1.zip')


lam_response = lam_client.create_function(
    FunctionName='4452func1',
    Runtime='python3.9',
    Role='arn:aws:iam::699582783397:role/4452funcrole0',
    Handler='string',
    Code={
        'S3Bucket': '4452codebucket',
        'S3Key': '4452func1.zip'
    }
)

time.sleep(10)

# %% [markdown]
# EXECUTION CODE

# %%
### READING IN TEXTFILE FOR CONVERSION

with open(sys.argv[1], 'r') as f:
    txtfile = f.read()

# %%
### UPLOADING FILE TO S3 BUCKET

put_response = s3_client.put_object(
    Body=txtfile,
    Bucket='4452txtbuckett',
    Key='Polly',
)


inv_response = lam_client.invoke(
    FunctionName='4452func1',
)
"""
### USING SNS TO SEND NOTIFICATION TO THE USER
### AFTER INSERTION INTO THE S3 BUCKET

sns_pub_response = sns_client.publish(
    TopicArn=topARN,
    Message='Textfile has been added to S3 bucket.',
    Subject='S3 Notification'
)

time.sleep(10)
"""

# %%
### CREATING DYNAMODB CLUSTER
### AND IMPORTING FROM S3 BUCKET

db_response = db_client.import_table(
    S3BucketSource={
        'S3Bucket': '4452txtbuckett'
    },
    InputFormat='DYNAMODB_JSON',
    TableCreationParameters={
        'TableName': '4452table1',
        'AttributeDefinitions': [
            {
                'AttributeName': 'ID',
                'AttributeType': 'N'
            },
        ],
        'BillingMode': 'PROVISIONED',
        'ProvisionedThroughput': {
            'ReadCapacityUnits': 123,
            'WriteCapacityUnits': 123
        },
        'KeySchema': [
            {
                'AttributeName': 'ID',
                'KeyType': 'HASH'
            },
        ]
    }
)

# %%
### CONVERTING TEXTFILE INTO MP3 FILE
### USING AMAZON POLLY AND THE AWS CLI

command = ["aws", "polly", "synthesize-speech", "--output-format", "mp3", "--voice-id", "Justin", "--text", txtfile, "voicefile.mp3"]

polly_conv = subprocess.run(command)

print("The exit code was: %d" % polly_conv.returncode)