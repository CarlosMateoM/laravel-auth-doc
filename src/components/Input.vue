<template>
    <div>
        <label :class="labelClass" :for="inputId">{{ labelText }}</label>
        <input v-model="model" class="w-full py-1 px-2 border border-gray-200 rounded-xl outline-0" :type="inputType" :id="inputId" />
        <div v-if="errors" class="flex justify-between text-red-500 text-sm px-2" >
            <p class="" >{{ errors[0] }}</p> <button @click="emits('clearErrors', errors)" class="" >Limpiar</button>
        </div>
    </div>
</template>
<script setup>

    const model = defineModel();

    const emits = defineEmits(['clearErrors']);

    const props = defineProps({
        labelText: {
            type: String,
        },
        labelClass: {
            type: String,
            default: 'block'
        },
        inputType: {
            type: String,
            default: 'text'
        },
        inputId: {
            type: String,
            default: 'text'
        },
        errors: null

    });

</script>