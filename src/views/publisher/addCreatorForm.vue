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
  <div>test</div>
</template>

<style lang='scss' scoped>

</style>
