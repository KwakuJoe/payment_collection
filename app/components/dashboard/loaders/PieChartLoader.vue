<template>
    <div class="flex flex-col w-full h-full p-4 relative justify-center items-center">


        <!-- Legend at the top - horizontal -->
        <div class="flex justify-center space-x-6 flex-wrap">
            <!-- Legend Item 1 -->
            <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-gray-400 animate-pulse"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16"></div>
            </div>
            <!-- Legend Item 2 -->
            <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-gray-300 animate-pulse"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-14"></div>
            </div>
            <!-- Legend Item 3 -->
            <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-gray-200 animate-pulse"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-18"></div>
            </div>
        </div>

        <!-- Chart Container -->
        <div class="flex items-center justify-center relative">
            <!-- Main Doughnut Chart -->
            <div class="relative w-72 h-72">
                <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <defs>
                        <!-- Shimmer gradient for segments -->
                        <linearGradient id="shimmer1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color: rgb(156, 163, 175); stop-opacity: 0.4">
                                <animate attributeName="stop-opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite"/>
                            </stop>
                            <stop offset="100%" style="stop-color: rgb(107, 114, 128); stop-opacity: 0.7">
                                <animate attributeName="stop-opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
                            </stop>
                        </linearGradient>

                        <linearGradient id="shimmer2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color: rgb(209, 213, 219); stop-opacity: 0.5">
                                <animate attributeName="stop-opacity" values="0.5;0.9;0.5" dur="2.5s" repeatCount="indefinite"/>
                            </stop>
                            <stop offset="100%" style="stop-color: rgb(156, 163, 175); stop-opacity: 0.8">
                                <animate attributeName="stop-opacity" values="0.8;1;0.8" dur="2.5s" repeatCount="indefinite"/>
                            </stop>
                        </linearGradient>

                        <linearGradient id="shimmer3" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color: rgb(229, 231, 235); stop-opacity: 0.4">
                                <animate attributeName="stop-opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite"/>
                            </stop>
                            <stop offset="100%" style="stop-color: rgb(209, 213, 219); stop-opacity: 0.6">
                                <animate attributeName="stop-opacity" values="0.6;0.9;0.6" dur="3s" repeatCount="indefinite"/>
                            </stop>
                        </linearGradient>

                        <linearGradient id="shimmer4" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color: rgb(243, 244, 246); stop-opacity: 0.5">
                                <animate attributeName="stop-opacity" values="0.5;0.8;0.5" dur="2.2s" repeatCount="indefinite"/>
                            </stop>
                            <stop offset="100%" style="stop-color: rgb(229, 231, 235); stop-opacity: 0.7">
                                <animate attributeName="stop-opacity" values="0.7;1;0.7" dur="2.2s" repeatCount="indefinite"/>
                            </stop>
                        </linearGradient>
                    </defs>

                    <!-- Segment 1 - 35% (126 degrees) -->
                    <circle
                        cx="50"
                        cy="50"
                        r="22"
                        fill="none"
                        stroke="url(#shimmer1)"
                        stroke-width="14"
                        stroke-dasharray="48 138"
                        stroke-dashoffset="0"
                        stroke-linecap="round"
                    >
                        <animate attributeName="stroke-dashoffset" values="0;-5;0" dur="4s" repeatCount="indefinite"/>
                    </circle>

                    <!-- Segment 2 - 25% (90 degrees) -->
                    <circle
                        cx="50"
                        cy="50"
                        r="22"
                        fill="none"
                        stroke="url(#shimmer2)"
                        stroke-width="14"
                        stroke-dasharray="35 151"
                        stroke-dashoffset="-50"
                        stroke-linecap="round"
                    >
                        <animate attributeName="stroke-dashoffset" values="-50;-55;-50" dur="3.5s" repeatCount="indefinite"/>
                    </circle>

                    <!-- Segment 3 - 20% (72 degrees) -->
                    <circle
                        cx="50"
                        cy="50"
                        r="22"
                        fill="none"
                        stroke="url(#shimmer3)"
                        stroke-width="14"
                        stroke-dasharray="28 158"
                        stroke-dashoffset="-87"
                        stroke-linecap="round"
                    >
                        <animate attributeName="stroke-dashoffset" values="-87;-92;-87" dur="4.5s" repeatCount="indefinite"/>
                    </circle>

                    <!-- Segment 4 - 20% (72 degrees) -->
                    <circle
                        cx="50"
                        cy="50"
                        r="22"
                        fill="none"
                        stroke="url(#shimmer4)"
                        stroke-width="14"
                        stroke-dasharray="28 158"
                        stroke-dashoffset="-117"
                        stroke-linecap="round"
                    >
                        <animate attributeName="stroke-dashoffset" values="-117;-122;-117" dur="3.8s" repeatCount="indefinite"/>
                    </circle>
                </svg>
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
// No script needed for this skeleton loader
</script>

<style scoped>
/* Custom animation for subtle rotation */
@keyframes rotate {
    0% { transform: rotate(-90deg); }
    100% { transform: rotate(270deg); }
}

.chart-rotate {
    animation: rotate 8s linear infinite;
}
</style>