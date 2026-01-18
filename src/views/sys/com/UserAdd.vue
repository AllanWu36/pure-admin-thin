<template>
  <div>
    <!-- $attrs它允许将父组件中未被子组件接收的属性继续传递给子组件的内部元素 -->
    <!-- $listeners它允许子组件将父组件传递的事件监听器绑定到内部的元素上 -->
    <el-dialog
      v-bind="$attrs"
      @open="onOpen"
      @close="onClose"
      title="新增一个用户"
    >
      <el-form
        ref="addForm"
        :model="addTableData"
        :rules="formRules"
        size="medium"
        label-width="auto"
        label-position="right"
      >
        <el-form-item
          label="登录账号"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="addTableData.username" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input v-model="addTableData.password" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="确认密码"
          :label-width="formLabelWidth"
          prop="confirmPassword"
        >
          <el-input v-model="addTableData.confirmPassword" autocomplete="off" />
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input
            v-model="addTableData.nickname"
            autocomplete="off"
            prop="nickname"
          />
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="roles">
          <el-select v-model="addTableData.roles" placeholder="用户角色">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
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
  name: "UserAdd",
  inheritAttrs: false,
  components: {},
  data() {
    return {
      baseUrl: "/api/user",
      addTableData: {
        username: "",
        password: "",
        confirmPassword: "",
        nickname: "",
        roles: 1,
        avatar: "",
        description: ""
      },
      formRules: {
        username: [
          { required: true, message: "请输入名称", trigger: "change" },
          { validator: this.validateUsername, trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" }
        ],
        confirmPassword: [
          { required: true, message: "请再次输入密码", trigger: "change" },
          { validator: this.validateConfirmPassword, trigger: "change" }
        ],
        nickname: [{ required: true, message: "请输入昵称", trigger: "change" }]
      },
      roles: [
        {
          value: "admin",
          label: "管理员"
        },
        {
          value: "editor",
          label: "编辑"
        },
        {
          value: "guest",
          label: "游客"
        }
      ]
    };
  },
  computed: {},
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
      http.get("/api/role").then(res => {
        console.log(res);
        this.roles = res.data.items;
      });
    },
    onClose() {},
    reset() {
      this.$refs["addForm"].resetFields();
      this.addTableData.pid = 0;
      console.log("reset", this.addTableData);
    },
    close() {
      console.log("close");
      this.$emit("update:visible", false);
      // 也可以这样写，只要和父组件匹配即可，this.$emit("Uv", false);
    },
    validateUsername(rule, value, callback) {
      const emailRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

      if (!value || value === "") {
        callback();
      } else if (!emailRegex.test(value)) {
        callback(new Error("请输入有效的邮箱地址"));
      } else {
        callback();
      }
    },
    validateConfirmPassword(rule, value, callback) {
      if (!value || value === "") {
        callback();
      } else if (value !== this.addTableData.password) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    },
    handelConfirm() {
      console.log("addTableData", this.addTableData);
      // 也可以这么写：this.$refs['addForm'].validate(valid => {
      this.$refs.addForm.validate(valid => {
        if (!valid) {
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
