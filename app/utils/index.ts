

export function ucFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export const formatCurrency = (amount: number, currency:string = 'GHS'): string => {
    return new Intl.NumberFormat('en-GH', {
        style: 'currency',
        currency: currency,
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