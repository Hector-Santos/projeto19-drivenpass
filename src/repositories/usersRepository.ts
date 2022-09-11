import { prisma } from "../config/database.js"
import {IUserData} from "../types/usersTypes.js"


export async function insert(userData: IUserData) {
    await prisma.users.create({
        data: userData
    });
  }


  export async function findByEmail(email:string) {
   const user = await prisma.users.findUnique({
       where :{email}
    }
    );
    return user
  }

  export async function findById(id:number) {
    const user = await prisma.users.findUnique({
        where :{id}
     }
     );
     return user
   }

