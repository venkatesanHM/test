let AWS = require("aws-sdk");
AWS.config.update({region: "us-east-2", signatureVersion: "v4"});
const logger = require("pino")({level: process.env.LOG_LEVEL || "debug"});
let documentClient = new AWS.DynamoDB.DocumentClient();

/**
 * @description This method is used to retrieve multiple Records from Dynamo Table.
 * @param {params} obj Param will receive Dynamot table name to fetch recorda.
 * @method scanTable
 * @return {Promise} Return resolve/reject Promise with Database Items.
 */
let scanTable = async function (params) {
  return new Promise(async (res, rej) => {
    try {
      let items = await documentClient.scan(params).promise();
      logger.debug(items);
      res(items);
    } catch (e) {
      logger.error(e);
      rej(e);
    }
  });
};

/**
 * @description This method is used to insert Records into given Dynamo Table.
 * @param {tableName} obj Param will receive  Basic Info {TableName: "",Item: {}};
 * @method putItems
 * @return {Promise} Return resolve/reject Promise with true/error.
 */
async function putItems(params) {
  return new Promise(async (res, rej) => {
    try {
      items = await documentClient.put(params).promise();
      res(true);
    } catch (e) {
      logger.error(e);
      rej(e);
    }
  });
}

/**
 * @description This method is used to delete items from given Dynamo Table.
 * @param {tableName} obj Param will receive  Basic Info {TableName: "",Delete: {Objects:Array[]}};
 * @method putItems
 * @return {Promise} Return resolve/reject Promise with true/error.
 */
async function deleteItems(params) {
  return new Promise(async (res, rej) => {
    try {
      logger.debug(params);
      items = await documentClient.delete(params).promise();
      res(true);
    } catch (e) {
      logger.error(e);
      rej(e);
    }
  });
}

/**
 * @description This method is used to update Records into given Dynamo Table.
 * @param {tableName} obj Param will receive  Basic Info {TableName: "",Key: {},UpdateExpression:"",ExpressionAttributeValues:""};
 * @method updateItem
 * @return {Promise} Return resolve/reject Promise with updated Items.
 */
async function updateItem(params) {
  return new Promise(async (res, rej) => {
    try {
      logger.debug(params);
      const items = await documentClient.update(params).promise();
      res(items);
    } catch (e) {
      logger.error(e);
      rej(e);
    }
  });
}

/**
 * @description This method is used to retrieve multiple Records from Dynamo Table.
 * @param {tableName} str Param will receive Dynamot table name to fetch recorda.
 * @param {LastEvaluatedKey} str Param will receive for next Pagination purpose.
 * @method scanTable
 * @return {Promise} Return resolve/reject Promise with Database Items.
 */
let getItem = async function (params) {
  return new Promise(async (res, rej) => {
    try {
      let items = await documentClient.get(params).promise();
      logger.debug(items);
      res(items);
    } catch (e) {
      logger.error(e);
      rej(e);
    }
  });
};

module.exports = {scanTable, putItems, deleteItems, updateItem, getItem};
