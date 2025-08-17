
export interface ResourceFetchResponse<T> {
  status?: boolean | number,
  message: string,
  error?: any,
  data: T,
}

export interface ResourceListResponse<T> {
  status?: boolean | number,
  message: string,
  error?: any,
  data:   [T],
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
  id: string;
  id_number: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  username: string | null;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface VerifyFieldsPayload  {
  service_id: string | undefined
  form_data: Record<string, any>
  channel_reference: string | null
  branch_user: BranchUser
}

export interface SubmitFieldsPayload_old  {
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
  payment_type: string;
  teller_account_number: string | null;
  customer_account_number: string | null;
  depositor_name: string | null;
  depositor_phone: string | null;
  depositor_email: string | null;
  total_amount: number;
  currency: string | null;
  currency_denomination?: DenominationData[];
  channel_reference: string | null;
  branch_user: {
    branch: {
      branch_name?: string | null;
      branch_code?: string | null;
      branch_email?: string | null;
    };
    user: {
      user_name: string | null;
      email?: string | null;
    };
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

