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
        <el-button
          link
          type="warning"
          size="small"
          @click="handleDetailClick(row)"
        >
          详情
        </el-button>
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
import { getMembers } from "@/api/member";
import editForm from "./editMemberForm.vue";
//删除兑换码
function handleDetailClick(row) {
  addDialog({
    width: "70%",
    title: "修改图片",
    contentRenderer: () => editForm,

    closeCallBack: ({ options, args }) => {
      if (args?.command === "cancel") {
        // 您点击了取消按钮
        message(`您点击了取消按钮`);
      } else if (args?.command === "sure") {

        message(`您点击了确定按钮`);
      } else {
        // message(`您点击了右上角关闭按钮或者空白页，当前表单数据为 ${text}`);
      }
    }
  });
}

const columns: Array<TableColumns> = [
  {
    label: "id",
    prop: "id"
  },
  {
    label: "名称",
    prop: "nick_name"
  },
  {
    label: "注册时间",
    prop: "registered_time"
  },
  {
    label: "区块链地址 ",
    prop: "block_chain_txid"
  },
  {
    label: "区块链证书 ",
    prop: "block_chain_cert_name"
  },
  {
    label: "最后登录时间 ",
    prop: "lately_login_time"
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
    const members = await getMembers();
    if (members) {
      console.log(members);
      tableData.value = members.data.content;
    }
    loading.value = false;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
});
</script>
