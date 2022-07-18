import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import azureStorage from "azure-storage";
import intoStream from "into-stream";
import dotenv from "dotenv";
import { BlobServiceClient, BlobClient } from '@azure/storage-blob';
import   uuidv1 from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const port = process.env.PORT || 7001;
const instance = new express();
const containerName = "imagecontainer";
const __dirname = path.dirname(__filename);
dotenv.config();
instance.use(
  fileUpload({
    createParentPath: true,
  })
);

const AZURE_STORAGE_CONNECTION_STRING =
process.env.AZURE_STORAGE_CONNECTION_STRING;
const blobService = azureStorage.createBlobService(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

instance.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
instance.post("/fileupload", (request, response) => {
  if (!request.files) {
    return res.status(400).send("No files are received.");
  }

  const file = request.files.file;
  const path = __dirname + "/files/" + file.name;
  file.mv(path, (err) => {
    if (err) {
      return response.status(500).send(err);
    }
    return response.send({ status: "success", path: path });
  });
});

instance.post("/blobupload", async (request, response) => {
  
  if (!request.files) {
    return response.status(400).send("No files are received.");
  }

  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );
  const containerName = "safetyapp" + uuidv1();
  const containerClient =  blobServiceClient.getContainerClient(containerName);
  const createContainerResponse =  await containerClient.create();

  const blobName = request.files.myFile.name;
  const stream = intoStream(request.files.myFile.data);
  const streamLength = request.files.myFile.data.length;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.uploadStream(stream, streamLength);
  
  console.log(`/${containerName}/${blobName}`);
  console.log(`${uploadBlobResponse.requestId}`);
  console.log(`${blockBlobClient.url}`);

  return response.status(200).send({ path:blockBlobClient.url, message: 'File Uploaded Successfully'});
//   blobService.createBlockBlobFromStream(
//     containerName,
//     blobName,
//     stream,
//     streamLength,
//     (err) => {
//       if (err) {
//         response.status(500);
//         response.send({ message: "Error Occured" });
//         return;
//       }

//       response.status(200).send({message: 
// 'File Uploaded Successfully'});
//     }
//   );
});
// 12. 
instance.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});