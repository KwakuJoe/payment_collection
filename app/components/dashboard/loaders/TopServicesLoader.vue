<template>
    <div class="flex flex-col gap-y-1 w-full">
                        <div v-for="(service, index) in 5"
                    class="flex items-center  w-full p-3 bg-white border border-gray-100 dark:border-zinc-800  dark:bg-black/20 mt-1 rounded-md gap-x-3">

                    <div class="flex flex-col flex-1">
                        <div class="flex items-center gap-x-1">
                            <Skeleton width="8rem" class="mb-2" borderRadius="16px"></Skeleton>
                        </div>
                            <Skeleton width="10rem" class="mb-2" borderRadius="16px"></Skeleton>

                    </div>

                    <!-- amount -->
                    <div class="flex flex-1 justify-end">
                        <Skeleton width="5rem" class="mb-2" borderRadius="16px"></Skeleton>

                    </div>
                </div>
    </div>
</template>
<script>

</script>
<style lang="">
    
</style>