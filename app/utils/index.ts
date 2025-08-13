

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