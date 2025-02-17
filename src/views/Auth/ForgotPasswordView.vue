<template>
    <main class="pb-24">

        <h1 class="text-3xl font-bold mb-1">Forgot password</h1>
        <p class="text-xl text-gray-600">
            Send a password reset link to the user's email.
        </p>


        <Endpoint endpoint="forgot-password" method="POST" />


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

                    <Input v-model="form.email" label-text="Email" input-type="email" input-id="email"
                        :errors="errors?.email" @clear-errors="clearErrors('email')" />
 

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
    import { ref, reactive, computed } from 'vue';
    import { useRequest } from '@/composables/useRequest';
    import SubmitButton from '@/components/SubmitButton.vue';

    const validateRules = `{
    "email": "required|max:255|email|exists:user,email",
}
`
    const body = `{
    "email": "carlosmateo484@gmail.com",
}`;

    const successResponse = `{
    "message": "reset link sent on your email."
}`;


    const { forgotPassword } = useAuthStore();

    const form = reactive({
        email: 'carlosmateo484@gmail.com',
 
    });

    const responseData = ref({ "request": "no sent" });

    const responseString = computed(() => JSON.stringify(responseData.value, null, 2));

    const { isLoading, errors, clearErrors, submit: handleSubmit } = useRequest(
        async () => await forgotPassword(form), {
        onSuccess(response) {
            responseData.value = response.data;
        },
        onError(error) {
            responseData.value = error.response.data;
        }
    });
</script>