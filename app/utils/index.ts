

export function ucFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const currencyLocales: Record<string, string> = {
    GHS: 'en-GH', // Ghana Cedi
    USD: 'en-US', // US Dollar
    GBP: 'en-GB', // British Pound
    EUR: 'de-DE', // Euro (Germany example)
    NGN: 'en-NG', // Nigerian Naira
    ZAR: 'en-ZA', // South African Rand
    JPY: 'ja-JP', // Japanese Yen
    CNY: 'zh-CN', // Chinese Yuan
    INR: 'en-IN'  // Indian Rupee
    // Add more as needed
}

export const formatCurrency = (amount: number, currency:string = 'GHS'): string => {
   
  const locale = currencyLocales[currency] || 'en-GH'; // fallback if unknown
  
  return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency ,
        minimumFractionDigits: 2
    }).format(amount)
}

// image for client side
export function imageUrl(url: string): string {
    const config = useRuntimeConfig();
    return `${config.public.apiBaseUrl}/${url}`;
}

export function goHome(){
const router = useRouter()

  router.push('/')
}

export function removeEmptyPropertiesDeep<T extends Record<string, any>>(obj: T): Partial<T> {
  const cleaned: Partial<T> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    // Skip null, undefined, empty strings
    if (value === null || value === undefined || value === '') {
      continue;
    }
    
    // Handle arrays
    if (Array.isArray(value)) {
      // Keep non-empty arrays
      if (value.length > 0) {
        (cleaned as any)[key] = value;
      }
    }
    // Handle nested objects
    else if (typeof value === 'object' && value !== null && !(value instanceof Blob)) {
      const nestedCleaned = removeEmptyPropertiesDeep(value);
      // Only add if the nested object has properties
      if (Object.keys(nestedCleaned).length > 0) {
        (cleaned as any)[key] = nestedCleaned;
      }
    }
    // Handle primitive values
    else {
      (cleaned as any)[key] = value;
    }
  }
  
  return cleaned;
}