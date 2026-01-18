<template>
  <div>
    <!-- $attrs它允许将父组件中未被子组件接收的属性继续传递给子组件的内部元素 -->
    <!-- $listeners它允许子组件将父组件传递的事件监听器绑定到内部的元素上 -->
    <el-dialog
      v-bind="$attrs"
      @open="onOpen"
      @close="onClose"
      title="新增一个xx"
    >
      <el-form
        ref="addForm"
        :model="addTableData"
        :rules="formRules"
        size="medium"
        label-width="auto"
        label-position="right"
      >
        <el-col :span="24" v-show="false">
          <el-form-item label="父id" prop="pid">
            <el-input v-model="addTableData.pid" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :span="24" label="上级目录" prop="pid_name">
            <el-input
              v-model="addTableData.pid_name"
              placeholder=""
              :maxlength="100"
              :style="{ width: '100%' }"
              readonly
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :span="24" label="菜单(api)名称" prop="name">
            <el-input
              v-model="addTableData.name"
              placeholder=""
              :maxlength="100"
              :style="{ width: '100%' }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="类型" prop="type">
            <div class="mb-2 flex items-center text-sm">
              <el-radio-group v-model="addTableData.type" class="ml-4">
                <el-radio label="1" size="large">菜单</el-radio>
                <el-radio label="2" size="large">API</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-show="addTableData.type === '1'">
          <el-form-item label="菜单地址" prop="path">
            <el-input
              v-model="addTableData.path"
              placeholder=""
              :maxlength="100"
              :style="{ width: '100%' }"
            />
          </el-form-item>
          <el-form-item label="组件路径" prop="component">
            <el-input
              v-model="addTableData.component"
              placeholder=""
              :maxlength="100"
              :style="{ width: '100%' }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" v-show="addTableData.type === '2'">
          <el-form-item label="api地址" prop="api">
            <el-input
              v-model="addTableData.api"
              placeholder=""
              :maxlength="100"
              :style="{ width: '100%' }"
            />
          </el-form-item>
          <el-form-item label="请求方法" prop="method">
            <el-select
              v-model="addTableData.method"
              class="m-2"
              placeholder="方法"
            >
              <el-option
                v-for="item in methodOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>

      <div slot="footer" style="text-align: right">
        <el-button @click="close">取消</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { http } from "@/utils/http/index.ts";
export default {
  name: "MenuAddSub2",
  inheritAttrs: false,
  components: {},
  props: ["editRow"],
  data() {
    return {
      baseUrl: "/api/menu",
      addTableData: {
        pid: "",
        type: "",
        name: "",
        path: "",
        api: "",
        method: "",
        component: ""
      },
      pid_name: "",
      rules: {
        pid: [{ required: true, message: "请选择上级id", trigger: "change" }],
        pid_name: [
          { required: false, message: "请选择上级目录", trigger: "change" }
        ],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        name: [{ required: true, message: "请输入名称", trigger: "change" }]
      },
      methodOptions: [
        {
          value: "GET",
          label: "GET"
        },
        {
          value: "POST",
          label: "POST"
        },
        {
          value: "PUT",
          label: "PUT"
        },
        {
          value: "DELETE",
          label: "DELETE"
        }
      ]
    };
  },
  computed: {
    formRules() {
      if (this.addTableData.type === "1") {
        return {
          ...this.rules,
          path: [{ required: true, message: "请输入路径", trigger: "change" }],
          component: [
            { required: true, message: "请输入组件路径", trigger: "change" }
          ],
          api: [],
          method: []
        };
      } else if (this.addTableData.type === "2") {
        return {
          ...this.rules,
          path: [],
          component: [],
          api: [{ required: true, message: "请输入api", trigger: "change" }],
          method: [{ required: true, message: "请选择方法", trigger: "change" }]
        };
      } else {
        return this.rules;
      }
    }
  },
  watch: {},
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");
  },
  methods: {
    onOpen() {
      console.log("open");
      this.addTableData.pid = this.editRow.id;
      this.addTableData.pid_name = this.editRow.name;
    },
    onClose() {
      // this.$refs["addForm"].resetFields();
    },
    reset() {
      this.$refs["addForm"].resetFields();
      this.addTableData.pid = this.editRow.id;
      this.addTableData.pid_name = this.editRow.name;
      console.log("reset", this.addTableData);
    },
    close() {
      console.log("close");
      this.$emit("update:visible", false);
      // 也可以这样写，只要和父组件匹配即可，this.$emit("Uv", false);
    },
    handelConfirm() {
      console.log("addTableData", this.addTableData);
      // 也可以这么写：this.$refs['addForm'].validate(valid => {
      this.$refs.addForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!!");
          return;
        } else {
          console.log("post submit!!!");
          http
            .post(this.baseUrl, { data: this.addTableData })
            .then(res => {
              console.log(res);
              this.$message({
                message: "操作成功",
                type: "success"
              });
              this.reset();
              this.$emit("refresh");
            })
            .catch(error => {
              console.log(error.message);
              this.$message.error({
                message: error.message
              });
            });
        }
        this.close();
      });
    }
    // getField114Options() {
    //   // 注意：this.$axios是通过Vue.prototype.$axios = axios挂载产生的
    //   http
    //     .request("get", "/api/menu")
    //     .then(response => {
    //       // 处理响应结果
    //       console.log(response.code);
    //     })
    //     .catch(error => {
    //       // 处理错误
    //       console.log(error.message);
    //       ElMessage.error({
    //         message: error.message
    //       });
    //     });
    // },
    // getField116Options() {
    //   // 注意：this.$axios是通过Vue.prototype.$axios = axios挂载产生的
    // },
    // field134BeforeUpload(file) {
    //   const isRightSize = file.size / 1024 / 1024 < 2;
    //   if (!isRightSize) {
    //     this.$message.error("文件大小超过 2MB");
    //   }
    //   return isRightSize;
    // }
  }
};
</script>
<style>
.el-rate {
  display: inline-block;
  vertical-align: text-top;
}

.el-upload__tip {
  line-height: 1.2;
}
</style>
