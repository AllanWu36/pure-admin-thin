<template>
  <div>
    <!-- <h1 style="text-align: center">按需引入示例</h1> -->
    <div class="px-2 py-1 text-right">
      <el-button type="primary" plain @click="handleClickAddAirdrop"
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
        <el-button
          link
          type="warning"
          size="small"
          @click="handleDeleteClick(row)"
        >
          删除
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
import delForm from "./deleteAirdrop.vue";
import addForm, { type addFormProps } from "./addAirdrop.vue";
import { getAirdrops, addAirdrop, delCreatorById } from "@/api/airdrop";

//增加兑换码
function handleClickAddAirdrop() {
  addDialog({
    width: "70%",
    title: "添加兑换码",
    contentRenderer: () => addForm,
    props: {
      // 赋默认值
      data: {}
    },
    closeCallBack: async ({ options, args }) => {
      if (args?.command === "cancel") {
        // 您点击了取消按钮
        message(`您点击了取消按钮`);
      } else if (args?.command == "sure") {
        // 您点击了确认按钮
        const { data } = options.props as addFormProps;
        console.log(data);
        const rsp = await addAirdrop(data);
        if (rsp.success === true) {
          message("添加成功");
        } else {
          message("添加失败，请联系管理员");
        }
      }
    }
  });
}

//删除兑换码
function handleDeleteClick(row) {
  addDialog({
    width: "70%",
    title: "修改图片",
    contentRenderer: () => delForm,

    closeCallBack: ({ options, args }) => {
      if (args?.command === "cancel") {
        // 您点击了取消按钮
        message(`您点击了取消按钮`);
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
    label: "id",
    prop: "id"
  },
  {
    label: "兑换码",
    prop: "code"
  },
  {
    label: "兑换藏品名称",
    prop: "collectionName"
  },
  {
    label: "状态 ",
    prop: "stateName"
  },
  // {
  //   label: "创建时间 ",
  //   prop: "create_time"
  // },
  // {
  //   label: "兑换时间 ",
  //   prop: "exchange_time"
  // },
  // {
  //   label: "兑换人 ",
  //   prop: "member_name"
  // },
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
    const airdrops = await getAirdrops();
    if (airdrops.success === true) {
      console.log(airdrops);
      tableData.value = airdrops.data.content;
      pagination.pageSize = airdrops.data.pageSize;
      pagination.currentPage = airdrops.data.pageNum;
      pagination.total = tableData.value.length;
    } else {
      message(`${airdrops.msg}`);
    }
    loading.value = false;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
});
</script>
