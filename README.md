# scrap-metadata

This Azure function is developed using VS code extension.
To install the extension Launch VS Code Quick Open (Ctrl+P) and run the command "ext install ms-azuretools.vscode-azurefunctions".
Use this link for more details https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions

This is a HTTP Trigger function.

To run deploy this function use the same extension in VS code, Sign In to your azure account, click on deploy button in VS code.
Then a function URL will be generated, POST the URL from which we need to scrap the data. The response of this function is the scrapped data from the URL.

To install the npm modules
we have two methods (refer the link below)
1. Deploying with dependencies
2. Using Kudu

https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node?tabs=v2#dependency-management
