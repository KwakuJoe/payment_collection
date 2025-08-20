import type { DataTableFilterMeta, DataTableFilterMetaData } from 'primevue/datatable'


export interface ResourceFetchResponse<T> {
  status?: boolean | number,
  message: string,
  error?: any,
  data: T,
  image_url?: string,
  timestamp?: string
}

export interface ResourceListResponse<T> {
  status?: boolean | number,
  message: string,
  error?: any,
  data: [T],
  meta?: ResourceListResponsePagination,
}

export interface ResourceListResponsePagination {
  current_page: number,
  next_page_url: string | null,
  prev_page_url: string | null,
  first_page_url: string | null,
  last_page_url: string | null,
  per_page: number,
  last_page: number,
  total: number
}

// institution
export interface Institution {
  id: string
  name: string
  description: string
  rank: string
  image: string
  category: Category
  customer_number: string
  customer_name: string
  product_code: any
  alias: any
}

export interface Category {
  id: string
  name: string
  description: string
  rank: number
  image: string
}

export interface FormFieldForPosting {
  [key: string]: any
}

export interface PreviewFormField {
  key?: string
  value?: string
  data_type: string
}

// service
export interface Service {
  id: string
  name: string
  description: string
  rank: string
  institution: Institution
  account_number: any
  currency: string
  currency_denomination: DenominationData[]
  verification_endpoint?: string
  process_endpoint: string
  merchant_code: string
  biller_id: any
  biller_verification_endpoint: string
  biller_process_endpoint: string
  biller_reversal_endpoint: string
  is_reversible: boolean
  day_for_reversal: number
  has_external_reversible: boolean
  require_verification: boolean
  uses_core_banking: number
  form_field: FormField[]
}



export interface FormField {
  id: string
  service_id: string
  field_name: string
  field_label: string
  description: any
  tooltip: string
  field_length: number
  field_type: FieldType
  field_data_type: FieldDataType
  list_of_options: any[]
  is_required: boolean | number
  rank: string
  default_value: string
  list_of_values: any
  is_thirdparty: boolean | number
  thirdparty_endpoint: string
  is_visible: boolean | number
  is_amount: boolean | number
  require_verification: boolean | number
  is_readonly: boolean | number
  show_on_receipt: boolean | number
  in_remark: boolean | number
}

export interface FieldType {
  id: string
  code: number
  name: string
}

export interface FieldDataType {
  id: string
  code: number
  name: string
}


export interface FileObject {
  file: File
  name: string
  size: number
  type: string
  preview?: string
}

export interface User {
  user_id: any
  first_name: string
  middle_name: string | null
  last_name: string
  username: string
  full_name: string
  user_role: any
  source_account: string
  branch_name: string | null
  branch_code: string | null
  department: any
  mobile: string
  email: string
  account_status: string,
  token: string | null
}




export interface VerifyFieldsPayload {
  service_id: string | undefined
  form_data: Record<string, any>
  channel_reference: string | null
  branch_user: BranchUser
}

export interface SubmitFieldsPayload_old {
  service_id: string
  form_data: Record<string, any>
  channel_reference: string | null
  branch_user: BranchUser
}

export interface BranchUser {
  branch: Branch
  user: ApplicationUser
}

export interface Branch {
  branch_name: string | null
  branch_code: string | null
  branch_email: string | null
}

export interface ApplicationUser {
  user_name: string | null
  email: string | null
}

export interface PreviewDataItem {
  key: string
  value: string | number | boolean
}




export interface DenominationData {
  is_note: boolean | number
  currency: string
  code: number
  denomination: number
  quantity: number
  amount: number
}


export interface SubmitFieldsPayload {
  service_id: string | null;
  form_data: Record<string, any>;
  payment_method: string;
  source_account: string | null;
  destination_account: string | null;
  depositor_name: string | null;
  depositor_phone: string | null;
  depositor_email?: string | null;
  total_amount: number;
  currency: string | null;
  currency_denomination?: DenominationData[];
  channel: string | null;
  channel_reference: string | null;
  app_reference: string | null;
    branch: {
      name?: string | null;
      code?: string | null;
      email?: string | null;
    };
    user: {
      username: string | null;
      phone?: string | null;
      email?: string | null;
    };

}



export interface VerifyBankTransferPaymentAccountPayload {
  account_number: string | null;
  payment_amount: string | null;
}

export interface Depositor {
  name: string | null;
  phone: string | null;
  email?: string | null;
}



// report types

// Define interfaces for our data structures
export interface TableColumn {
  field: string
  header: string
  sortable: boolean
  exportable: boolean
}

export interface ServiceFilterOption {
  label: string
  value: string
}

export interface BackendFilters {
  dateRange: [Date | null, Date | null] | null
  service: string | null,
  branch: string | null,
  teller: string | null
}

// export interface TransactionRecord {
//   id: string
//   bankReference: string
//   amountPaid: string
//   channelRef: string
//   branch: string
//   branchUserName: string
//   narration: string
//   sourceAccount: string
//   service: string
//   transactionDate: string
// }


export interface BackendFilters {
    dateRange: [Date | null, Date | null] | null;
    service: string | null;
}

// Update the filters type definition
export interface TableFilters {
    [key: string]: DataTableFilterMetaData;
}
