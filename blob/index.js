const { BlobServiceClient, BlobClient } = require('@azure/storage-blob');
const { v1: uuidv1} = require('uuid');
require('dotenv').config()

async function main() {
    console.log('Azure Blob storage v12 - JavaScript quickstart sample');
       // "AZURE_STORAGE_CONNECTION_STRING": "https://devparentu.blob.core.windows.net?st=2020-07-17T16%3A49%3A37Z&se=2035-07-18T16%3A49%3A00Z&sp=racwdl&sv=2018-03-28&sr=c&sig=UQoZRxrJWCIaNiyBhgsjkm9WtmHosJAOh451mqmnj%2Fg%3D"

    // Quick start code goes here
    const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;
// console.log(AZURE_STORAGE_CONNECTION_STRING);
if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw Error("Azure Storage Connection string not found");
}
const AZURE_SAS = "https://devparentu.blob.core.windows.net/dev?st=2020-07-17T16%3A49%3A37Z&se=2035-07-18T16%3A49%3A00Z&sp=racwdl&sv=2018-03-28&sr=c&sig=UQoZRxrJWCIaNiyBhgsjkm9WtmHosJAOh451mqmnj%2Fg%3D";
const AZ ="https://devparentu.blob.core.windows.net:443/dev?st=2020-07-17T16%3A49%3A37Z&se=2035-07-18T16%3A49%3A00Z&sp=racwdl&sv=2018-03-28&sr=c&sig=UQoZRxrJWCIaNiyBhgsjkm9WtmHosJAOh451mqmnj%2Fg%3D"
//Create the BlobServiceClient object which will be used to create a container client
 console.log(AZURE_SAS);

  // const blobServiceClient = BlobServiceClient.fromConnectionString(
  //   AZURE_STORAGE_CONNECTION_STRING
  // );

  const { BlobServiceClient } = require("@azure/storage-blob");

const account = "devparentu";
const sas = "?st=2020-07-17T16%3A49%3A37Z&se=2035-07-18T16%3A49%3A00Z&sp=racwdl&sv=2018-03-28&sr=c&sig=UQoZRxrJWCIaNiyBhgsjkm9WtmHosJAOh451mqmnj%2Fg%3D";

const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net${sas}`);
console.log(`https://${account}.blob.core.windows.net/dev${sas}`)

  // const blobClient =  new BlobClient(AZ, null);
  // blobClient.GetPropertiesAsync();
// const blobClient = new BlobClient(AZ, null);
// blobClient.GetPropertiesAsync();

//  const blobServiceClient =
//          blobClient.GetParentBlobContainerClient().GetParentBlobServiceClient();

// const blobServiceClient = new BlobServiceClient(
//     AZURE_STORAGE_CONNECTION_STRING
//   );
  // Create a unique name for the container
  const containerName = "quickstart" + uuidv1();
  
  console.log("\nCreating container...");
  console.log("\t", containerName);
  console.log("\t", blobServiceClient.url);
  // Get a reference to a container
  const containerClient = blobServiceClient.getContainerClient("dev/parentu_videos");

  console.log("\t", containerClient.containerName);
  // Create the container
  // const createContainerResponse = await containerClient.create();
  // console.log(
  //   "Container was created successfully. requestId: ",
  //   createContainerResponse.requestId
  // );

  // Create a unique name for the blob
const blobName = "safety" + uuidv1() + ".txt";

// Get a block blob client
const blockBlobClient = containerClient.getBlockBlobClient(blobName);

console.log("\nUploading to Azure storage as blob:\n\t", blobName);

// Upload data to the blob
const data = "Hello, World!";
const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
console.log(
  "Blob was uploaded successfully. requestId: ",
  uploadBlobResponse.requestId
);
console.log("\nListing blobs...");

// List the blob(s) in the container.
// for await (const blob of containerClient.listBlobsFlat()) {
//   console.log("\t", blob.name);
// }

// Get blob content from position 0 to the end
// In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
// In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
const downloadBlockBlobResponse = await blockBlobClient.download(0);
console.log("\nDownloaded blob content...");
console.log(
  "\t",
  await streamToText(downloadBlockBlobResponse.readableStreamBody)
);
//Delete container
console.log("\nDeleting file...");
console.log("\nDeleting container...");
const deleteContainerResponse= await blockBlobClient.delete();
// const deleteContainerResponse = await containerClient.delete();
console.log(
  "Container was deleted successfully. requestId: ",
  deleteContainerResponse.requestId
);


}
// Convert stream to text
async function streamToText(readable) {
    readable.setEncoding('utf8');
    let data = '';
    for await (const chunk of readable) {
      data += chunk;
    }
    return data;
  }
main()
.then(() => console.log('Done'))
.catch((ex) => console.log(ex.message));