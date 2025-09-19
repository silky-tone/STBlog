<template>
  <el-config-provider>
    <router-view/>
  </el-config-provider>
</template>

<script lang="ts">export default { name: 'AppView' };</script>
<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
</script>

<style lang="scss" src="./style.scss"/>
