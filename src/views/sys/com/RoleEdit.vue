<template>
  <div>
    <!-- $attrs它允许将父组件中未被子组件接收的属性继续传递给子组件的内部元素 -->
    <!-- $listeners它允许子组件将父组件传递的事件监听器绑定到内部的元素上 -->
    <el-dialog
      v-bind="$attrs"
      @open="onOpen"
      @close="onClose"
      title="编辑一个角色"
    >
      <el-form
        ref="addForm"
        :model="editTableData"
        :rules="formRules"
        size="medium"
        label-width="auto"
        label-position="right"
      >
        <el-col :span="24">
          <el-form-item label="名称" prop="name">
            <el-input v-model="editTableData.name" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="说明" prop="remark">
            <el-input v-model="editTableData.remark" />
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
import { updateRole } from "@/api/role";
export default {
  name: "RoleAdd",
  inheritAttrs: false,
  components: {},
  props: ["editRow"],
  data() {
    return {
      editTableData: {
        pid: 0,
        name: "",
        remark: ""
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "change" }],
        remark: [{ required: true, message: "请输入说明", trigger: "change" }]
      }
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
      this.editTableData = { ...this.editRow };
    },
    onClose() {},
    reset() {
      this.$refs["addForm"].resetFields();
    },
    close() {
      console.log("close");
      this.$emit("update:visible", false);
      // 也可以这样写，只要和父组件匹配即可，this.$emit("Uv", false);
    },
    handelConfirm() {
      console.log("editTableData", this.editTableData);
      // 也可以这么写：this.$refs['addForm'].validate(valid => {
      this.$refs.addForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!!");
          return;
        } else {
          console.log("post submit!!!");
          updateRole(this.editRow.id, this.editTableData)
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
