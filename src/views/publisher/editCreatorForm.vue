<script setup lang='ts'>
import { getCreatorById } from '@/api/creator';
import { onMounted, ref, reactive } from 'vue';

export interface editFormProps {
  creator: {
    name: string;
    img: string;
  };
}

const tableData = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const creators = await getCreatorById("1");
    if (creators) {
      console.log(creators);
      tableData.value = creators.data.items;
    }
    loading.value = false;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
});
</script>

<template>
  <div>test</div>
</template>

<style lang='scss' scoped>

</style>
