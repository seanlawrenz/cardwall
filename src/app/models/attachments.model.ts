export interface Attachment {
  ID: string; // GUID
  createdByFirstName: string;
  createdByLastName: string;
  createdByName: string;
  createdDate: Date;
  createdEmail: string;
  description: string;
  externalUrl: string;
  folderName: string;
  isAvailable: boolean;
  isExternal: boolean;
  isOnWorkspace: boolean;
  lastRevisedByName: string;
  modifiedByFirstName: string;
  modifiedByLastName: string;
  modifiedByName: string;
  modifiedDate: Date;
  modifiedEmail: string;
  name: string;
  projectID: number;
  referenceID: number;
  revision: number;
  size: number;
  sizeFriendly: string;
}
