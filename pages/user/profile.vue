<template>
  <NuxtLayout :name="layout" header="Profile" title="Profile">
    <div class="py-12 mx-2 md:mx-0">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
        <div class="p-4 sm:p-8 bg-gray-800 shadow rounded-lg">
          <div class="max-w-xl">
            <section>
              <header>
                <h2 class="text-lg font-medium text-gray-100">
                  {{ __('Profile Information') }}
                </h2>
                <p class="mt-1 text-sm text-gray-400">
                  {{ __("Update your account's profile information and email address.") }}
                </p>
              </header>
              <form method="post" action="#" class="mt-6 space-y-6">
                <div>
                  <ui-input-label for="name" :value="__('Name')" />
                  <ui-text-input id="name" :value="info.profile.name" name="name" type="text" class="mt-1 block w-full"
                    required autofocus />
                  <ui-input-error class="mt-2" :messages="null" />
                </div>

                <div>
                  <ui-input-label for="email" :value="__('Email')" />
                  <ui-text-input id="email" :value="info.profile.email" name="email" type="email"
                    class="mt-1 block w-full" required />
                  <ui-input-error class="mt-2" :messages="null" />

                  <div v-if="true">
                    <p class="text-sm mt-2 text-gray-200">
                      {{ __('Your email address is unverified.') }}

                      <button form="send-verification"
                        class="underline text-sm text-gray-400 hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800">
                        {{ __('Click here to re-send the verification email.') }}
                      </button>
                    </p>
                    <p v-if="true" class="mt-2 font-medium text-sm text-green-400">
                      {{ __('A new verification link has been sent to your email address.') }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <ui-button-primary>{{ __('Save') }}</ui-button-primary>
                  <p v-if="show.profileUpdated" class="text-sm text-gray-400">{{
                    __('Saved.') }}</p>
                </div>
              </form>
            </section>
          </div>
        </div>

        <div class="p-4 sm:p-8 bg-gray-800 shadow rounded-lg">
          <div class="max-w-xl">
            <section>
              <header>
                <h2 class="text-lg font-medium text-gray-100">
                  {{ __('Update Password') }}
                </h2>

                <p class="mt-1 text-sm text-gray-400">
                  {{ __('Ensure your account is using a long, random password to stay secure.') }}
                </p>
              </header>

              <form method="post" action="#" class="mt-6 space-y-6">
                <div>
                  <ui-input-label for="current_password" :value="__('Current Password')" />
                  <ui-text-input id="current_password" :value="info.passwd.current" name="current_password"
                    type="password" class="mt-1 block w-full" />
                  <ui-input-error :messages="null" class="mt-2" />
                </div>

                <div>
                  <ui-input-label for="password" :value="__('New Password')" />
                  <ui-text-input id="password" :value="info.passwd.updated" name="password" type="password"
                    class="mt-1 block w-full" />
                  <ui-input-error :messages="null" class="mt-2" />
                </div>

                <div>
                  <ui-input-label for="password_confirmation" :value="__('Confirm Password')" />
                  <ui-text-input id="password_confirmation" :value="info.passwd.confirm" name="password_confirmation"
                    type="password" class="mt-1 block w-full" />
                  <ui-input-error :messages="null" class="mt-2" />
                </div>

                <div class="flex items-center gap-4">
                  <ui-button-primary>{{ __('Save') }}</ui-button-primary>
                  <p v-if="show.passwordUpdated" class="text-sm text-gray-400">{{ __('Saved.') }}</p>
                </div>
              </form>
            </section>
          </div>
        </div>

        <div class="p-4 sm:p-8 bg-gray-800 shadow rounded-lg">
          <div class="max-w-xl">
            <section class="space-y-6">
              <header>
                <h2 class="text-lg font-medium text-gray-100">
                  {{ __('Delete Account') }}
                </h2>
                <p class="mt-1 text-sm text-gray-400">
                  Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting
                  your account, please download any data or information that you wish to retain.
                </p>
              </header>
              <ui-button-danger>{{ __('Delete Account') }}</ui-button-danger>
            </section>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
const layout = 'app'
const { session } = await useSession()
const route = useRoute()
if (!session.value || !session.value._id) {
  navigateTo(`/login?redirect=${route.path}`)
}

const info = useState('info', () => {
  return {
    profile: {
      name: session.value.name,
      email: session.value.email,
    },
    passwd: {
      current: '',
      updated: '',
      confirm: '',
    },
  }
})

const show = useState('show', () => {
  return {
    profileUpdated: false,
    passwordUpdated: false,
  }
})
</script>