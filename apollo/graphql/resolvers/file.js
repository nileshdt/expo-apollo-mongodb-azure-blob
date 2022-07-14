// const azure = require('azure-storage')
// const fs = require('fs')
// //const azurePath = `${process.env.AZURE_STORAGE_CONNECTION_STRING}`
// const azurePath = ''
// const blobService = azure.createBlobService(azurePath)
// const File = require('../../models/File');

// const transformFile = m => {
//   return new File({
//     ...m._doc,
//     filename: m.filename,
//     mimetype: m.mimetype,
//     encoding: m.encoding,
//     createdBy: m.createdBy,
//     createdAt: m.createdAt
//   });
// };
// module.exports = {
//   Query: {
//     uploads: (parent, args) => {},
//   },
//   Mutation: {
//     singleUpload: (parent, args, context) => {
//       return args.file.then(file => {
//          const {createReadStream, filename, mimetype} = file

//          let streamSize = parseInt(context.req.headers['content-length'])

//          const fileStream = createReadStream()
        
//          blobService.createBlockBlobFromStream('container-name',filename,fileStream,streamSize,(error,response) => {
//           if(!error){
//             console.log(response)
//           }
//          })
//          return file;
//       });
//     },
//   },
// };