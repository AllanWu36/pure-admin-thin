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
        <el-button link type="primary" size="small">修改图片</el-button>
        <el-button link type="warning" size="small">删除</el-button>
      </template>
    </pure-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { TableColumns } from "@pureadmin/table";

function handleClick(row) {
  console.log(
    "%crow===>>>: ",
    "color: MidnightBlue; background: Aquamarine; font-size: 20px;",
    row
  );
}

const columns: Array<TableColumns> = [
  {
    label: "日期",
    prop: "date"
  },
  {
    label: "名字",
    prop: "name"
  },
  {
    label: "地址",
    prop: "address"
  },
  {
    label: "操作",
    width: "180",
    fixed: "right",
    slot: "operation"
  }
];

const tableData = [
  {
    date: "2030-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2030-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2030-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2030-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2030-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2030-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2030-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2030-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },

  {
    date: "2030-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  }
];

const loading = ref(true);
const pagination = reactive({
  pageSize: 5,
  currentPage: 1,
  background: true,
  total: tableData.length
});

setTimeout(() => {
  loading.value = false;
}, 1500);
</script>
