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
import { getOrders } from "@/api/order";
import delForm from "./delOrderForm.vue";
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
    label: "订单号",
    prop: "order_no"
  },
  {
    label: "购买人",
    prop: "member_name"
  },
  {
    label: "价格 ",
    prop: "amount"
  },
  {
    label: "状态 ",
    prop: "state"
  },
  {
    label: "购买商品 ",
    prop: "issued_collection_name"
  },
  {
    label: "藏品编号 ",
    prop: "issued_collection_id"
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
    const orders = await getOrders();
    if (orders) {
      console.log(orders);
      tableData.value = orders.data.content;
    }
    loading.value = false;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
});
</script>
