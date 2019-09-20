<template>
  <div>
    <el-upload
      v-show="false"
      id="quill-upload"
      :action="serverUrl"
      name="upload_file"
      multiple
      list-type="picture"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :on-error="uploadError"
      :on-success="handleExceed"
    >
      <el-button size="small" type="primary"></el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-row v-loading="uillUpdateImg">
      <quillEditor
        ref="myQuillEditor"
        @change="onEditorChange($event)"
        v-model="editValue"
        :options="editorOption"
      />
    </el-row>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "fileEditor",
  components: { quillEditor },
  props: {
    content: {
      type: String,
      default: ""
    }
  },
  watch: {
    content: function(value) {
      console.log(99);
      this.editValue = value;
    }
  }, //父组件传过来的，将传过来的渲染到富文本编辑器
  data() {
    return {
      uillUpdateImg: false, //根据图片上传状态来确定是否显示loading动画
      serverUrl: this.$baseurl+"/maiyoudan/getimg", //上传的图片服务器地址
      editValue: this.content, //富文本内容
      editorOption: {
        //符文本编辑器的配置
        placeholder: "",
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              // 工具栏配置, 默认是全部
              ["bold"],
              ["italic"],
              ["underline"],
              ["strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["blockquote"],
              ["code-block"],
              ["link"],
              ["image"],
              [{ list: "ordered" }, { list: "bullet" }]
            ],
            handlers: {
              image: function(value) {
                if (value) {
                  // 给个点击触发Element-ui，input框选择图片文件
                  document.querySelector("#quill-upload input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      }
    };
  },
  methods: {
    deletetxt() {
      let quill = this.$refs.myQuillEditor.quill;
      let length = quill.getLength();
      quill.deleteText(0, length);
    },
    onEditorChange({ quill, html, text }) {
      //富文本编辑器内容发生改变的时候
      this.editValue=html;
      this.$emit("textChange", html); //将富文本编辑器输入的文本发送给父组件，父组件涉及提交添加或者更改
    },
    beforeUpload() {
      //上传图片之前开启loading
      this.uillUpdateImg = true;
    },
    uploadError() {
      //图片上传失败,关闭loading
      this.uillUpdateImg = false;
      this.$message.error("图片插入失败");
    },
    handleExceed(response, file, fileList) {
      //图片添加成功
      let quill = this.$refs.myQuillEditor.quill;
      console.log(22, response);
      if (response.code === 0) {
        let length = quill.getSelection().index;
        // 插入图片 response.msg为服务器返回的图片地址
        quill.insertEmbed(length, "image", response.msg);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      this.fileList = fileList;
      this.uillUpdateImg = false;
    }
  }
};
</script>
<style lang='scss' scoped>
</style>