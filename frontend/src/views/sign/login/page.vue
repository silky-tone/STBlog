<template>
  <div class="">
    <div>Login</div>
    <el-button @click="onClick">xxxxx</el-button>
  </div>
</template>
<script setup lang="ts">
import { test } from '../../../api';

function onClick() {
  test().then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });
}

</script>

