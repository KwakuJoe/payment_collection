<template>
    <div class="flex flex-col w-full h-64 p-4 relative overflow-hidden">
        <!-- Chart Title Skeleton -->
        <div class="mb-4">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-32"></div>
        </div>

        <!-- Chart Container -->
        <div class="flex-1 relative">
            <!-- Y-axis labels -->
            <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 pr-2">
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-8"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-6"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-8"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-7"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5"></div>
            </div>

            <!-- Main Chart Area -->
            <div class="ml-10 h-full relative">
                <!-- Grid Lines (Horizontal) -->
                <div class="absolute inset-0">
                    <div class="h-full flex flex-col justify-between">
                        <div class="h-px bg-gray-100 dark:bg-gray-800"></div>
                        <div class="h-px bg-gray-100 dark:bg-gray-800"></div>
                        <div class="h-px bg-gray-100 dark:bg-gray-800"></div>
                        <div class="h-px bg-gray-100 dark:bg-gray-800"></div>
                        <div class="h-px bg-gray-100 dark:bg-gray-800"></div>
                    </div>
                </div>

                <!-- Animated Line Chart Path -->
                <svg class="absolute inset-0 w-full h-full">
                    <defs>
                        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color: rgb(156, 163, 175); stop-opacity: 0.4">
                                <animate attributeName="stop-opacity" values="0.4;0.7;0.4" dur="2s" repeatCount="indefinite"/>
                            </stop>
                            <stop offset="50%" style="stop-color: rgb(107, 114, 128); stop-opacity: 0.8">
                                <animate attributeName="stop-opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
                            </stop>
                            <stop offset="100%" style="stop-color: rgb(156, 163, 175); stop-opacity: 0.4">
                                <animate attributeName="stop-opacity" values="0.4;0.7;0.4" dur="2s" repeatCount="indefinite"/>
                            </stop>
                        </linearGradient>
                        
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color: rgb(156, 163, 175); stop-opacity: 0.15"/>
                            <stop offset="100%" style="stop-color: rgb(156, 163, 175); stop-opacity: 0.03"/>
                        </linearGradient>
                    </defs>

                    <!-- Area under the curve -->
                    <path 
                        d="M 0 60 Q 60 40 120 50 T 240 45 T 360 55 L 360 100 L 0 100 Z"
                        fill="url(#areaGradient)"
                        opacity="0.6"
                    >
                        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite"/>
                    </path>

                    <!-- Main curved line -->
                    <path 
                        d="M 0 60 Q 60 40 120 50 T 240 45 T 360 55"
                        stroke="url(#shimmer)"
                        stroke-width="3"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />

                    <!-- Data points -->
                    <circle cx="0" cy="60" r="4" fill="rgb(107, 114, 128)" opacity="0.7">
                        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" begin="0s"/>
                    </circle>
                    <circle cx="120" cy="50" r="4" fill="rgb(107, 114, 128)" opacity="0.7">
                        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" begin="0.3s"/>
                    </circle>
                    <circle cx="240" cy="45" r="4" fill="rgb(107, 114, 128)" opacity="0.7">
                        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" begin="0.6s"/>
                    </circle>
                    <circle cx="360" cy="55" r="4" fill="rgb(107, 114, 128)" opacity="0.7">
                        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" begin="0.9s"/>
                    </circle>
                </svg>

                <!-- Legend Skeleton -->
                <div class="absolute top-2 right-2 flex items-center gap-2">
                    <div class="w-4 h-0.5 bg-gray-400 animate-pulse"></div>
                    <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16"></div>
                </div>
            </div>

            <!-- X-axis labels -->
            <div class="ml-10 mt-2 flex justify-between text-xs">
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-8"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-8"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-8"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-8"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-8"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// No script needed for this skeleton loader
</script>

<style scoped>
/* Additional custom animations if needed */
.chart-skeleton {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    background-size: 200px 100%;
    animation: loading 1.5s infinite;
}

@keyframes loading {
    0% {
        background-position: -200px 0;
    }
    100% {
        background-position: calc(200px + 100%) 0;
    }
}
</style>