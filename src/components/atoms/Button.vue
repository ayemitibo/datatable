<template>
  <button
    class="inline-flex justify-center items-center text-sm rounded p-1"
  >
    <span>
      <slot name="icon" />
    </span>
    <span class="ml-1">
      <slot />
    </span>
  </button>
</template>
