import { prisma } from "../config/database.js"
import {ICredentialInsertData} from "../types/credentialsTypes.js"



export async function insert(credentialData: ICredentialInsertData) {
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
    const credential = await prisma.credentials.findUnique({
        where :{id}
     }
     );
     return credential
   }

   export async function findAll(userId:number) {
    const credentials = await prisma.credentials.findMany({
        where :{userId}
     }
     );
     return credentials
   }

   export async function remove(id:number) {
    const credential = await prisma.credentials.delete({
        where :{id}
     }
     );
     return credential
   }