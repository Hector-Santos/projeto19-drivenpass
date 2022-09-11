import { prisma } from "../config/database.js"
import {ICredentialData} from "../types/credentialsTypes.js"



export async function insert(credentialData: ICredentialData) {
    await prisma.credentials.create({
        data: credentialData
    });
  }

  export async function findByTagAndId(tag:string, userId:number) {
    const credential = await prisma.credentials.findUnique({
      where :{userId_tag:{
        userId,tag
      }}
   })
     return credential
   }

   export async function findById(id:number) {
    const user = await prisma.users.findUnique({
        where :{id}
     }
     );
     return user
   }
 

