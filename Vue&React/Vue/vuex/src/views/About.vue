<template>
  <div class="about">
    <p>{{ $store.state.a }}</p>
    <p>{{ $store.state.b }}</p>
    <button @click="$store.dispatch('change')">+</button>
    <button @click="$store.commit('change')">+</button>
  </div>
</template>
