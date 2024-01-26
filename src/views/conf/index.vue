<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="系统名称">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="选择区块链平台">
      <el-select v-model="form.chain" placeholder="选择对接的区块链平台">
        <el-option label="无" value="0" />
        <el-option label="享链平台" value="1" />
        <el-option label="测试环境" value="2" />
      </el-select>
    </el-form-item>
    <el-form-item label="版本">
      <el-input v-model="form.version" type="text" />
    </el-form-item>
    <el-form-item label="更新时间">
      <el-input v-model="form.update_time" type="text" />
    </el-form-item>
    <el-form-item label="应用地址">
      <el-input v-model="form.app_url" type="url" />
    </el-form-item>
    <el-form-item label="图片加载地址">
      <el-input v-model="form.staticfile_url" type="url" />
    </el-form-item>
    <el-form-item label="区块链平台地址">
      <el-input v-model="form.chain_addr" type="url" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">更新</el-button>

    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

// do not use same name with ref
const form = reactive({
  name: "化屋村数字藏品平台",
  version: "1.0.0",
  update_time: "2024/01/01",
  app_url: "https://pay.zhongkexl.com",
  chain: "1",
  staticfile_url: "https://pay.zhongkexl.com",
  chain_addr: "http://117.187.117.6"
});

const onSubmit = () => {
  console.log("submit!");
};
</script>
