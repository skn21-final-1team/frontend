export interface SyncKeyRequest {
  notebook_id: number;
}


export interface SyncKeyResponse {
  sync_key: string;
  expires_at: string;
}

export interface SyncKeyState {
  key: string | null;
  expiresAt: string | null;
  isLoading: boolean;
  error: string | null;
}
