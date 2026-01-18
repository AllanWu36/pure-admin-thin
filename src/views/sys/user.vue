<script setup lang="ts">
import { PureTable } from "@pureadmin/table";
import { ElMessage, ElMessageBox } from "element-plus";
import { ref, reactive, onMounted, computed } from "vue";
import { http } from "@/utils/http";
import { object } from "vue-types";
import UserAdd from "./com/UserAdd.vue";
import UserEdit from "./com/UserEdit.vue";

const tableData = ref([]);
const roleOptions = ref([
  {
    label: "选项一",
    value: 1
  },
  {
    label: "选项二",
    value: 2
  }
]);

const dialogAddFormVisible = ref(false);
const dialogEditFormVisible = ref(false);
const dialogChangePWFormVisible = ref(false);
const selectRow = ref(object);

const formLabelWidth = "140px";

const columns = ref([
  {
    label: "id",
    prop: "id"
  },
  {
    label: "账户",
    prop: "username"
  },
  {
    label: "昵称",
    prop: "nickname"
  },
  {
    label: "注册时间",
    prop: "created"
  },
  {
    label: "类型",
    prop: "vip"
  },
  {
    label: "操作",
    prop: "op",
    slot: "operation"
  }
]);
function handleClickDelete(row) {
  const delData = {
    id: row.id
  };
  ElMessageBox.confirm("Are you sure to close this dialog?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning"
  })
    .then(() => {
      return http
        .request("delete", "/api/user/" + row.id, { data: delData })
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

function handleClickEdit(row) {
  selectRow.value = row;
  dialogEditFormVisible.value = true;
}

function handleClickChangePW(row) {
  selectRow.value = row;
  dialogChangePWFormVisible.value = true;
}

function refreshTable() {
  http.get("/api/user").then(res => {
    console.log(res);
    tableData.value = res.data.items;
  });
}

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "SystemUser"
});

onMounted(() => {
  console.log("mounted");
  http.get("/api/user").then(res => {
    console.log(res);
    tableData.value = res.data.items;
  });
});
</script>

<template>
  <div>
    <div class="px-2 py-1 text-right">
      <el-button type="primary" plain @click="dialogAddFormVisible = true"
        >添加用户+</el-button
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
          @click="handleClickChangePW(row)"
          >修改密码</el-button
        >
        <el-button
          link
          type="primary"
          size="small"
          @click="handleClickEdit(row)"
          >编辑信息</el-button
        >
      </template>
    </pure-table>

    <user-add
      v-model="dialogAddFormVisible"
      @update:visible="dialogAddFormVisible = false"
      @refresh="refreshTable"
    />
    <user-edit
      v-model="dialogEditFormVisible"
      :editRow="selectRow"
      @update:visible="dialogEditFormVisible = false"
      @refresh="refreshTable"
    />
    <user-edit
      v-model="dialogEditFormVisible"
      :editRow="selectRow"
      @update:visible="dialogEditFormVisible = false"
      @refresh="refreshTable"
    />
  </div>
</template>
