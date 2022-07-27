import {  InMemoryCache,  gql, useQuery } from '@apollo/client';
const GET_MESSAGES = gql`
query  messages {
  messages {
    id
    name
    type
    text
    fileName
    address
    createdAt
    createdBy
  }
}
`;

const get_images = () =>{
    const { l, e, data } = useQuery(GET_MESSAGES);
    console.log("get images1");
    console.log(data);

    return data.messages.map(({  id, name, type, text, fileName, createdAt, createdBy }) => (
            { "name" : fileName }
        // <Text key={id}>{name + " " + type +" " +text}</Text>
        ));
    }

//     return [
//         {"name" : "burger"},
//         {"name" : "chipotle"},
//         {"name" : "safetyApp0fb9227a-a3da-41f2-bfb7-0320c2644cc1"},
//         {"name" : "safetyAppc11a833a-4333-4f96-a1a1-6fbde7b460be"},
        
//         {"name" : "noodles"},
//         {"name" : "nuts"},
//         {"name" : "pancake"},
//     ]
// }
const account = "devparentu";
const sas = "?st=2020-07-17T16%3A49%3A37Z&se=2035-07-18T16%3A49%3A00Z&sp=racwdl&sv=2018-03-28&sr=c&sig=UQoZRxrJWCIaNiyBhgsjkm9WtmHosJAOh451mqmnj%2Fg%3D";
const path = `https://${account}.blob.core.windows.net/dev/safety_app/`;
   
  //  console.log(`https://${account}.blob.core.windows.net/dev${sas}`)
   

const get_images_url = (image_id)  => {
    return `${path}${image_id}${sas}`;
}
export {get_images, get_images_url} ;