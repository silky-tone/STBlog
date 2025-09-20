<template>
  <div class="">
    <div>Login</div>
    <el-button @click="gotoRegister">goto Register</el-button>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function gotoRegister() {
  router.push('/sign/register');
}
</script>

