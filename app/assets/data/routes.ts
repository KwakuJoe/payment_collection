
export interface RouteTitle {
  [key: string]: string | ((route: { params: Record<string, string | string[]> }) => string);
}




export function setRouteNames(routeName: string): string {
  let pageTitle: string = '';

  switch (routeName) {
    case 'index':
      pageTitle = 'Payments Collections';
      break;
    case 'teller-report':
      pageTitle = 'Teller Report';
      break;
    case 'teller-payments-id': // This is how Nuxt names dynamic routes
      pageTitle = 'Make payments';
      break;
    default:
      pageTitle = '';
  }

  return pageTitle;
}