import { Client, Graphql } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") 
  .setProject("6506b95c5bb71620d8b7"); 

export const graphql = new Graphql(client);