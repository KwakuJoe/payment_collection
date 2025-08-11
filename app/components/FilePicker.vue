<template>
  <div class="w-full  mx-auto">
    <!-- Drop Zone Area -->
    <div ref="dropzoneRef"
      class="relative border-2 border-dashed border-gray-100 dark:border-gray-500  rounded-lg p-8 text-center cursor-pointer transition-all duration-300 hover:border-primary/10 hover:bg-primary/10"
      :class="{ 'border-primary bg-primary/50': isDragOver }" @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave" @drop.prevent="handleDrop" @click="openFileDialog">
      <div class="pointer-events-none">
        <Icon class="text-3xl text-gray-500" name="ic:outline-drive-folder-upload"/>
        <p class="mt-2 text-sm text-gray-500">
          <span class="font-medium">Click to upload</span> or drag and drop
        </p>
        <p class="text-sm text-primary mt-1">
          {{ acceptedTypesText }} up to {{ maxSizeMB }}MB
          <span v-if="!multiple" class="block">Single file only</span>
        </p>
      </div>

      <input ref="fileInput" type="file" :multiple="multiple" :accept="acceptAttribute" @change="handleFileSelect"
        class="hidden" />
    </div>

    <!-- Selected Files Preview -->
    <div v-if="selectedFiles.length > 0" class="mt-4 space-y-2">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-medium dark:text-white">
          {{ multiple ? `Selected Files (${selectedFiles.length})` : 'Selected File' }}
        </h3>
        <button @click="clearFiles" class="text-sm text-red-600 hover:text-red-500">
          Clear {{ multiple ? 'all' : '' }}
        </button>
      </div>

      <div class="space-y-2 max-h-64 overflow-y-auto">
        <div v-for="(file, index) in selectedFiles" :key="index"
          class="flex items-center justify-between p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg border border-gray-100 dark:border-[#1C1B20]">
          <div class="flex items-center space-x-3">
            <!-- Image preview -->
            <img v-if="file.preview" :src="file.preview" alt="Preview" class="w-10 h-10 object-cover rounded" />


            <!-- <Image v-if="file.preview"  :src="file.preview"  alt="Preview"  class="w-10 h-10 object-cover rounded" preview /> -->

            <!-- File type icon -->
            <!-- <div v-else class="w-10 h-10 bg-gray-200  rounded flex items-center justify-center">
              <component :is="getFileIcon(file.type)" class="w-5 h-5 text-gray-400" />
            </div> -->

            <div v-else class="flex w-10 h-10 justify-center items-center rounded-md">
              <Icon class="text-2xl" :name="getFileIcon(file.type)" />
            </div>

            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium dark:text-white truncate">{{ file.name }}</p>
              <p class="text-xs text-gray-500">
                {{ formatFileSize(file.size) }} • {{ getFileTypeLabel(file.type) }}
              </p>
            </div>
          </div>
          <button @click="removeFile(index)" class="ml-2 text-red-400 hover:text-red-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Error Messages -->
    <div v-if="errors.length > 0" class="mt-3 space-y-1">
      <div v-for="(error, index) in errors" :key="index"
        class="text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200">
        {{ error }}
      </div>
    </div>
  </div>

  <!-- note how the file preview is displayed -->

  <!-- 1. Single use -->
  <!--   <FilePicker 
    :multiple="false"
    :file-types="['image']"
    :max-size-mb="5"
    @files-selected="handleFiles"
  /> -->


  <!-- 2. Multiple use -->
  <!--     <FilePicker 
    :multiple="true"
    :file-types="['document', 'pdf']"
    :max-files="3"
    :max-size-mb="10"
    @files-selected="handleFiles"
  /> -->

  <!-- 3. Mixed file -->
  <!-- <FilePicker 
    :multiple="true"
    :file-types="['image', 'video', 'document']"
    :max-files="5"
    @files-selected="handleFiles"
  /> -->

  <!-- 4. Custom Accept Attribute -->
  <!-- <FilePicker 
    :multiple="true"
    custom-accept=".json,.xml,.txt"
    @files-selected="handleFiles"
  /> -->

  <!-- 5 any file -->
  <!-- <FilePicker 
    :multiple="true"
    :file-types="['any']"
    @files-selected="handleFiles"
  /> -->
</template>





<script setup lang="ts">
import { ref, computed, watch, defineProps } from 'vue'
import type { FileObject } from '~/types/index'
// import {Image} from 'primevue'

export type FileType = 'image' | 'video' | 'audio' | 'document' | 'pdf' | 'excel' | 'zip' | 'any'

export interface FilePickerProps {
  multiple?: boolean
  fileTypes?: FileType[]
  maxSizeMB?: number
  maxFiles?: number
  customAccept?: string
}

// Props with defaults
const props = withDefaults(defineProps<FilePickerProps>(), {
  multiple: true,
  fileTypes: () => ['image'] as FileType[],
  maxSizeMB: 5,
  maxFiles: 5,
  customAccept: ''
})

// Emits
const emit = defineEmits<{
  filesSelected: [files: FileObject[]]
  filesCleared: []
}>()

// Reactive data
const dropzoneRef = ref<HTMLDivElement | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFiles = ref<FileObject[]>([])
const isDragOver = ref(false)
const errors = ref<string[]>([])

// File type mappings
const fileTypeMap: Record<FileType, string[]> = {
  image: ['image/*'],
  video: ['video/*'],
  audio: ['audio/*'],
  document: ['.doc', '.docx', '.txt', '.rtf'],
  pdf: ['.pdf'],
  excel: ['.xlsx', '.xls', '.csv'],
  zip: ['.zip', '.rar', '.7z'],
  any: ['*/*']
}

