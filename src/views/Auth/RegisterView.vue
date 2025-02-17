<template>
    <main class="pb-24">

        <h1 class="text-3xl font-bold mb-1">Register</h1>
        <p class="text-xl text-gray-600">Create a new account, send a verification email, and get an authentication
            token.</p>


        <Endpoint endpoint="register" method="POST" />


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

                    <Input v-model="form.name" label-text="Name" input-type="text" input-id="name"
                        :errors="errors?.name" @clear-errors="clearErrors('name')" />

                    <Input v-model="form.email" label-text="Email" input-type="email" input-id="email"
                        :errors="errors?.email" @clear-errors="clearErrors('email')" />

                    <Input v-model="form.password" label-text="Password" input-type="password" input-id="password"
                        :errors="errors?.password" @clear-errors="clearErrors('password')" />

                    <Input v-model="form.passwordConfirmation" label-text="Password Confirmation" input-type="password"
                        input-id="password_confirmation" />

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
    "name": "required|max:255|string",
    "email": "required|max:255|email|unique:user,email",
    "password": "required|string|min:8|confirmed",
}
`
    const body = `{
    "name": "Carlos Mateo Martinez",
    "email": "carlosmateo484@gmail.com",
    "password": "123456789",
    "passwordConfirmation": "123456789"
}`;

    const successResponse = `{
  "data": {
    "user": {
      "id": 7,
      "name": "Carlos Mateo Martinez",
      "email": "carlosmateofd484@gmail.com",
      "emailVerified": null,
      "updatedAt": "2025-02-17T01:48:40.000000Z",
      "createdAt": "2025-02-17T01:48:40.000000Z"
    },
    "token": "10|TNcbSNCmp70hQSLblwSEOey5h7nn5WDYTWarH5Kt2ec6c209"
  }
}`;

    const form = reactive({
        name: 'Carlos Mateo Martinez',
        email: 'carlosmateo484@gmail.com',
        password: '123456789',
        passwordConfirmation: '123456789'
    });

    const { register } = useAuthStore();

    const responseData = ref({ "request": "no sent" });

    const responseString = computed(() => JSON.stringify(responseData.value, null, 2));

    const { isLoading, errors, clearErrors, submit: handleSubmit } = useRequest(
        async () => await register(form), {
        onSuccess(response) {
            responseData.value = response.data;
        },
        onError(error) {
            responseData.value = error.response.data;
        }
    });


</script>