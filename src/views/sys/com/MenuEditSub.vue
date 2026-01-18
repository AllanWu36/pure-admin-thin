<template>
  <div>
    <!-- v-bind="$attrs" 它允许将父组件中未被子组件接收的属性继续传递给子组件的内部元素 -->
    <!-- v-on="$listeners" 它允许子组件将父组件传递的事件监听器绑定到内部的元素上 -->
    <el-dialog
      v-bind="$attrs"
      @open="onOpen"
      @close="onClose"
      title="编辑一个xx"
    >
      <el-form
        ref="editForm"
        :model="editTableData"
        :rules="formRules"
        size="medium"
        label-width="auto"
        label-position="right"
      >
        <el-col :span="24" v-show="false">
          <el-form-item label="父id" prop="pid">
            <el-input v-model="editTableData.pid" editable="false" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :span="24" label="菜单(api)名称" prop="name">
            <el-input
              v-model="editTableData.name"
              placeholder=""
              :maxlength="100"
              :style="{ width: '100%' }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="类型" prop="type">
            <div class="mb-2 flex items-center text-sm">
              <el-radio-group v-model="editTableData.type" class="ml-4">
                <el-radio label="1" size="large">菜单</el-radio>
                <el-radio label="2" size="large">API</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-show="editTableData.type == '1'">
          <el-form-item label="菜单地址" prop="path">
            <el-input
              v-model="editTableData.path"
              placeholder=""
              :maxlength="100"
              :style="{ width: '100%' }"
            />
          </el-form-item>
          <el-form-item label="组件路径" prop="component">
            <el-input
              v-model="editTableData.component"
              placeholder=""
              :maxlength="100"
              :style="{ width: '100%' }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" v-show="editTableData.type == '2'">
          <el-form-item label="api地址" prop="api">
            <el-input
              v-model="editTableData.api"
              placeholder=""
              :maxlength="100"
              :style="{ width: '100%' }"
            />
          </el-form-item>
          <el-form-item label="请求方法" prop="method">
            <el-select
              v-model="editTableData.method"
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
  name: "MenuEditSub",
  inheritAttrs: false,
  components: {},
  props: ["editRow"],
  data() {
    return {
      editTableData: {},
      rules: {
        pid: [{ required: true, message: "请选择上级目录", trigger: "change" }],
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
    baseUrl() {
      return "/api/menu/" + this.editRow.id;
    },
    formRules() {
      if (this.editTableData.type == "1") {
        return {
          ...this.rules,
          path: [{ required: true, message: "请输入路径", trigger: "change" }],
          component: [
            { required: true, message: "请输入组件路径", trigger: "change" }
          ],
          api: [],
          method: []
        };
      } else if (this.editTableData.type == "2") {
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
  watch: {
    // "editTableData.type": function (newValue, oldValue) {
    //   console.log("editTableData.type", newValue, oldValue);
    //   if (newValue !== null) {
    //     this.editTableData.type = parseInt(newValue);
    //     // 或使用 parseFloat(newValue) 转换为浮点数类型
    //   }
    // }
  },
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");
  },
  methods: {
    onOpen() {
      this.editTableData = { ...this.editRow };
      this.editTableData.type = this.editTableData.type.toString();
      console.log("open", this.editTableData);
    },
    onClose() {
      // this.$refs["editForm"].resetFields();
    },
    reset() {
      this.$refs["editForm"].resetFields();

      // 这样写是一个引用，editTableData的修改会影响到editRow(还会影响父组件的tableData)
      // this.editTableData = this.editRow;
      // 下面的写法是一个拷贝，修改不会影响到editRow
      this.editTableData = { ...this.editRow };
    },
    close() {
      console.log("close", this.editTableData);
      this.$emit("update:editvisible", false);
      // 也可以这样写，只要和父组件匹配即可，this.$emit("Uv", false);
    },
    handelConfirm() {
      console.log("editTableData", this.editTableData);
      // 也可以这么写：this.$refs['editForm'].validate(valid => {
      this.$refs.editForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!!");
          return;
        } else {
          console.log("post submit!!!", this.editTableData);
          http
            .post(this.baseUrl, { data: this.editTableData })
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