const fileTypeLabels: Record<string, string> = {
  'image/': 'Image',
  'video/': 'Video',
  'audio/': 'Audio',
  'application/pdf': 'PDF',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word',
  'application/msword': 'Word',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel',
  'application/vnd.ms-excel': 'Excel',
  'text/csv': 'CSV',
  'application/zip': 'ZIP',
  'application/x-rar-compressed': 'RAR',
  'text/plain': 'Text'
}

// Computed properties
const acceptAttribute = computed(() => {
  if (props.customAccept) return props.customAccept

  const acceptTypes = props.fileTypes.flatMap(type => fileTypeMap[type] || [])
  return acceptTypes.join(',')
})

const acceptedTypesText = computed(() => {
  if (props.customAccept) return 'Custom files'

  const typeLabels = props.fileTypes.map(type => {
    switch (type) {
      case 'image': return 'Images'
      case 'video': return 'Videos'
      case 'audio': return 'Audio'
      case 'document': return 'Documents'
      case 'pdf': return 'PDF'
      case 'excel': return 'Excel/CSV'
      case 'zip': return 'Archives'
      case 'any': return 'Any files'
      default: return type
    }
  })

  return typeLabels.join(', ')
})

// File validation
const isValidFileType = (file: File): boolean => {
  if (props.customAccept) {
    const acceptTypes = props.customAccept.split(',').map(t => t.trim())
    return acceptTypes.some(type => {
      if (type === '*/*') return true
      if (type.startsWith('.')) return file.name.toLowerCase().endsWith(type.toLowerCase())
      return file.type.match(type.replace('*', '.*'))
    })
  }

  return props.fileTypes.some(type => {
    const mimeTypes = fileTypeMap[type]
    return mimeTypes.some(mimeType => {
      if (mimeType === '*/*') return true
      if (mimeType.startsWith('.')) return file.name.toLowerCase().endsWith(mimeType.toLowerCase())
      return file.type.match(mimeType.replace('*', '.*'))
    })
  })
}

// Get file type label
const getFileTypeLabel = (mimeType: string): string => {
  const exactMatch = fileTypeLabels[mimeType]
  if (exactMatch) return exactMatch

  const prefixMatch = Object.keys(fileTypeLabels).find(key => mimeType.startsWith(key))
  if (prefixMatch) return fileTypeLabels[prefixMatch] ?? 'File'

  return 'File'
}

// Get file icon component
const getFileIcon = (mimeType: string) => {
  if (mimeType.startsWith('image/')) {
    return 'material-symbols:broken-image-outline-rounded' // Image icon
  } else if (mimeType.startsWith('video/')) {
    return 'ic:baseline-ondemand-video' // Video icon  
  } else if (mimeType.startsWith('audio/')) {
    return 'solar:headphones-square-sound-line-duotone' // Audio icon
  } else if (mimeType === 'application/pdf') {
    return 'vscode-icons:file-type-pdf2' // PDF icon
  } else if (mimeType.includes('spreadsheet') || mimeType.includes('excel') || mimeType === 'text/csv') {
    return 'bi:file-earmark-spreadsheet' // Excel icon
  } else if (mimeType.includes('zip') || mimeType.includes('rar')) {
    return 'solar:zip-file-linear' // Archive icon
  } else {
    return 'solar:document-outline' // Generic file icon
  }
}

// Drag and drop handlers
const handleDragOver = (e: DragEvent) => {
  isDragOver.value = true
}

const handleDragLeave = (e: DragEvent) => {
  isDragOver.value = false
}

const handleDrop = (e: DragEvent) => {
  isDragOver.value = false
  if (e.dataTransfer?.files) {
    const files = Array.from(e.dataTransfer.files)
    processFiles(files)
  }
}

// File dialog
const openFileDialog = () => {
  fileInput.value?.click()
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    const files = Array.from(target.files)
    processFiles(files)
    target.value = '' // Clear input
  }
}

// Process selected files
const processFiles = (files: File[]) => {
  errors.value = []

  // For single file mode, clear existing files
  if (!props.multiple) {
    selectedFiles.value = []
  }

  // Filter valid files
  const validFiles = files.filter(file => isValidFileType(file))

  if (files.length > validFiles.length) {
    errors.value.push('Some files were skipped (invalid file type)')
  }

  // Check file limits
  if (!props.multiple && validFiles.length > 1) {
    errors.value.push('Only one file is allowed')
    validFiles.splice(1) // Keep only first file
  }

  if (selectedFiles.value.length + validFiles.length > props.maxFiles) {
    errors.value.push(`Maximum ${props.maxFiles} files allowed`)
    return
  }

  // Process each valid file
  validFiles.forEach(file => {
    // Check file size
    if (file.size > props.maxSizeMB * 1024 * 1024) {
      errors.value.push(`${file.name} exceeds ${props.maxSizeMB}MB limit`)
      return
    }

    // Check for duplicates
    if (selectedFiles.value.some(f => f.name === file.name && f.size === file.size)) {
      errors.value.push(`${file.name} is already selected`)
      return
    }

    // Create file object
    const fileObj: FileObject = {
      file,
      name: file.name,
      size: file.size,
      type: file.type
    }

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        fileObj.preview = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }

    selectedFiles.value.push(fileObj)
  })
}

// Remove file
const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
}

// Clear all files
const clearFiles = () => {
  selectedFiles.value = []
  errors.value = []
  emit('filesCleared')
}

// Format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Watch for file changes and emit
watch(selectedFiles, (newFiles) => {
  emit('filesSelected', newFiles)
}, { deep: true })
</script>