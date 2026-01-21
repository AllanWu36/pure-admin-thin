<script setup lang="ts">
import { PureTable } from "@pureadmin/table";
import { ElMessage, ElMessageBox } from "element-plus";
import { ref, onMounted } from "vue";
import { http } from "@/utils/http";
import UserAdd from "./com/UserAdd.vue";
import UserEdit from "./com/UserEdit.vue";

interface RoleItem {
  id: number;
  name: string;
}

interface UserTableItem {
  id: number;
  username: string;
  nickname: string;
  avatar?: string;
  description?: string;
  roles: RoleItem[];
}

interface UserListResponse {
  code: number;
  data: {
    total: number;
    items: UserTableItem[];
  };
  message?: string;
}

const tableData = ref<UserTableItem[]>([]);
const total = ref(0);
const tableLoading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const pageSizes = [10, 20, 50, 100];

const dialogAddFormVisible = ref(false);
const dialogEditFormVisible = ref(false);
const selectRow = ref<UserTableItem | null>(null);

const columns = ref([
  {
    label: "账户",
    prop: "username",
    minWidth: "160"
  },
  {
    label: "昵称",
    prop: "nickname",
    minWidth: "120"
  },
  {
    label: "头像",
    prop: "avatar",
    slot: "avatar",
    width: "120"
  },
  {
    label: "简介",
    prop: "description",
    slot: "description",
    minWidth: "200"
  },
  {
    label: "角色",
    prop: "roles",
    slot: "roles",
    minWidth: "160"
  },
  {
    label: "操作",
    prop: "op",
    slot: "operation",
    width: "200"
  }
]);

const getAvatarText = (row: UserTableItem) => {
  return (row.nickname || row.username || "").slice(0, 1).toUpperCase();
};

const userApi = "/api/user";

async function refreshTable() {
  tableLoading.value = true;
  try {
    const { data } = await http.get<UserListResponse>(userApi, {
      params: { offset: currentPage.value, limit: pageSize.value }
    });
    const items = Array.isArray(data?.items) ? data.items : [];
    tableData.value = items.map(item => ({
      ...item,
      roles: item.roles ?? []
    }));
    total.value = data?.total ?? items.length;
  } catch (error: any) {
    ElMessage.error(error?.message || "获取用户列表失败");
  } finally {
    tableLoading.value = false;
  }
}

function handleClickEdit(row: UserTableItem) {
  selectRow.value = row;
  dialogEditFormVisible.value = true;
}

function handleClickDelete(row: UserTableItem) {
  ElMessageBox.confirm("确定要删除该用户吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      try {
        await http.request("delete", `${userApi}/${row.id}`, {
          data: { id: row.id }
        });
        ElMessage.success("删除成功");
        refreshTable();
      } catch (error: any) {
        ElMessage.error(error?.message || "删除失败");
      }
    })
    .catch(() => void 0);
}

function handleSizeChange(size: number) {
  pageSize.value = size;
  currentPage.value = 1;
  refreshTable();
}

function handleCurrentChange(page: number) {
  currentPage.value = page;
  refreshTable();
}

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "SystemUser"
});

onMounted(() => {
  refreshTable();
});
</script>

<template>
  <div>
    <div
      class="px-2 py-1"
      style="display: flex; align-items: center; justify-content: space-between"
    >
      <span style="font-size: 13px; color: #909399"
        >共 {{ total }} 位用户</span
      >
      <el-button type="primary" plain @click="dialogAddFormVisible = true"
        >添加用户+</el-button
      >
    </div>

    <pure-table
      :data="tableData"
      :columns="columns"
      row-key="id"
      :loading="tableLoading"
      table-layout="auto"
    >
      <template #avatar="{ row }">
        <div style="display: flex; align-items: center; gap: 8px">
          <el-avatar :size="40" :src="row.avatar">
            {{ getAvatarText(row) }}
          </el-avatar>
        </div>
      </template>
      <template #description="{ row }">
        <span>{{ row.description || "未填写" }}</span>
      </template>
      <template #roles="{ row }">
        <template v-if="row.roles?.length">
          <el-tag
            v-for="role in row.roles"
            :key="role.id"
            size="small"
            style="margin-right: 6px"
          >
            {{ role.name }}
          </el-tag>
        </template>
        <span v-else style="color: #b1b3b8">暂无角色</span>
      </template>
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
          >编辑信息</el-button
        >
      </template>
    </pure-table>

    <div class="mt-4 flex justify-end">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

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
  </div>
</template>
