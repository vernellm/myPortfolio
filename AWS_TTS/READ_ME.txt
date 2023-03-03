### INSTRUCTIONS FOR INSTALLATION AND DEPLOYMENT ###

## Installation 

In order to deploy this application, you need to have the following things:

	1. AWS CLI must be installed on your computer/laptop
	2. In the code, you must change the email address for the SNS to send the alert to the
	   correct email address (your own email address).
	3. You must create a .txt file to pass in on the command line for parsing and conversion.
	4. Be sure to have your AWS configuration setup so the code has permission to access your account.

## Deployment 

In order to deploy this application and use it, you must type this syntax into your terminal.

`python3 AWSA3.py <example.txt>`

The .txt file can be any of your choosing but it has to be a '.txt' file in order for the application to run without error. 