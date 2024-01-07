<script setup lang="ts">
// import { useVModel } from "@vueuse/core";
import { onMounted, ref } from "vue";
import Sortable, { Swap } from "sortablejs";
import draggable from "vuedraggable/src/vuedraggable";
import { getImgs } from "@/api/collection";

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
  urlList: string[];
}

// 声明 props 默认值
// 推荐阅读：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<FormProps>(), {
  urlList: () => []
});

// const lists = ref<Array<Object>>([
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
const newUrlInline = ref([]);
onMounted(async () => {
  try {
    const images = await get_Imgs();
    if (images) {
      newUrlInline.value = images.imgs;
      console.log(newUrlInline);
    }
  } catch (error) {
    console.error("Error fetching images:", error);
  }
});

// const newUrlInline = ref(props.urlList);

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

// // 使用 vueuse 的双向绑定工具
// const emit = defineEmits(["update:data"]);
// const data = useVModel(props, "urlList", emit);
</script>

<template>
  <!-- 图片上传部分 -->
  <div class="bottom-2">
    <input type="file" @change="onFileChange" multiple />
  </div>
  <div class="flex">
    <div class="w-1/2">
      <!-- 图片预览对话框 -->
      <div v-for="(url, index) in newUrlInline" :key="index">
        <img :src="url.name" style="max-width: 100%; margin-bottom: 2px" />
      </div>
    </div>
    <div class="w-1/2">
      <!-- 图片重新排序部分 -->
      <div>
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>拖拽排序</span>
            </div>
          </template>
          <draggable
            v-model="newUrlInline"
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
