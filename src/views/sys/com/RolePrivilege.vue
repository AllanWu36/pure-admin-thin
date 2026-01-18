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
        :model="selectData"
        :rules="formRules"
        size="medium"
        label-width="auto"
        label-position="right"
      >
        <!-- <el-col :span="24">
          <el-form-item label="名称" prop="name">
            <el-input v-model="selectData.name" />
          </el-form-item>
        </el-col> -->
        <el-col :span="24">
          <el-form-item label="选择权限" prop="menus">
            <el-tree-select
              size="large"
              v-model="selectData.menus"
              :data="privilege"
              :props="treeProps"
              multiple
              default-expand-all
              node-key="id"
              show-checkbox
              check-strictly="true"
              placeholder="请选择菜单"
            />
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
  name: "RoleAdd",
  inheritAttrs: false,
  components: {},
  props: ["editRow"],
  data() {
    return {
      baseUrl: "/api/role/{rid}/menu",
      selectData: {
        rid: 0,
        menus: []
      },
      privilege: [],
      // treeProps用于指定树形结构的属性名称
      treeProps: {
        children: "children",
        label: "label"
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
      const formatUrl = this.baseUrl.replace("{rid}", this.editRow.id);
      http.get(formatUrl).then(res => {
        console.log(res);
        this.selectData.menus = this.extractIds(res.data);
        console.log(this.selectData.menus);
      });

      const dataUrl = "/api/menu";
      http.get(dataUrl).then(res => {
        console.log(res);
        // this.selectData.value = res.data;
        this.privilege = this.processMenuData(res.data);
        console.log(this.privilege);
      });
      console.log(this.selectData.menus);
    },
    onClose() {},
    reset() {
      // this.$refs["addForm"].resetFields();
    },
    close() {
      console.log("close");
      this.$emit("update:visible", false);
      // 也可以这样写，只要和父组件匹配即可，this.$emit("Uv", false);
    },

    processMenuData(menuData) {
      return menuData.map(menu => {
        const { children, api, name, id, path, ...rest } = menu;

        if (children && children.length > 0) {
          const updatedChildren = this.processMenuData(children);
          return {
            ...rest,
            id: id,
            children: updatedChildren,
            name: name,
            label: `${api !== null ? api : path} - ${name}`,
            value: id
          };
        } else {
          return {
            ...rest,
            id: id,
            name: name,
            label: `${api !== null ? api : path} - ${name}`,
            value: id
          };
        }
      });
    },
    extractIds(data) {
      let ids = [];
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        ids.push(item.id); // 将当前项的 id 添加到列表中
        if (item.children && item.children.length > 0) {
          ids = ids.concat(this.extractIds(item.children)); // 递归遍历子菜单项的 children 属性
        }
      }
      return ids;
    },

    handelConfirm() {
      this.selectData.rid = this.editRow.id;
      console.log("selectData", this.selectData);
      // 也可以这么写：this.$refs['addForm'].validate(valid => {
      this.$refs.addForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!!");
          return;
        } else {
          console.log("post submit!!!");
          http
            .post(this.baseUrl.replace("{rid}", this.editRow.id), {
              data: this.selectData
            })
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
