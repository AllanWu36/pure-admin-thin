<template>
  <div>
    <!-- <h1 style="text-align: center">按需引入示例</h1> -->
    <div class="px-2 py-1 text-right">
      <el-button type="primary" plain @click="handleClickAddRole"
        >添加兑换码+</el-button
      >
    </div>
    <pure-table
      border
      :loading="loading"
      :data="tableData"
      :columns="columns"
      :pagination="pagination"
    >
      <template #operation="{ row }">
        <el-button link type="primary" size="small" @click="handleClick(row)">
          详情
        </el-button>
        <el-button
          link
          type="primary"
          size="small"
          @click="handleClickUpdateStory(row)"
        >
          修改图片
        </el-button>
        <el-button link type="warning" size="small">删除</el-button>
      </template>
    </pure-table>
    <dialog />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import type { TableColumns } from "@pureadmin/table";
import { addDialog } from "@/components/ReDialog";
import { message } from "@/utils/message";
// import testforms, { type TestFormProps } from "./form.vue";
import forms, { type FormProps } from "./imgform.vue";
import { getCollections } from "@/api/collection";
function handleClick(row) {
  console.log(
    "%crow===>>>: ",
    "color: MidnightBlue; background: Aquamarine; font-size: 20px;",
    row
  );
}

// 修改story图片
function handleClickUpdateStory(row) {
  addDialog({
    width: "70%",
    title: "修改图片",
    contentRenderer: () => forms,
    props: {
      // 赋默认值
      data: {
        id: row,
        num: 0,
        urlList: []
      }
    },
    closeCallBack: ({ options, args }) => {
      // options.props 是响应式的
      const { data } = options.props as FormProps;
      // const text = `姓名：${formInline.user} 城市：${formInline.region}`;
      console.log(data.urlList);
      if (args?.command === "cancel") {
        // 您点击了取消按钮
        message(`您点击了取消按钮，当前表单数据为 ${data.urlList},id为${row}`);
      } else if (args?.command === "sure") {
        message(`您点击了确定按钮，当前表单数据为 ${data.urlList}`);
      } else {
        // message(`您点击了右上角关闭按钮或者空白页，当前表单数据为 ${text}`);
      }
    }
  });
}

const columns: Array<TableColumns> = [
  {
    label: "名字",
    prop: "name"
  },
  {
    label: "价格",
    prop: "price"
  },
  {
    label: "发行量",
    prop: "quantity"
  },
  {
    label: "库存 ",
    prop: "stock"
  },
  {
    label: "发行时间 ",
    prop: "saleTime"
  },
  {
    label: "操作",
    width: "180",
    fixed: "right",
    slot: "operation"
  }
];

const tableData = ref([]);

const loading = ref(true);
const pagination = reactive({
  pageSize: 5,
  currentPage: 1,
  background: true,
  total: tableData.value.length
});

onMounted(async () => {
  try {
    const collections = await getCollections();
    if (collections) {
      console.log(collections);
      tableData.value = collections.data.content;
    }
    loading.value = false;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
});
</script>
