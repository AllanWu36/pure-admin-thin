<script setup lang="ts">
// import { useVModel } from "@vueuse/core";
import { ref } from "vue";
import Sortable, { Swap } from "sortablejs";
import draggable from "vuedraggable/src/vuedraggable";
import { ElDialog } from "element-plus";

// 声明 props 类型
export interface FormProps {
  // url 列表
  urlList: string[];
}

// 声明 props 默认值
// 推荐阅读：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<FormProps>(), {
  urlList: () => []
});
const lists = ref<Array<Object>>([
  { people: "cn", id: 1, name: "www.itxst.com" },
  { people: "cn", id: 2, name: "www.baidu.com" },
  { people: "cn", id: 3, name: "www.taobao.com" },
  { people: "cn", id: 4, name: "www.google.com" }
]);

// const newUrlInline = ref(props.urlList);
const newUrlInline = ref(lists);

const isPreviewVisible = ref(false); // 控制预览对话框的显示

const onFileChange = async event => {
  const files = event.target.files;
  for (const file of files) {
    console.log(file);
    // 这里应该包含上传逻辑，并获取 URL
    // const imageUrl = await uploadImage(file); // 假定的上传函数
    // newUrlInline.value.push(imageUrl);
  }
};

const change = (evt): void => {
  console.log("evt: ", evt);
};

const previewImages = () => {
  // 打开预览对话框
  console.log(isPreviewVisible.value);
  isPreviewVisible.value = true;
};

// // 使用 vueuse 的双向绑定工具
// const emit = defineEmits(["update:data"]);
// const data = useVModel(props, "urlList", emit);
</script>

<template>
  <!-- 图片上传部分 -->
  <div><input type="file" @change="onFileChange" multiple /></div>

  <!-- 图片重新排序部分 -->
  <div>
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>单列拖拽</span>
        </div>
      </template>
      <draggable
        v-model="lists"
        item-key="name"
        chosen-class="chosen"
        force-fallback="true"
        animation="300"
        @change="change"
      >
        <template #item="{ element, index }">
          <div class="item-single">{{ element.name }} {{ index }}</div>
        </template>
      </draggable>
    </el-card>
  </div>

  <!-- 图片预览对话框 -->
  <el-dialog v-model:visible="isPreviewVisible" title="图片预览">
    <div v-for="(url, index) in newUrlInline" :key="index">
      <img src="url" style="max-width: 100%; margin-bottom: 10px" />
    </div>
  </el-dialog>

  <!-- 预览按钮 -->
  <button @click="previewImages">预览</button>
</template>

<style lang="scss" scoped>
/* grid列表拖拽 */
.grid-container {
  display: grid;
  grid-template-rows: 33.3% 33.3% 33.3%;
  grid-template-columns: 33.3% 33.3% 33.3%;
}

.item-single {
  height: 77px;
  font-size: 1.5em;
  line-height: 85px;
  text-align: center;
  cursor: move;
  border: 1px solid #e5e4e9;
}

.item-cut {
  height: 77px;
  font-size: 1.5em;
  line-height: 77px;
  text-align: center;
  cursor: move;
  border: 1px solid #e5e4e9;
}

.item {
  font-size: 2em;
  line-height: 100px;
  text-align: center;
  cursor: move;
  border: 1px solid #e5e4e9;

  @media screen and (width <= 750px) {
    line-height: 90px;
  }
}

.item-1 {
  background-color: #ef342a;
}

.item-2 {
  background-color: #f68f26;
}

.item-3 {
  background-color: #4ba946;
}

.item-4 {
  background-color: #0376c2;
}

.item-5 {
  background-color: #c077af;
}

.item-6 {
  background-color: #f8d29d;
}

.item-7 {
  background-color: #b5a87f;
}

.item-8 {
  background-color: #d0e4a9;
}

.item-9 {
  background-color: #4dc7ec;
}

.chosen {
  border: solid 2px #3089dc !important;
}
</style>
