import { inspect } from 'util';
import fetch from 'node-fetch';

import {
  PostConfirmationTriggerEvent,
  PostConfirmationTriggerHandler,
} from 'aws-lambda';

import {
  CognitoIdentityProviderClient,
  ListUserPoolClientsCommand,
  ListUserImportJobsCommandInput,
  ListUserPoolClientsCommandOutput
} from "@aws-sdk/client-cognito-identity-provider";

export const handler: PostConfirmationTriggerHandler = (event: PostConfirmationTriggerEvent, context, callback) => {

    console.log('TEST request', event.request.userAttributes['custom:vendorID'])

    //check vendorID attribute existance
    if (event.request.userAttributes['custom:vendorID']) {
      (async () => {
         const client = new CognitoIdentityProviderClient({});
         const params: ListUserImportJobsCommandInput = {
          UserPoolId: event.userPoolId,
          MaxResults: 100
        };
        const command = new ListUserPoolClientsCommand(params);
        try {
          const data: ListUserPoolClientsCommandOutput = await client.send(command);
          console.log(data)
        } catch (error) {
          // error handling.
        } finally {
          // finally.
        }
      });
    } else {
      callback(null, inspect(event));
    }
};
