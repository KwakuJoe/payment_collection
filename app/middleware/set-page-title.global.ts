import {setRouteNames} from '~/assets/data/routes'
import {usePageStore} from '~/store/page_header'

export default defineNuxtRouteMiddleware( async ( to ) => {
    const pageStore = usePageStore()
    pageStore.pageTitle =  setRouteNames(to.name?.toString() ?? '')
} );