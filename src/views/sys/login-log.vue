<script setup lang="ts">
import { PureTable } from "@pureadmin/table";
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { getLoginLogs, type LoginLogItem } from "@/api/log";

const tableData = ref<LoginLogItem[]>([]);
const total = ref(0);
const tableLoading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const pageSizes = [10, 20, 50, 100];

const filters = reactive({
  username: "",
  success: ""
});

const columns = ref([
  {
    label: "用户",
    prop: "username",
    minWidth: "140"
  },
  {
    label: "结果",
    prop: "success",
    slot: "success",
    width: "100"
  },
  {
    label: "信息",
    prop: "message",
    minWidth: "200"
  },
  {
    label: "IP",
    prop: "ip",
    minWidth: "140"
  },
  {
    label: "时间",
    prop: "created",
    minWidth: "180"
  }
]);

const successOptions = [
  { label: "全部", value: "" },
  { label: "成功", value: "true" },
  { label: "失败", value: "false" }
];

async function refreshTable() {
  tableLoading.value = true;
  try {
    const params: Record<string, any> = {
      offset: currentPage.value,
      limit: pageSize.value
    };
    if (filters.username) params.username = filters.username;
    if (filters.success !== "") params.success = filters.success === "true";
    const { data } = await getLoginLogs(params);
    tableData.value = Array.isArray(data?.items) ? data.items : [];
    total.value = data?.total ?? tableData.value.length;
  } catch (error: any) {
    ElMessage.error(error?.message || "获取登录日志失败");
  } finally {
    tableLoading.value = false;
  }
}

function handleSearch() {
  currentPage.value = 1;
  refreshTable();
}

function handleReset() {
  filters.username = "";
  filters.success = "";
  currentPage.value = 1;
  refreshTable();
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
  name: "SystemLoginLog"
});

onMounted(() => {
  refreshTable();
});
</script>

<template>
  <div>
    <div class="mb-3 flex flex-wrap items-center gap-2">
      <el-input
        v-model="filters.username"
        placeholder="用户名"
        style="width: 180px"
        clearable
      />
      <el-select
        v-model="filters.success"
        placeholder="结果"
        style="width: 120px"
        clearable
      >
        <el-option
          v-for="item in successOptions"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button @click="handleReset">重置</el-button>
    </div>

    <pure-table
      :data="tableData"
      :columns="columns"
      row-key="id"
      :loading="tableLoading"
      table-layout="auto"
    >
      <template #success="{ row }">
        <el-tag :type="row.success ? 'success' : 'danger'" size="small">
          {{ row.success ? "成功" : "失败" }}
        </el-tag>
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
  </div>
</template>
