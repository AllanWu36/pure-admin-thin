<template>
    <div>
      <!-- <h1 style="text-align: center">按需引入示例</h1> -->
      <!-- <div class="px-2 py-1 text-right">
            <el-button type="primary" plain @click="handleClickAddRole"
              >添加兑换码+</el-button
            >
          </div> -->
      <pure-table
        border
        :loading="loading"
        :data="tableData"
        :columns="columns"
        :pagination="pagination"
      >
        <template #operation="{ row }">
          <el-button link type="primary" size="small"> 查看 </el-button>
          <el-button link type="warning" size="small"> 修改 </el-button>
          <el-button link type="danger" size="small"> 删除 </el-button>
        </template>
      </pure-table>
      <dialog />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, reactive, onMounted } from "vue";
  import type { TableColumns } from "@pureadmin/table";
  
  const users = [
    {
      id: 1,
      rolename: "超级管理员",
      Permission: "CREATE_* DELETE_* UPDATE_*",
      lastUpdataTime: "2024-01-25 10:30:00"
    },
    {
      id: 2,
      rolename: "管理员",
      Permission: "CREATE_* UPDATE_*",
      lastUpdataTime: "2024-01-24 15:45:00"
    },
    {
      id: 3,
      rolename: "商城管理员",
      Permission: "CREATE_ITEM UPDATE_ITEM",
      lastUpdataTime: "2024-01-23 08:15:00"
    },
    {
      id: 4,
      rolename: "库存管理员",
      Permission: "CREATE_ITEM UPDATE_ITEM",
      lastUpdataTime: "2024-01-22 18:20:00"
    },
    {
      id: 5,
      rolename: "普通用户",
      Permission: "-",
      lastUpdataTime: "2024-01-22 18:20:00"
    }
  ];
  const columns: Array<TableColumns> = [
    {
      label: "id",
      prop: "id"
    },
    {
      label: "用户名",
      prop: "rolename"
    },
    {
      label: "权限标识",
      prop: "Permission"
    },
    {
      label: "修改时间",
      prop: "lastUpdataTime"
    },
    {
      label: "操作",
      width: "180",
      fixed: "right",
      slot: "operation"
    }
  ];
  
  const tableData = ref(users);
  
  const loading = ref(false);
  const pagination = reactive({
    pageSize: 5,
    currentPage: 1,
    background: true,
    total: tableData.value.length
  });
  </script>
  