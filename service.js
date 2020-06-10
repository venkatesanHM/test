let AWS = require("aws-sdk");
AWS.config.update({region: "us-east-2", signatureVersion: "v4"});
const logger = require("pino")({level: process.env.LOG_LEVEL || "debug"});
let s3 = new AWS.S3();

/**
 * @description This method is used to Call Get Signed URL to upload Files.
 * @param {params} obj Param will receive {bucketName, key,tag,urlExpiry}.
 * @method getSignedPutUrl
 * @return {Promise} Return Self signed URL with 10 min expire time.
 */
let getSignedPutUrl = function (params) {
  try {
    logger.debug(params);
    const url = s3.getSignedUrl("putObject", params);
    return url;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

/**
 * @description This method is used to Call Get Get Signed URL For Reading file.
 * @param {params} obj Param will receive {bucketName, key}.
 * @method getSignedGetUrl
 * @return {Promise} Return Self signed URL with 10 min expire time.
 */
let getSignedGetUrl = function (params) {
  try {
    logger.debug(params);
    const url = s3.getSignedUrl("getObject", params);
    return url;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

/**
 * @description This method is used to delete a specific
 *  Object From S3 using headObject method.
 * @param {bucketName} string Param will receive S3 Bucket Name.
 * @param {asset} obj Param will receive Individual Asset Details.
 * @method deleteItem
 * @return {Promise} Return Json Object of API Result by wrapping Promise.
 */
let deleteItem = function (params) {
  return new Promise((res, rej) => {
    try {
      logger.debug(params);
      s3.deleteObjects(params, function (err, data) {
        if (data) {
          logger.debug(data);
          res(data);
        } else {
          logger.error(err);
          rej();
        }
      });
    } catch (error) {
      logger.error(error);
      rej();
    }
  });
};

module.exports = {
  getSignedPutUrl,
  getSignedGetUrl,
  deleteItem,
};
