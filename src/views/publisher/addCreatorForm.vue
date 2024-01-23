<script setup lang='ts'>
import { onMounted, ref, reactive } from 'vue';
// 声明 props 类型
export interface addFormProps {
  creator: {
    name: string;
    img: string;
  };
}

const props = withDefaults(defineProps<addFormProps>(), {
  creator: () => ({ name: "", img: "" })
});
const creator = ref(props.creator);

onMounted(async () => {
  creator.value.name = "aaa";
  creator.value.img = "http://";
});
</script>

<template>
  <el-form :model="creator">
    <el-form-item label="名称">
      <el-input
        v-model="creator.name"
        class="!w-[400px]"
        placeholder="请输入名称"
      />
    </el-form-item>
    <el-form-item label="头像">
      <el-input
        v-model="creator.img"
        class="!w-[880px]"
        placeholder="请输入图片url"
      />
    </el-form-item>
  </el-form>
</template>

<style lang='scss' scoped>
</style>
