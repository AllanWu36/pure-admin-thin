<template>
  <div>
    <!-- $attrs它允许将父组件中未被子组件接收的属性继续传递给子组件的内部元素 -->
    <!-- $listeners它允许子组件将父组件传递的事件监听器绑定到内部的元素上 -->
    <el-dialog
      v-bind="$attrs"
      @open="onOpen"
      @close="onClose"
      title="用户信息更新"
    >
      <el-form
        ref="editForm"
        :model="editUserData"
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
          <el-input
            v-model="editUserData.username"
            autocomplete="off"
            disabled
          />
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
          <el-input v-model="editUserData.nickname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
          <el-input
            v-model="editUserData.avatar"
            placeholder="请输入头像链接"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="简介"
          :label-width="formLabelWidth"
          prop="description"
        >
          <el-input
            v-model="editUserData.description"
            type="textarea"
            :rows="3"
            placeholder="请输入简介"
          />
        </el-form-item>
        <el-form-item
          label="新密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input
            v-model="editUserData.password"
            type="password"
            autocomplete="new-password"
            show-password
          />
        </el-form-item>
        <el-form-item
          label="确认密码"
          :label-width="formLabelWidth"
          prop="confirmPassword"
        >
          <el-input
            v-model="editUserData.confirmPassword"
            type="password"
            autocomplete="new-password"
            show-password
          />
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="roles">
          <el-select
            v-model="editUserData.roles"
            placeholder="请选择用户角色"
            style="width: 100%"
          >
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <div style="text-align: right">
          <el-button @click="close">取消</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { updateUser, getRoleList } from "@/api/user";

const createDefaultForm = () => ({
  username: "",
  nickname: "",
  avatar: "",
  description: "",
  roles: null,
  password: "",
  confirmPassword: ""
});

export default {
  name: "UserEdit",
  inheritAttrs: false,
  components: {},
  props: ["editRow"],
  data() {
    return {
      formLabelWidth: "120px",
      editUserData: createDefaultForm(),
      initialFormData: createDefaultForm(),
      currentUserId: null,
      formRules: {
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ validator: this.validatePassword, trigger: "blur" }],
        confirmPassword: [
          { validator: this.validateConfirmPassword, trigger: "blur" }
        ],
        roles: [{ required: true, message: "请选择角色", trigger: "change" }]
      },
      roles: []
    };
  },
  computed: {
    baseUrl() {
      const id =
        this.currentUserId ??
        (this.editRow && typeof this.editRow.id !== "undefined"
          ? this.editRow.id
          : "");
      return id ? `/api/user/${id}` : "/api/user/";
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
      this.setFormData();
      this.fetchRoles();
    },
    onClose() {},
    reset() {
      this.editUserData = { ...this.initialFormData };
      this.$nextTick(() => {
        if (this.$refs.editForm) {
          this.$refs.editForm.clearValidate();
        }
      });
    },
    close() {
      console.log("close");
      this.$emit("update:visible", false);
      // 也可以这样写，只要和父组件匹配即可，this.$emit("Uv", false);
    },
    fetchRoles() {
      getRoleList().then(res => {
        this.roles = res.data.items || [];
      });
    },
    setFormData() {
      if (!this.editRow) {
        this.editUserData = createDefaultForm();
        this.initialFormData = createDefaultForm();
        this.currentUserId = null;
        return;
      }
      this.currentUserId = this.editRow.id || null;
      const currentRoleId =
        Array.isArray(this.editRow.roles) && this.editRow.roles.length
          ? this.editRow.roles[0].id
          : null;
      const nextForm = {
        username: this.editRow.username || "",
        nickname: this.editRow.nickname || "",
        avatar: this.editRow.avatar || "",
        description: this.editRow.description || "",
        roles: currentRoleId,
        password: "",
        confirmPassword: ""
      };
      this.editUserData = nextForm;
      this.initialFormData = { ...nextForm };
    },
    validatePassword(rule, value, callback) {
      if (!value) {
        if (this.editUserData.confirmPassword && this.$refs.editForm) {
          this.$refs.editForm.validateField("confirmPassword");
        }
        callback();
        return;
      }
      if (value.length < 6) {
        callback(new Error("密码至少需要 6 位字符"));
      } else {
        if (this.$refs.editForm) {
          this.$refs.editForm.validateField("confirmPassword");
        }
        callback();
      }
    },
    validateConfirmPassword(rule, value, callback) {
      if (!this.editUserData.password && !value) {
        callback();
      } else if (!this.editUserData.password) {
        callback(new Error("请先输入新密码"));
      } else if (!value) {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.editUserData.password) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    },
    prepareSubmitPayload() {
      const payload = {
        nickname: this.editUserData.nickname,
        roles: this.editUserData.roles,
        avatar: this.editUserData.avatar,
        description: this.editUserData.description
      };
      if (!payload.avatar) delete payload.avatar;
      if (!payload.description) delete payload.description;
      if (this.editUserData.password) {
        payload.password = this.editUserData.password;
      }
      return payload;
    },
    handleConfirm() {
      console.log("editUserData", this.editUserData);
      const formRef = this.$refs.editForm;
      if (!formRef) return;
      if (!this.currentUserId && !(this.editRow && this.editRow.id)) {
        this.$message.error("未获取到用户ID，无法提交");
        return;
      }
      formRef.validate(valid => {
        if (!valid) {
          return;
        }
        const payload = this.prepareSubmitPayload();
        updateUser(this.editRow.id, payload)
          .then(res => {
            console.log(res);
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.$emit("refresh");
          })
          .catch(error => {
            console.log(error.message);
            this.$message.error({
              message: error.message
            });
          })
          .finally(() => {
            this.reset();
            this.close();
          });
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
