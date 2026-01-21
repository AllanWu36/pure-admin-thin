import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

export type LogListResult<T> = {
  code: number;
  data: {
    total: number;
    items: T[];
  };
  message?: string;
};

export type AuditLogItem = {
  id: number;
  user_id?: number | null;
  username?: string | null;
  action?: string | null;
  method?: string | null;
  path?: string | null;
  status_code: number;
  success: boolean;
  ip?: string | null;
  user_agent?: string | null;
  duration_ms?: number | null;
  created: string;
};

export type LoginLogItem = {
  id: number;
  user_id?: number | null;
  username?: string | null;
  success: boolean;
  message?: string | null;
  ip?: string | null;
  user_agent?: string | null;
  created: string;
};

export const getAuditLogs = (params?: Record<string, any>) => {
  return http.request<LogListResult<AuditLogItem>>(
    "get",
    baseUrlApi("audit-log"),
    { params }
  );
};

export const getLoginLogs = (params?: Record<string, any>) => {
  return http.request<LogListResult<LoginLogItem>>(
    "get",
    baseUrlApi("login-log"),
    { params }
  );
};
