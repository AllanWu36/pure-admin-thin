<script setup lang='ts'>
import { getCreatorById } from '@/api/creator';
import { onMounted, ref, reactive } from 'vue';

export interface editFormProps {
  creator: {
    name: string;
    img: string;
  };
}

const props = withDefaults(defineProps<editFormProps>(), {
  creator: () => ({ name: "", img: "" })
});
const creator = ref(props.creator);

// const loading = ref(true);

// onMounted(async () => {
//   try {
//     const rep = await getCreatorById("1");
//     if (rep.status) {
//       creator.value.name = rep.data.items.name;
//       creator.value.img = rep.data.items.name;s
//     }
//     loading.value = false;
//   } catch (error) {
//     console.error("Error fetching images:", error);
//   }
// });
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
