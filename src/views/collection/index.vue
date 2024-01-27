<template>
  <div>
    <!-- <h1 style="text-align: center">按需引入示例</h1> -->
    <div class="px-2 py-1 text-right">
      <el-button type="primary" plain @click="handleClickAddCollection"
        >添加藏品+</el-button
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
        <el-button link type="warning" size="small" @click="handleDelClick(row)"
          >注销藏品
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
import addForm, { type addFormProps } from "./addForm.vue";
import delForm from "./delForm.vue";
import storyForm, { type storyFormProps } from "./imgform.vue";
import {
  getCollections,
  cancelPublishCollection,
  updateCollectionStory
} from "@/api/collection";
function handleClick(row) {
  console.log(
    "%crow===>>>: ",
    "color: MidnightBlue; background: Aquamarine; font-size: 20px;",
    row
  );
}
//新增藏品
function handleClickAddCollection() {
  addDialog({
    width: "70%",
    title: "新增藏品",
    contentRenderer: () => addForm,
    props: {
      // 赋默认值
      data: {
        num: 0,
        urlList: []
      }
    },
    closeCallBack: ({ options, args }) => {
      if (options === "confirm") {
        message("success", "新增成功");
      }
    }
  });
}
// 修改story图片
function handleClickUpdateStory(row) {
  addDialog({
    width: "70%",
    title: "修改图片",
    contentRenderer: () => storyForm,
    props: {
      // 赋默认值
      data: {
        id: row.id,
        num: 0,
        urlList: []
      }
    },
    closeCallBack: async ({ options, args }) => {
      // options.props 是响应式的
      const { data } = options.props as storyFormProps;
      // const text = `姓名：${formInline.user} 城市：${formInline.region}`;
      console.log(data.urlList);
      if (args?.command === "cancel") {
        // 您点击了取消按钮
        message(`您点击了取消按钮，当前表单数据为 ${data.urlList},id为${row}`);
      } else if (args?.command === "sure") {
        const rep = await updateCollectionStory(row.id, data.urlList);
        if (rep.status === 200) {
          message(`您点击了确定按钮，当前表单数据为 ${data.urlList}`);
        }
      } else {
        // message(`您点击了右上角关闭按钮或者空白页，当前表单数据为 ${text}`);
      }
    }
  });
}

// 注销藏品
function handleDelClick(row) {
  addDialog({
    width: "50%",
    title: "注销藏品",
    contentRenderer: () => delForm,
    closeCallBack: async ({ options, args }) => {
      if (args?.command === "cancel") {
        // 您点击了取消按钮
      } else if (args?.command === "sure") {
        const rep = await cancelPublishCollection(row.id);
        if (rep.success === true) {
          message(`藏品已经注销，用户无法再查找和购买`);
          refreshTable();
        }
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
    label: "创作者",
    prop: "creatorName"
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

async function refreshTable() {
  try {
    loading.value = true;
    const collections = await getCollections();
    if (collections) {
      console.log(collections);
      tableData.value = collections.data.content;
      tableData.value.forEach(item => {
        if (item.pickFlag === false) {
          item.pickFlag = "否";
        } else if (item.pickFlag === true) {
          item.pickFlag = "是";
        }
      });
      pagination.pageSize = collections.data.pageSize;
      pagination.currentPage = collections.data.pageNum;
      pagination.total = tableData.value.length;
    }
    loading.value = false;
  } catch (error) {
    console.error("Error fetching images:", error);
    loading.value = false;
  }
}


onMounted(async () => {
  try {
    const collections = await getCollections();
    if (collections) {
      console.log(collections);
      tableData.value = collections.data.content;
      tableData.value.forEach(item => {
        if (item.pickFlag === false) {
          item.pickFlag = "否";
        } else if (item.pickFlag === true) {
          item.pickFlag = "是";
        }
      });
      pagination.pageSize = collections.data.pageSize;
      pagination.currentPage = collections.data.pageNum;
      pagination.total = tableData.value.length;
    }
    loading.value = false;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
});
</script>
