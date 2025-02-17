<template>
    <main class="pb-24">

        <h1 class="text-3xl font-bold mb-1">
            Logout
        </h1>

        <p class="text-xl text-gray-600">
            Log out of your account and invalidate the authentication token.
        </p>

        <Endpoint endpoint="user" method="DELETE" />

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
                    Login to your account before logging out.
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
    import { ref, computed } from 'vue';
    import { useRequest } from '@/composables/useRequest';
    import SubmitButton from '@/components/SubmitButton.vue';

    const headers = `{ "Authorization": "Bearer <<Token>>" } => headers to send in the request`;

    const middlewares = `["auth:sanctum"] => middleware to verify the user's authentication`;

    const successResponse = `{
    "message": "logged out successfully"
}`;
 
    const { logout } = useAuthStore();
    
    const responseData = ref({ "request": "no sent" });

    const responseString = computed(() => JSON.stringify(responseData.value, null, 2));

    const { isLoading, submit: handleSubmit } = useRequest(
        async () => await logout(), {
        onSuccess(response) {
            responseData.value = response.data; 
        },
        onError(error) {
            responseData.value = error.response.data;
        }
    });

 
</script>