<template>
    <div class="rounded-xl" v-html="highlightedCode"></div>
</template>
<script setup>
    import { useShiki } from '@/composables/useShiki';
    import { ref, onMounted, watch } from 'vue';

    const highlightedCode = ref('');

    const { highlightCode } = useShiki();

    const props = defineProps({
        code: {
            type: String,
            required: true
        },
        lang: {
            type: String,
            default: 'json'
        },
        theme: {
            type: String,
            default: 'nord'
        }
    })

    watch(
        () => props.code,
        async (newCode) => {
            highlightedCode.value = await highlightCode(newCode, { lang: props.lang, theme: props.theme })
        }
    )


    onMounted(async () => {
        highlightedCode.value = await highlightCode(props.code, { lang: 'json', theme: 'nord' })
    })
</script>

<style>
.shiki {
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
}

</style>