<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { getCollections } from "@/api/collection";

// 声明 props 类型
export interface addFormProps {
  data: {
    collectionId: string;
    quantity: number;
  };
}

// 声明 props 默认值
// 推荐阅读：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<addFormProps>(), {
  data: () => ({
    collectionId: "",
    quantity: 0
  })
});

// vue 规定所有的 prop 都遵循着单向绑定原则，直接修改 prop 时，Vue 会抛出警告。此处的写法仅仅是为了消除警告。
// 因为对一个 reactive 对象执行 ref，返回 Ref 对象的 value 值仍为传入的 reactive 对象，
// 即 newFormInline === props.formInline 为 true，所以此处代码的实际效果，仍是直接修改 props.formInline。
// 但该写法仅适用于 props.formInline 是一个对象类型的情况，原始类型需抛出事件
// 推荐阅读：https://cn.vuejs.org/guide/components/props.html#one-way-data-flow
const newFormInline = ref(props.data);
const collections = ref([]);

onMounted(async () => {
  try {
    const rsp = await getCollections();
    if (rsp.success === true) {
      collections.value = rsp.data.content;
    }
  } catch (error) {
    console.error("获取数据失败", error);
  }
});
</script>

<template>
  <el-form :model="newFormInline">
    <el-form-item label="藏品名称">
      <el-select v-model="newFormInline.collectionId" placeholder="请选择藏品">
        <el-option
          v-for="item in collections"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="数量">
      <el-input-number v-model="newFormInline.quantity" :min="1" :max="100" />
    </el-form-item>

  </el-form>
</template>
