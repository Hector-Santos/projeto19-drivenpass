import { credentials } from "@prisma/client";

export type ICredentialData = Omit<credentials, 'id'>;