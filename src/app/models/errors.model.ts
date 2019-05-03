export interface ErrorToDisplay {
  isError: boolean;
  message: string;
}

export interface ErrorFromSignalR {
  message: string;
  reason: string;
}
