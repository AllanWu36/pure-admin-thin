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
      @page-size-change="onSizeChange"
      @page-current-change="onCurrentChange"
    >
      <template #operation="{ row }">
        <el-button
          link
          type="warning"
          size="small"
          @click="handleDetailClick(row)"
        >
          删除
        </el-button>
        <el-button v-if="!row.blockChainAddr" link type="warning" size="small" >
          区块链注册
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
import { pa } from "element-plus/es/locale";


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
function onSizeChange(val) {
  pagination.pageSize = val;
  console.log("onSizeChange", val);
}

async function onCurrentChange(val) {
  loading.value = true;
  await refreshTable(val);
}

const columns: Array<TableColumns> = [
  {
    label: "id",
    prop: "id"
  },
  {
    label: "名称",
    prop: "nickName"
  },
  {
    label: "注册时间",
    prop: "registeredTime"
  },
  {
    label: "区块链地址 ",
    prop: "blockChainAddr"
  },
  {
    label: "电话",
    prop: "mobile"
  },
  {
    label: "最后登录时间 ",
    prop: "avatar"
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
  pageSize: 10,
  currentPage: 1,
  background: true,
  total: tableData.value.length
});

async function refreshTable(val) {
  try {
    loading.value = true;
    const rsp = await getMembers(val, pagination.pageSize);
    if (rsp.success === true) {
      console.log(rsp);
      tableData.value = rsp.data.content;

      pagination.pageSize = rsp.data.pageSize;
      pagination.currentPage = rsp.data.pageNum;
      pagination.total = rsp.data.total;
    }
    loading.value = false;
  } catch (error) {
    console.error("Error fetching images:", error);
    loading.value = false;
  }
}


onMounted(async () => {
  try {
    const members = await getMembers(
      pagination.currentPage,
      pagination.pageSize
    );
    if (members.success === true) {
      console.log(members);
      tableData.value = members.data.content;
      pagination.pageSize = members.data.pageSize;
      pagination.currentPage = members.data.pageNum;
      pagination.total = members.data.total;
    } else {
      message(`${members.msg}`);
    }
    loading.value = false;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
});
</script>
