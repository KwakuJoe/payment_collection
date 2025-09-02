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
  branch: Branch
  user: ApplicationUser
}

export interface SubmitFieldsPayload_old {
  service_id: string
  form_data: Record<string, any>
  channel_reference: string | null
  branch: Branch
  user: ApplicationUser
}


export interface Branch {
  name: string | null
  code: string | null
  email?: string | null
}

export interface ApplicationUser {
  username: string | null
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


export interface BackendFilters {
    dateRange: [Date | null, Date | null] | null;
    service: string | null;
}

export interface DashboardFilters {
    dateRange: [Date | null, Date | null] | null;
    branch: string | null;
}

// Update the filters type definition
export interface TableFilters {
    [key: string]: DataTableFilterMetaData;
}



export interface ReportInstitution {
  id: string;
  category_id: string | null;
  name: string;
  customer_number: string;
  customer_name: string;
  description: string;
  tooltip: string;
  rank: string;
  product_code: string;
  alias: string;
  icon: string;
  image: string;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ReportService {
  id: string;
  name: string;
  description: string;
  institution_id: string;
  account_number: string;
  currency: string;
  tooltip: string;
  rank: string;
  verification_endpoint: string;
  process_endpoint: string;
  merchant_code: string | null;
  biller_id: string | null;
  biller_verification_endpoint: string | null;
  biller_process_endpoint: string | null;
  biller_reversal_endpoint: string | null;
  is_reversible: number;
  day_for_reversal: number;
  has_external_reversible: number;
  require_verification: number;
  uses_core_banking: number;
  app_id: string | null;
  app: string | null;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CurrencyDenomination {
  is_note: number;
  denomination: number;
  currency: string;
  code: string;
  quantity: number;
  amount: number;
}

export interface RootTransaction {
  id: string;
  status: boolean;
  category_id: string | null;
  category: string | null;
  institution_id: string;
  institution: ReportInstitution;
  service_id: string;
  service: ReportService;
  form_data: string; // you can JSON.parse this if you want an object
  payment_method: string;
  currency: string;
  currency_denomination: string | CurrencyDenomination[];
  total_amount: string;
  source_account: string;
  destination_account: string;
  teller_name: string;
  branch_code: string;
  branch_name: string;
  branch_email: string | null;
  depositor_name: string;
  depositor_phone: string;
  depositor_email: string;
  channel: string;
  app_reference: string | null;
  channel_reference: string | null;
  comment: string | null;
  receipt: string | null;
  has_external_receipt: boolean;
  receipt_url: string | null;
  is_core_banking: boolean;
  core_banking_reference: string | null;
  core_banking_status: string;
  core_banking_request: string;
  core_banking_response: string;
  core_banking_message: string;
  core_banking_time: string;
  transmission_status: string | null;
  transmission_reference: string | null;
  transmission_request: string | null;
  transmission_response: string | null;
  transmission_message: string | null;
  transmission_time: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}




export interface DasboardServiceSummary {
  service_count: {
    count: number;
    amount: string | number;
  };
  is_success: {
    count: number;
    amount: string | number;
  };
  is_not_success: {
    count: number;
    amount: string | number;
  };
  top_10_services: {
    institution: string;
    service: string;
    total: number;
    total_amount: string | number;
  }[];
  payment_methods: {
    payment_method: string;
    total: number;
    total_amount: string | number;
  }[];
  by_institution: {
    institution: string;
    total: number;
    total_amount: string | number;
  }[];
}


export interface  FormatLabelsAndData {
    labels: string[];
    data: number[];
};