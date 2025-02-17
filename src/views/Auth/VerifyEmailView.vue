<template>
    <main class="pb-24">

        <h1 class="text-3xl font-bold mb-1">Verify Email</h1>
        <p class="text-xl text-gray-600">
            Verify the user's email using the token sent to the user's email.
        </p>


        <Endpoint endpoint="verify-email" method="POST" />


        <!-- validation rules -->
        <div class="mb-4">
            <h2 class="text-xl mb-2">Validation rules</h2>
            <Code :code="validateRules" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
                <h2 class="text-xl mb-2">Body </h2>
                <Code :code="body" />
            </div>

            <div>
                <h2 class="text-xl mb-2">Success response</h2>
                <Code :code='successResponse' />
            </div>

            <div>
                <h2 class="text-xl mb-2">Form request </h2>
                <form class="p-4 border border-gray-300 rounded-md flex flex-col gap-2 shadow"
                    @submit.prevent="handleSubmit">

                    <Input v-model="form.token" label-text="Token" input-type="text" input-id="token"
                        :errors="errors?.token" @clear-errors="clearErrors('token')" />

                    <div class="flex justify-end mt-4">
                        <SubmitButton :is-loading="isLoading" />
                    </div>
                </form>
            </div>
            <div>
                <h2 class="text-xl mb-2">Request response </h2>
                <Code :code="responseString" />
            </div>

        </div>
    </main>
</template>
<script setup>

    import Endpoint from '@/components/Endpoint.vue';
    import Code from '@/components/Code.vue';
    import Input from '@/components/Input.vue';
    import { useAuthStore } from '@/stores/auth';
    import { ref, reactive, computed, onMounted} from 'vue';
    import { useRoute } from 'vue-router';
    import { useRequest } from '@/composables/useRequest';
    import SubmitButton from '@/components/SubmitButton.vue';

    const validateRules = `{
    "token": "required|string|max:255",
}
`
    const body = `{ 
    "token": "90c16b86d2a2db3dc177b20619cbff50ca0257c5684b32192c0c4d85b4f6b1bd",
}`;

    const successResponse = `{
    "message": "email verified successfully"
}`;

    const route = useRoute();

    const { verifyEmail } = useAuthStore();

    const form = reactive({
        token: '90c16b86d2a2db3dc177b20619cbff50ca0257c5684b32192c0c4d85b4f6b1bd',
    });

    const responseData = ref({ "request": "no sent" });

    const responseString = computed(() => JSON.stringify(responseData.value, null, 2));

    const { isLoading, errors, clearErrors, submit: handleSubmit } = useRequest(
        async () => await verifyEmail(form), {
        onSuccess(response) {
            responseData.value = response.data;
        },
        onError(error) {
            responseData.value = error.response.data;
        }
    });

    onMounted(() => {
        if (route.query.token) { form.token = route.query.token; }
    })
</script>