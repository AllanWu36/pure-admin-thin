<script setup lang="ts">
// import { useVModel } from "@vueuse/core";
import { onMounted, ref } from "vue";
import Sortable, { Swap } from "sortablejs";
import draggable from "vuedraggable/src/vuedraggable";
import { getImgs, img_item } from "@/api/collection";
import { ElMessage, ElMessageBox } from "element-plus";

import type { UploadProps, UploadUserFile } from "element-plus";

async function get_Imgs() {
  const result = await getImgs({ id: "1" });
  if (result.success) {
    console.log(result.data);
    return result.data;
  }
}

// 声明 props 类型
export interface FormProps {
  // url 列表
  data: {
    num: number;
    urlList: img_item[];
  };
}

// 声明 props 默认值
// 推荐阅读：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<FormProps>(), {
  data: () => ({ num: 0, urlList: [] })
});

//   {
//     people: "cn",
//     id: 1,
//     name: "https://p1.itc.cn/q_70/images03/20230531/c4a2b095c3bd41b59783b12c02c50d3b.png"
//   },
//   {
//     people: "cn",
//     id: 2,
//     name: "https://p1.itc.cn/q_70/images03/20230531/c4a2b095c3bd41b59783b12c02c50d3b.png"
//   },
//   {
//     people: "cn",
//     id: 3,
//     name: "https://imagecdn.cqliving.com/images/app_29/cms/202305/6a71758d6b27cf9c2f854d0b0df826201d031cff.jpg?x-oss-process=image%2Fresize%2Cm_lfit%2Cw_720%2Ch_16384"
//   },
//   {
//     people: "cn",
//     id: 4,
//     name: "https://p1.itc.cn/q_70/images03/20230531/c4a2b095c3bd41b59783b12c02c50d3b.png"
//   },
//   {
//     people: "cn",
//     id: 5,
//     name: "https://p1.itc.cn/q_70/images03/20230531/c4a2b095c3bd41b59783b12c02c50d3b.png"
//   },
//   {
//     people: "cn",
//     id: 6,
//     name: "https://p1.itc.cn/q_70/images03/20230531/c4a2b095c3bd41b59783b12c02c50d3b.png"
//   },
//   {
//     people: "cn",
//     id: 7,
//     name: "https://p1.itc.cn/q_70/images03/20230531/c4a2b095c3bd41b59783b12c02c50d3b.png"
//   }
// ]);

// const newUrlInline = ref(lists);
// console.log(newUrlInline);
const props_data = ref(props.data);
onMounted(async () => {
  try {
    const images = await get_Imgs();
    if (images) {
      props_data.value.urlList = images.imgs;
      console.log(props_data.value.urlList);
    }
  } catch (error) {
    console.error("Error fetching images:", error);
  }
});

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

const handleUploadSuccess = (response, file, fileList) => {
  console.log(response, file, fileList);
  // 处理上传成功的逻辑
  // props_data.value.urlList.push(response.data);
};

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  ElMessage.warning(
    `不能超过7张图片, 本次你选择了 ${files.length} 个文件, 总共达到 ${
      files.length + uploadFiles.length
    } 文件了`
  );
};

const change = (evt): void => {
  console.log("evt: ", evt);
};

// // 使用 vueuse 的双向绑定工具
// const emit = defineEmits(["update:data"]);
// const data = useVModel(props, "urlList", emit);
</script>

<template>
  <div class="flex">
    <div class="w-1/2">
      <!-- 图片预览对话框 -->
      <div v-for="(url, index) in props_data.urlList" :key="index">
        <img :src="url.name" style="max-width: 100%; margin-bottom: 2px" />
      </div>
    </div>
    <div class="w-1/2">
      <!-- 图片上传部分 -->
      <div class="ml-3 mb-3">
        <el-upload
          v-model:file-list="props_data.urlList"
          class="upload-demo"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple
          :limit="7"
          :on-exceed="handleExceed"
          :on-success="handleUploadSuccess"
        >
          <el-button type="primary">上传图片</el-button>
          <template #tip>
            <div class="el-upload__tip">
              上传图片不超过10张，每张应该小于500KB.
            </div>
          </template>
        </el-upload>
      </div>
      <!-- 图片重新排序部分 -->
      <div class="ml-3 mb-3">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>拖拽排序</span>
            </div>
          </template>
          <draggable
            v-model="props_data.urlList"
            item-key="id"
            chosen-class="chosen"
            force-fallback="true"
            animation="300"
            @change="change"
          >
            <template #item="{ element, index }">
              <div class="item-single">{{ index }}:{{ element.id }}</div>
            </template>
          </draggable>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* grid列表拖拽 */
.item-single {
  height: 37px;
  font-size: 1em;
  line-height: 45px;
  text-align: center;
  cursor: move;
  border: 1px solid #e5e4e9;
}

.item-cut {
  height: 37px;
  font-size: 1.5em;
  line-height: 37px;
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

.chosen {
  border: solid 2px #3089dc !important;
}
</style>
