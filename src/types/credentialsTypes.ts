import { credentials } from "@prisma/client";

export type ICredentialInsertData = Omit<credentials, 'id'>;
export type ICredentialReturnData = Omit<credentials, 'id' | 'userId'>
export type ICredentialsReturnData = Omit<credentials,'userId'>