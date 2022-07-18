// const azure = require('azure-storage')
// const fs = require('fs')
// const blobService = azure.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING)

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
//   Upload: GraphQLUpload,

//   Query: {
//     uploads: (parent, args) => {},
//   },
//   Mutation: {
//     singleUpload: (parent, args, context) => {
//       return args.file.then(file => {
//         console.log(1)
//          const {createReadStream, filename, mimetype} = file

//          let streamSize = parseInt(context.req.headers['content-length'])
//          console.log(2)

//          const fileStream = createReadStream()
//          console.log(3)
        
//          blobService.createBlockBlobFromStream('dev',filename,fileStream,streamSize,(error,response) => {
//           if(!error){
//             console.log(response)
//           }
//          })
//          return file;
//       });
//     },
//   },
// };