import { prisma } from "../config/database.js"
import {IWiFiInsertData} from "../types/wifiTypes.js"



export async function insert(credentialData: IWiFiInsertData) {
    await prisma.wiFi.create({
        data: credentialData
    });
  }


   export async function findById(id:number) {
    const credential = await prisma.wiFi.findUnique({
        where :{id}
     }
     );
     return credential
   }

   export async function findAll(userId:number) {
    const wiFi = await prisma.wiFi.findMany({
        where :{userId}
     }
     );
     return wiFi
   }

   export async function remove(id:number) {
    const credential = await prisma.wiFi.delete({
        where :{id}
     }
     );
     return credential
   }