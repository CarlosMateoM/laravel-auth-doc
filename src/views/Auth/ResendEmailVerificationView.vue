<template>
    <main class="pb-24">

        <h1 class="text-3xl font-bold mb-1">Resend email verification</h1>

        <p class="text-xl text-gray-600">
            Resend the email verification link to the user's email.
        </p>

        <Endpoint endpoint="resend-email-verification" method="POST" />

        <!-- headers -->
        <div class="mb-4">
            <h2 class="text-xl mb-2">Headers</h2>
            <Code :code="headers" />
        </div>

        <!-- middlewares auth:sanctum -->
        <div class="mb-4">
            <h2 class="text-xl mb-2">Middlewares</h2>
            <Code :code="middlewares" />
        </div>
        

        <div class="mb-4">
            <h2 class="text-xl mb-2">Success response</h2>
            <Code :code='successResponse' />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

            <div>
                <h2 class="text-xl mb-2">Form request </h2>

                <form class="p-4 border border-gray-300 rounded-md flex flex-col gap-2 shadow"
                    @submit.prevent="handleSubmit">
                  <p>
                    Login to your account before sending the email verification link.
                  </p>
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
    import { useAuthStore } from '@/stores/auth';
    import { ref, computed, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { useRequest } from '@/composables/useRequest';
    import SubmitButton from '@/components/SubmitButton.vue';

    const headers = `{ "Authorization": "Bearer <<Token>>" } => headers to send in the request`;

    const middlewares = `["auth:sanctum"] => middleware to verify the user's authentication`;

    const successResponse = `{
    "message": "email verification link sent on your email"
}`;

    const route = useRoute();

    const { resendEmailVerification } = useAuthStore();

     

    const responseData = ref({ "request": "no sent" });

    const responseString = computed(() => JSON.stringify(responseData.value, null, 2));

    const { isLoading, errors, clearErrors, submit: handleSubmit } = useRequest(
        async () => await resendEmailVerification(), {
        onSuccess(response) {
            responseData.value = response.data;
        },
        onError(error) {
            responseData.value = error.response.data;
        }
    });

    onMounted(() => {
        if (route.query.token) { form.token = route.query.token; }
        if (route.query.email) { form.email = route.query.email; }
    })
</script>