export type ApiRequestBase = {
    [key: string]: unknown;
  };
  
  export type ApiResponseBase = {
    [key: string]: unknown;
  };
  
  export type TeamResponse = ApiResponseBase & {
    id?: string;
    name?: string;
    members?: ApiResponseBase[];
    currentRole?: string;
  };
  
  export type RoleResponse = ApiResponseBase & {
    id?: string;
    name?: string;
    permissions?: string[];
  };
  
  
  // Represents the bots list API response which can be either a plain array
  // or a paginated wrapper used by some endpoints. Keep fields optional for
  // forward compatibility.
  export type BotSummary = ApiResponseBase & {
    botId?: string;
    name?: string;
    path?: string | null;
    type?: string;
    intents?: ApiResponseBase[];
  };
  
  export type BotsListResponse = {
    bots: BotSummary[];
    totalElements?: number;
  };
  
  
  