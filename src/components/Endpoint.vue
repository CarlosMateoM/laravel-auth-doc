<template>
    <div class="my-8">
        <h2 class="text-xl mb-2">Endpoint </h2>
        <div class="flex items-center justify-between bg-gray-50 p-2 rounded-md text-2xl">
            <div>
                <span :class="methodClass" class="font-bold border-r border-gray-900 mr-4 pr-4 uppercase">
                    {{ method }}
                </span>
                <span class="text-gray-900 ">
                    {{ fullUrl }}
                </span>
            </div>
            <button @click="copyToClipboard" :disabled="isCopy" >
                <Copy v-if="!isCopy" />
                <CopyCheck v-else/>
            </button>
        </div>
    </div>

</template>
<script setup>
    import CopyCheck from './icons/CopyCheck.vue';
    import Copy from './icons/Copy.vue';
    import { computed, ref } from 'vue';

    const baseUrl = 'https://auth-api.mateomartinez.dev/api/v1/';

    const props = defineProps({
        endpoint: {
            type: String,
            required: true
        },
        method: {
            type: String,
            default: 'POST'
        }
    })

    const fullUrl = computed(() => baseUrl + props.endpoint);

    const methodsClasses = {
        'POST': 'text-yellow-400',
        'GET': 'text-green-400',
        'PUT': 'text-blue-400',
        'DELETE': 'text-red-400',
    }

    const methodClass = computed(() => methodsClasses[props.method]);

    const isCopy = ref(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(fullUrl.value);
        isCopy.value = true;
        setTimeout(() => {
            isCopy.value = false;
        }, 2000)
    }

</script>