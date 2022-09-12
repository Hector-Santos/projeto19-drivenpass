import { insert,
         findById as findWiFiById,
         findAll as findAllWiFis, 
         remove} from "../repositories/wifiRepository.js";
import { IWiFiInsertData, IWiFiReturnData, IWiFisReturnData } from "../types/wifiTypes.js";
import Cryptr from "cryptr";
import dotenv from 'dotenv'
import { findById as findUserById } from "../repositories/usersRepository.js";


dotenv.config()

const ENCRYPTION_KEY:string  = process.env.ENCRYPTION_KEY || "key"
const cryptr = new Cryptr(ENCRYPTION_KEY)

export async function createWiFi(wifiData: IWiFiInsertData){
  
  const encryptedPassword = cryptr.encrypt(wifiData.password)

  const user = await findUserById(wifiData.userId)
	if(!user) throw {type: 'not_found', message: 'a user with the provided id could not be found'}


  const encryptedWiFiData:IWiFiInsertData =
   {
    userId: wifiData.userId,
    tag:wifiData.tag,
    password:encryptedPassword,
    
   }
  await insert(encryptedWiFiData)
}


export async function findWiFi(wifiId: number, userId:number){

  const wifi = await findWiFiById(wifiId)
	if(!wifi)
  throw {type: 'not_found',
         message: 'a wifi with the provided id could not be found'}

  const wifiOwnerId = wifi.userId
  if(wifiOwnerId !== userId)
  throw {type: 'unauthorized',
         message: 'the wifi you are triyng to reach belongs to another user'}

  const decryptedPassword = cryptr.decrypt(wifi.password)

  const decryptedWiFi:IWiFiReturnData =   
  { 
    tag: wifi.tag, 
    password: decryptedPassword 
  }

  return decryptedWiFi
  
}

export async function findWiFis(userId:number){
  const wifis = await findAllWiFis(userId)
  if(wifis.length === 0)
  throw {type: 'not_found', message: 'this user has no wifis registered'}
	if(!wifis)
  throw {type: 'not_found', message: 'the wifis information could not be retrievd'}

  const decryptedWiFis:IWiFisReturnData[] = wifis.map(wifi =>
     { 
      const decryptedPassword = cryptr.decrypt(wifi.password)
      return {
      id: wifi.id,                
      tag: wifi.tag,
      password: decryptedPassword 
             }
    })

    return decryptedWiFis
  
}

export async function deleteWiFi(wifiId: number, userId:number){

  const wifi = await findWiFiById(wifiId)
	if(!wifi)
  throw {type: 'not_found',
         message: 'a wifi with the provided id could not be found'}

  const wifiOwnerId = wifi.userId
  if(wifiOwnerId !== userId)
  throw {type: 'unauthorized',
         message: 'the wifi you are triyng to delete belongs to another user'}

  await remove(wifiId)
}

