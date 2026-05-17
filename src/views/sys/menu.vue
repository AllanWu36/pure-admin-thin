<script setup lang="ts">
import { PureTable } from "@pureadmin/table";
import { ElMessage, ElMessageBox } from "element-plus";
import { ref, reactive, onMounted, computed } from "vue";
import { deleteMenu, getMenuList } from "@/api/menu";
import { func, object } from "vue-types";
import MenuEditSub from "./com/MenuEditSub.vue";
import MenuAddSub2 from "./com/MenuAddSub2.vue";
import MenuAddRoot from "./com/MenuAddRoot.vue";

const tableData = ref([]);

const baseUrl = ref("/api/menu");

const prepareData = data => {
  return data.map(item => {
    if (item.type == 1) {
      item.typename = "菜单";
    } else {
      item.typename = "API";
    }
    if (item.children && item.children.length) {
      item.children = prepareData(item.children); // 递归处理子节点
    }
    return item;
  });
};

const fixtableData = computed(() => {
  return prepareData(tableData.value);
});
const dialogAddsubVisible = ref(false);
const dialogAddrootVisible = ref(false);
const dialogEditVisible = ref(false);
const selectRow = ref(object);

const columns = ref([
  // {
  //   label: "id",
  //   prop: "id"
  // },
  {
    label: "菜单 or API名称",
    "min-width": "180px",
    prop: "name"
  },
  {
    label: "类型",
    prop: "typename"
  },
  {
    label: "页面路径",
    prop: "path",
    "min-width": "180px"
  },
  {
    label: "API路径",
    prop: "api",
    "min-width": "180px"
  },
  {
    label: "API方法",
    prop: "method"
  },
  {
    label: "操作",
    prop: "op",
    slot: "operation",
    "min-width": "180px"
  }
]);
function handleClickEdit(row) {
  console.log(row);
  dialogEditVisible.value = true;
  selectRow.value = row;
}

function handleClickAddChild(row) {
  console.log(row);
  dialogAddsubVisible.value = true;
  selectRow.value = row;
}
function handleDialogAddRootVisible(value) {
  dialogAddrootVisible.value = value;
}

function handleDialogAddSubVisible(value) {
  dialogAddsubVisible.value = value;
}
function handleEditVisible(value) {
  dialogEditVisible.value = value;
}
function handleClickAddRoot() {
  dialogAddrootVisible.value = true;
}
function refreshTable() {
  getMenuList().then(res => {
    console.log(res);
    tableData.value = res.data;
  });
}

function handleClickDelete(row) {
  const delData = {
    id: row.id
  };
  ElMessageBox.confirm("确定要删除这一个记录么?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning"
  })
    .then(() => {
      return deleteMenu(row.id)
        .then(response => {
          // 处理响应结果
          console.log(response.code);
          refreshTable();
        })
        .catch(error => {
          // 处理错误
          console.log(error.message);
          ElMessage.error({
            message: error.message
          });
        });
    })
    .catch(() => {
      console.log("cancel delete");
      // catch error
    });
}

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "SystemMenu"
});

onMounted(() => {
  console.log("mounted");
  getMenuList().then(res => {
    console.log(res);
    tableData.value = res.data;
  });
});
</script>

<template>
  <div>
    <div class="px-2 py-1 text-right">
      <el-button type="primary" plain @click="handleClickAddRoot"
        >添加菜单orAPI+</el-button
      >
    </div>

    <pure-table
      :data="fixtableData"
      :columns="columns"
      :table-layout="auto"
      row-key="id"
    >
      <template #operation="{ row }">
        <el-button
          link
          type="danger"
          size="small"
          @click="handleClickDelete(row)"
        >
          删除
        </el-button>
        <el-button
          link
          type="primary"
          size="small"
          @click="handleClickEdit(row)"
        >
          编辑
        </el-button>
        <el-button
          v-if="row.typename === '菜单'"
          link
          type="info"
          size="small"
          @click="handleClickAddChild(row)"
        >
          新增子项
        </el-button>
      </template>
    </pure-table>

    <menu-add-root
      v-model="dialogAddrootVisible"
      @update:visible="handleDialogAddRootVisible"
      @refresh="refreshTable"
    />
    <menu-add-sub2
      v-model="dialogAddsubVisible"
      :editRow="selectRow"
      @update:visible="handleDialogAddSubVisible"
      @refresh="refreshTable"
    />
    <menu-edit-sub
      v-model="dialogEditVisible"
      :editRow="selectRow"
      @update:editvisible="handleEditVisible"
      @refresh="refreshTable"
    />

    <!-- 对子组件的事件监听还可以这么写：@Uv="handleVisible"  Uv匹配子组件的emit变量-->
  </div>
</template>
