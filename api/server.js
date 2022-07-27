import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import azureStorage from "azure-storage";
import intoStream from "into-stream";
import { BlobServiceClient, BlobClient } from '@azure/storage-blob';
import   uuidv1 from 'uuid';
import cors from 'cors';
import formidable from 'formidable';
import fs from 'fs';
import dotenv from "dotenv";
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const port = process.env.PORT || 7001;
const instance = new express();
//const containerName = "imagecontainer";
const __dirname = path.dirname(__filename);
instance.use(cors());
instance.use(
  fileUpload({
    createParentPath: true,
  })
);
const account = process.env.AZURE_ACCOUNT;
const sas = process.env.AZURE_SAS;
const containerName = process.env.AZURE_CONTAINER;

const blobService = azureStorage.createBlobService(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

instance.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
instance.get("/url", (req, res, next) => {
  console.log("url test")
  res.json(["Tony","Lisa","Michael","Ginger","Food"]);
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
instance.post("/fupload", (req, res) => {
 console.log(req)
 console.log(1)

  var form = new formidable.IncomingForm();
 console.log(JSON.stringify(form))

    form.parse(JSON.stringify(req), function (err, fields, files) {
      console.log(2)

      console.log(JSON.stringify(files.file))
      console.log(3)

      var oldpath = files.file.uri;
      var newpath = __dirname + "/files/" + files.file.originalFilename;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });
     return res.send({ status: "success", path: path });

});
instance.post("/blobupload", async (request, response) => {
  if (!request.files) {
    return response.status(400).send("No files are received.");
  }

  const path = `https://${account}.blob.core.windows.net${sas}`;
  console.log(path);
  const blobServiceClient = new BlobServiceClient(path);

  const containerClient =  blobServiceClient.getContainerClient(containerName);

  const blobName = request.files.file.name;
  const stream = intoStream(request.files.file.data);
  const streamLength = request.files.file.data.length;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const uploadBlobResponse = await blockBlobClient.uploadStream(stream, streamLength);
  
   console.log(`${blockBlobClient.url}`);

  return response.status(200).send({ path:blockBlobClient.url, message: 'File Uploaded Successfully'});
});
instance.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});