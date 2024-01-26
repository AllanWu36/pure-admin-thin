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
    username: "admin",
    phoneNumber: "15144597899",
    email: "1234567890@example.com",
    role: "超级管理员",
    lastLoginTime: "2024-01-25 10:30:00"
  },
  {
    id: 2,
    username: "user2",
    phoneNumber: "15144597898",
    email: "2345678901@example.com",
    role: "商城管理员",
    lastLoginTime: "2024-01-24 15:45:00"
  },
  {
    id: 3,
    username: "user3",
    phoneNumber: "15144597897",
    email: "3456789012@example.com",
    role: "仓库管理员",
    lastLoginTime: "2024-01-23 08:15:00"
  },
  {
    id: 4,
    username: "user4",
    phoneNumber: "15144597896",
    email: "4567890123@example.com",
    role: "仓库管理员",
    lastLoginTime: "2024-01-22 18:20:00"
  },
  {
    id: 5,
    username: "user5",
    phoneNumber: "15144597895",
    email: "5678901234@example.com",
    role: "仓库管理员",
    lastLoginTime: "2024-01-21 12:00:00"
  },
  {
    id: 6,
    username: "user6",
    phoneNumber: "15144597894",
    email: "6789012345@example.com",
    role: "普通用户",
    lastLoginTime: "2024-01-20 09:30:00"
  },
  {
    id: 7,
    username: "user7",
    phoneNumber: "15144597893",
    email: "7890123456@example.com",
    role: "普通用户",
    lastLoginTime: "2024-01-19 16:45:00"
  },
  {
    id: 8,
    username: "user8",
    phoneNumber: "15144597892",
    email: "8901234567@example.com",
    role: "普通用户",
    lastLoginTime: "2024-01-18 11:20:00"
  },
  {
    id: 9,
    username: "user9",
    phoneNumber: "15144597892",
    email: "9012345678@example.com",
    role: "普通用户",
    lastLoginTime: "2024-01-17 14:10:00"
  },
  {
    id: 10,
    username: "user10",
    phoneNumber: "15144597890",
    email: "user10@example.com",
    role: "user",
    lastLoginTime: "2024-01-16 07:30:00"
  }
];
const columns: Array<TableColumns> = [
  {
    label: "id",
    prop: "id"
  },
  {
    label: "用户名",
    prop: "username"
  },
  {
    label: "所属角色",
    prop: "role"
  },
  {
    label: "手机号",
    prop: "phoneNumber"
  },
  {
    label: "邮箱",
    prop: "email"
  },
  {
    label: "修改时间",
    prop: "lastLoginTime"
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
