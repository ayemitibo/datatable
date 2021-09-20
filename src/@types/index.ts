export interface Holding {
  Id: number
  DivisionId: number
  DealId: number
  DealName: string
  IssuerId: number
  IndustryId: number
  StatusId: number
  CustomDealId: string
  Access: number
  AgentId: number
  SourceId: number
  DataroomStatusId: number
  TypeId: number
  Total: any
  Created: string
  LastPosted: string
  LastAccessed: string
  Borrowed: boolean
  CurrentHolding: boolean
  AnalystIds: number[]
  DocCount: number
  DivisionIsPrivate: boolean
  PrimaryCustomIdentifiers: any
  SecondaryCustomIdentifiers: any
  CustomClientIssuersIdentifiers: any
  ClientCustomField: any
  CustomIdentifiers: any
}

export interface Industry {
  Id: number
  IndustryName: string
}

export interface ClientIssuer {
  IssuerId: number
  IssuerName: string
  ClientCustomId: any
}

export interface Agent {
  Id: number
  CompanyName: string
}

export interface Source {
  Id: number
  SourceName: string
}

export interface DealType {
  Id: number
  TypeName: string
}

export interface Analyst {
  UserId: number
  FullName: string
}

export interface Asset {
  Id: number
  AssetName: string
  IssuerId: number
  HasEsmaData: boolean
  DealIds: number[]
  Divisions: Division[]
  Identifiers: Identifier[]
}

export interface Division {
  DivisionId: number
  AssetName: any
}

export interface Identifier {
  Identifier: string
  TypeId: number
}

export interface Deal {
  id: number
  issuer: string
  dealName: string
  bloombergId?: string
  isin?: string
  customDealIdentifiers?: string[]
  customIssuerIdentifiers?: string[]
  industry: string
  agent: string
  source: string
  status?: string
  total?: number
  lastPosted: Date
  lastAccessed: Date
  analysts: string[]
  docCount: number
  customField?: any
}

export interface Document {
  id: string
  deal_doc_id: string
  holding_id: number
  division_id: number
  excluded_from_restricted_list: boolean
  created: string
  is_declassified: boolean
  last_revision_id: string
  size: string
  irm_type_id: number
  irm_override: boolean
  deal_id: number
  dataroom_id: string
  doc_name: string
  name: string
  original_filename: string
  original_path: string
  modified: string
  is_private: boolean
  posted: Date
  source_file_id: string
  system_folder_id: number
  system_folder_path: number[]
  system_folder_name: string
  system_folder_path_strings: string[]
  root_system_folder_id: number
  status_id: number
  status_name: string
  blob_size: string
  blob_mime: string
  blob_id: string
  blob_hash: string
  last_accessed?: Date
  display_name: string
  display_extension: string
  folder_path: string
  read: boolean
  in_dataroom: any
  holding: Holding
  source_file: SourceFile
  email_note: any
  folder_path_elements: FolderPathElement[]
  tag?: string
  note?: string
}

export interface FolderPathElement {
  level: number
  id: number
  name: string
}

export interface SourceFile {
  id: string
  note: any
}


export interface Options{
  sortable?: [],
  perPage : number,
}