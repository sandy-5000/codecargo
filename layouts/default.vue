<template>
  <body class="font-sans text-gray-900 antialiased">
    <div class="h-screen a-center bg-gray-900 dark:bg-gray-900">
      <div style="width: min(100%, 500px);" class="min-h-screen flex flex-col justify-center pt-6 px-3 sm:pt-0">
        <div class="flex flex-col">
          <a href="/" class="flex justify-start px-3">
            <ui-logo class="h-16 mr-2" />
            <div class="a-center">
              <h1 class="text-2xl block font-normal logo-text">DARKUBE</h1>
            </div>
          </a>
        </div>
        <div class="w-full sm:max-w-md mt-2 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden rounded-lg">
          <slot />
        </div>
      </div>
    </div>
  </body>
</template>