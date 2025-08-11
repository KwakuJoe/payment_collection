
export interface ResourceFetchResponse<T> {
  status?: string,
  message: string,
  data: T,
}

export interface ResourceListResponse<T> {
  status?: string,
  message: string,
  data: T[],
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
  verification_endpoint: string
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
  is_required: boolean
  rank: string
  default_value: any
  list_of_values: any
  is_thirdparty: boolean
  thirdparty_endpoint: string
  is_visible: boolean
  is_amount: boolean
  require_verification: boolean
  is_readonly: boolean
  show_on_receipt: boolean
  in_remark: boolean
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
  email: string;
  phone: string;
  username: string;
  created_at: Date;
  updated_at: Date;
}

