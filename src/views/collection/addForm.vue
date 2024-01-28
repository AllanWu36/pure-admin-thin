<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { getCreator } from "@/api/creator";
import type { FormInstance, FormRules } from "element-plus";
// 声明 props 类型
export interface addFormProps {
  data: {
    name: string;
    price: number;
    quantity: number;
    creator: number;
    date1: string;
    date2: string;
    pub_datetime: string;
    pic_url: Array<string>;
    pic_id: string;
    prev_img: string;
  };
}

// 声明 props 默认值
// 推荐阅读：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<addFormProps>(), {
  data: () => ({
    name: "",
    price: 1,
    quantity: 1,
    creator: 1,
    date1: "",
    date2: "",
    pub_datetime: "",
    pic_url: [],
    pic_id: "",
    prev_img: ""
  })
});

// vue 规定所有的 prop 都遵循着单向绑定原则，直接修改 prop 时，Vue 会抛出警告。此处的写法仅仅是为了消除警告。
// 因为对一个 reactive 对象执行 ref，返回 Ref 对象的 value 值仍为传入的 reactive 对象，
// 即 newFormInline === props.formInline 为 true，所以此处代码的实际效果，仍是直接修改 props.formInline。
// 但该写法仅适用于 props.formInline 是一个对象类型的情况，原始类型需抛出事件
// 推荐阅读：https://cn.vuejs.org/guide/components/props.html#one-way-data-flow
const newFormInline = ref(props.data);
const creators = ref([]);

const handleUploadSuccess = (response, file, fileList) => {
  console.log(response, file, fileList);
  // 处理上传成功的逻辑
  newFormInline.value.pic_url.push(response.data[0]);
  newFormInline.value.pic_id = response.data[0];
  newFormInline.value.prev_img =
    "https://pay.zhongkexl.com/staticfiles/" + response.data[0];
};

onMounted(async () => {
  try {
    const rsp = await getCreator();
    if (rsp) {
      creators.value = rsp.data.content;
    }
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
      <el-input-number v-model="newFormInline.price" :precision="2" />
    </el-form-item>
    <el-form-item label="发行商">
      <el-select v-model="newFormInline.creator" placeholder="请选择发行商">
        <el-option
          v-for="item in creators"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="发售时间">
      <el-date-picker
        v-model="newFormInline.pub_datetime"
        type="datetime"
        value-format="YYYY-MM-DD HH:mm:ss"
        placeholder="选择发售时间"
      />
    </el-form-item>
    <el-upload
      v-model:file-list="newFormInline.pic_url"
      class="upload-demo"
      method="post"
      action="/admin-api/storage/upload"
      :limit="1"
      name="file_data"
      :on-success="handleUploadSuccess"
    >
      <el-button type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        上传藏品封面图，只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </el-form>
  <img
    :src="newFormInline.prev_img"
    style="max-width: 100%; margin-bottom: 2px"
  />
</template>
