<script setup lang="ts">
import { addDialog } from '@/components/ReDialog';
import addForm, { type addFormProps } from "./addCreatorForm.vue";
import editForm, { type editFormProps } from "./editCreatorForm.vue";
import delForm, { type delFormProps } from "./delCreatorForm.vue";
import { ref, reactive, onMounted } from "vue";
import { addCreator, getCreator, updateCreatorById, delCreatorById} from "@/api/creator";
import type { TableColumns } from "@pureadmin/table";
import { message } from "@/utils/message";

const columns: Array<TableColumns> = [
  {
    label: "名称",
    prop: "name"
  },
  {
    label: "区块链id",
    prop: "block_chain_credit_code"
  },
  {
    label: "数字藏品账号",
    prop: "nft_account"
  },
  {
    label: "操作",
    width: "180",
    fixed: "right",
    slot: "operation"
  }
];

//修改按钮
function handleClickEdit(row: any) {
  addDialog({
    width: "70%",
    title: "编辑创作者",
    contentRenderer: () => editForm,
    props: {
      // 赋默认值
      creator: {
        name: row.name,
        img: row.img
      }
    },
    closeCallBack: async ({ options, args }) => {
      // options.props 是响应式的
      const { creator } = options.props as editFormProps;
      if (args?.command === "cancel") {
        // 您点击了取消按钮
        message(`您点击了取消按钮，当前表单数据为 ${creator},id为${row}`);
      } else if (args?.command === "sure") {
        message(`您点击了确定按钮，当前表单数据为 ${creator}`);
        const ret = await updateCreatorById(row.id, creator);
        if (ret) {
          message(`您点击了确定按钮，当前表单数据为 ${creator}`);
        }
      } else {
        // message(`您点击了右上角关闭按钮或者空白页，当前表单数据为 ${text}`);
      }
    }
  });
}

// 添加按钮
function handleClickAddCreator() {
  addDialog({
    width: "70%",
    title: "添加创作者",
    contentRenderer: () => addForm,
    props: {
      creator: {
        name: "string",
        img: "string"
      }
    },
    closeCallBack: async ({ options, args }) => {
      // options.props 是响应式的
      const { creator } = options.props as addFormProps;

      if (args?.command === "cancel") {
        // 您点击了取消按钮
        message(`您点击了取消按钮，当前表单数据为 ${creator}`);
        console.log(creator);
      } else if (args?.command === "sure") {
        const ret = await addCreator(creator);
        if (ret) {
          message(`您点击了确定按钮，当前表单数据为 ${creator}`);
        }
      } else {
        // message(`您点击了右上角关闭按钮或者空白页，当前表单数据为 ${text}`);
      }
    }
  });
}

// 删除按钮
function handleClickDelCreator(row: any) {
  addDialog({
    width: "20%",
    title: "删除",
    contentRenderer: () => delForm,
    closeCallBack: async ({ options, args }) => {
      if (args?.command === "cancel") {
        // 您点击了取消按钮
        message(`取消`);
        console.log(row);
      } else if (args?.command === "sure") {
        const ret = delCreatorById(row);
        if (ret) {
          message(`删除 id为${row}`);
          try {
            loading.value = true;
            const creators = await getCreator();
            if (creators) {
              console.log(creators);
              tableData.value = creators.data.items;
            }
            loading.value = false;
          } catch (error) {
            console.error("Error fetching images:", error);
          }
        }
      } else {
        // message(`您点击了右上角关闭按钮或者空白页，当前表单数据为 ${text}`);
      }
    }
  });
}

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
    const creators = await getCreator();
    if (creators) {
      console.log(creators);
      tableData.value = creators.data.items;
    }
    loading.value = false;
    pagination.total = tableData.value.length;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
});
</script>

<template>
  <div>
    <!-- <h1 style="text-align: center">按需引入示例</h1> -->
    <div class="px-2 py-1 text-right">
      <el-button type="primary" plain @click="handleClickAddCreator"
        >添加创建者+</el-button
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
          type="primary"
          size="small"
          @click="handleClickEdit(row)"
        >
          修改
        </el-button>
        <el-button link type="warning" size="small" @click="handleClickDelCreator(row)">删除</el-button>
      </template>
    </pure-table>
    <dialog />
  </div>
</template>

<style lang="scss" scoped></style>
