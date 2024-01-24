<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";

// 声明 props 类型
export interface addFormProps {
  data: {
    name: string;
    price: number;
    quantity: number;
    creator: number;
    pickFlag: boolean;
  };
}

// 声明 props 默认值
// 推荐阅读：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<addFormProps>(), {
  data: () => ({ name: "", price: 1, quantity: 1, creator: 1, pickFlag: false })
});

// vue 规定所有的 prop 都遵循着单向绑定原则，直接修改 prop 时，Vue 会抛出警告。此处的写法仅仅是为了消除警告。
// 因为对一个 reactive 对象执行 ref，返回 Ref 对象的 value 值仍为传入的 reactive 对象，
// 即 newFormInline === props.formInline 为 true，所以此处代码的实际效果，仍是直接修改 props.formInline。
// 但该写法仅适用于 props.formInline 是一个对象类型的情况，原始类型需抛出事件
// 推荐阅读：https://cn.vuejs.org/guide/components/props.html#one-way-data-flow
const newFormInline = ref(props.data);

const cities = ref([{ value: "北京", label: "北京" }]);
onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:8001/getlist");
    cities.value = response.data; // 假设返回的数据是一个城市数组
  } catch (error) {
    console.error("获取城市数据失败", error);
  }
});
</script>

<template>
  <el-form :model="newFormInline">
    <el-form-item label="藏品名称">
      <el-input
        v-model="newFormInline.name"
        class="!w-[220px]"
        placeholder="请输入藏品名称"
      />
    </el-form-item>
    <el-form-item label="数量">
      <el-input-number v-model="newFormInline.quantity" :min="1" :max="100" />
    </el-form-item>
    <el-form-item label="价格">
      <el-input-number v-model="newFormInline.price" :precision='2' />
    </el-form-item>
    <el-form-item label="价格">
      <el-input-number v-model="newFormInline.price" :precision='2' />
    </el-form-item>
  </el-form>
</template>
