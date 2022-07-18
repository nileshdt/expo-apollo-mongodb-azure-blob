// const fs = require('fs')
// const { v4: uuidv4 } = require('uuid');
// const azure = require('azure-storage')
// const blobService = azure.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING)

// //const contestEntryModel = require('../models/contestEntryModel')


// const uploadImageFunc = async function(args,{req, res}) {
//       return args.file.then ( file => {
//         const {createReadStream, filename, mimetype} = file

//         let streamSize = parseInt(req.headers['content-length'])

//         const fileStream = createReadStream()

//         const newFilename = uuidv4()
        
//       blobService.createBlockBlobFromStream('<container name>',`${args.contestId}/${newFilename}`,fileStream,streamSize,(error,response) => {
//         if(!error){
//           let entry = {
//             url:`<blobstorage url>/${args.contestId}/${newFilename}`,
//             participant: req.userId
//           }
//           // contestEntryModel.findOneAndUpdate({contestId: args.contestId},{$push:{entries:entry}},(err, doc) => {
//           //   console.log("updated")
//           // })
//         }
//       })


//         return true;
        
//       });
    
// }

// module.exports = uploadImageFunc;