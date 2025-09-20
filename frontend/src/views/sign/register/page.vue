<template>
  <div class="">
    <div>Register</div>
    <el-button @click="gotoLogin">goto Login</el-button>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function gotoLogin() {
  router.push('/sign/login');
}
</script>
