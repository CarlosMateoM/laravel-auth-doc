<template>
    <button :disabled="isLoading" class="flex  items-center gap-2 text-md bg-slate-900 text-white px-4 py-1 rounded-2xl" type="submit">
        <span>
            Submit
        </span>
        <div v-if="isLoading" class="w-4 h-4 border rounded-full border-l border-l-slate-900 animate-spin" >
        </div>
    </button>
</template>
<script setup>
   const props = defineProps({
        isLoading: {
            type: Boolean,
            default: false
        }
    });
</script>
