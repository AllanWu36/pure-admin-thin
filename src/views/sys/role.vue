<script setup lang="ts">
import { PureTable } from "@pureadmin/table";
import { ElMessage, ElMessageBox } from "element-plus";
import { ref, reactive, onMounted, computed } from "vue";
import { http } from "@/utils/http";
import { func, object } from "vue-types";
import RoleAdd from "./com/RoleAdd.vue";
import RoleEdit from "./com/RoleEdit.vue";
import RolePrivilege from "./com/RolePrivilege.vue";

const tableData = ref([]);
const baseUrl = ref("/api/role");
const deleteBaseUrl = ref("/api/role/{rid}");
const selectRow = ref(object);
const dialogAddFormVisible = ref(false);
const dialogEditFormVisible = ref(false);
const dialogPrivilegeFormVisible = ref(false);

const columns = ref([
  {
    label: "id",
    prop: "id"
  },
  {
    label: "角色",
    prop: "name"
  },
  {
    label: "说明",
    prop: "remark"
  },
  {
    label: "创建时间",
    prop: "created"
  },
  {
    label: "操作",
    prop: "op",
    slot: "operation"
  }
]);
function handleClickAddRole() {
  console.log("handleClickAddRole");
  dialogAddFormVisible.value = true;
}

function handleClickEditRole(row) {
  selectRow.value = row;
  dialogEditFormVisible.value = true;
}
function handleClickPrivilegeRole(row) {
  selectRow.value = row;
  dialogPrivilegeFormVisible.value = true;
}

function refreshTable() {
  http.get(baseUrl.value).then(res => {
    console.log(res);
    tableData.value = res.data.items;
  });
}

function handleClickDelete(row) {
  const delData = {
    id: row.id
  };
  ElMessageBox.confirm("你确定要删除这个角色么?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning"
  })
    .then(() => {
      return http
        .request("delete", "/api/role/{}".replace("{}", row.id))
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
      // catch error
    });
}

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "SystemRole"
});

onMounted(() => {
  console.log("mounted");
  http.get(baseUrl.value).then(res => {
    console.log(res);
    tableData.value = res.data.items;
  });
});
</script>

<template>
  <div>
    <div class="px-2 py-1 text-right">
      <el-button type="primary" plain @click="handleClickAddRole"
        >添加角色+</el-button
      >
    </div>

    <pure-table :data="tableData" :columns="columns">
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
          @click="handleClickEditRole(row)"
          >编辑</el-button
        >
        <el-button
          link
          type="primary"
          size="small"
          @click="handleClickPrivilegeRole(row)"
          >权限</el-button
        >
      </template>
    </pure-table>
    <role-add
      v-model="dialogAddFormVisible"
      @update:visible="dialogAddFormVisible = false"
      @refresh="refreshTable"
    />
    <role-edit
      v-model="dialogEditFormVisible"
      :editRow="selectRow"
      @update:visible="dialogEditFormVisible = false"
      @refresh="refreshTable"
    />
    <role-privilege
      v-model="dialogPrivilegeFormVisible"
      :editRow="selectRow"
      @update:visible="dialogPrivilegeFormVisible = false"
      @refresh="refreshTable"
    />
  </div>
</template>
