<template>
  <div>
    <!-- <el-upload class="upload-demo" action="/goods/upload" :on-success="upLoadSuccess" :on-preview="handlePreview" :on-remove="handleRemove" multiple :limit="3" :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload> -->
    <el-upload class="upload-demo" 
    multiple :limit="3"
    action="/goods/upload" 
    :on-preview="handlePreview" 
    :on-remove="handleRemove" 
    :on-success="upLoadSuccess"
    :file-list="fileList" list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: "AddPhoto",
  data() {
    return {
      fileList: [
        // {
        //   name: "food.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // },
        // {
        //   name: "food2.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // }
      ]
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    upLoadSuccess(response, file, fileList) {
      console.log(fileList);
      let arr = fileList.map(item =>{return {name:item.name,url:item.response}});
      console.log(arr);
      this.$emit("getPhotoPath", arr);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
