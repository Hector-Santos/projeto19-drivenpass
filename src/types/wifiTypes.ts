import { WiFi } from "@prisma/client";

export type IWiFiInsertData = Omit<WiFi, 'id'>;
export type IWiFiReturnData = Omit<WiFi, 'id' | 'userId'>
export type IWiFisReturnData = Omit<WiFi,'userId'>