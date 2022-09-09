<template>
  <div>
    <el-dialog
    :append-to-body="true"
      :visible.sync="dialogVisible"
      v-bind="$attrs"
      v-on="$listeners"
      @open="onOpen"
      @close="onClose"
      title="注册登录号"
    >
      <el-row :gutter="15">
        <el-form
          ref="elForm"
          :model="formData"
          :rules="rules"
          size="medium"
          label-width="100px"
        >
          <el-col :span="24">
            <el-form-item label="登录名" prop="username">
              <el-input
                v-model="formData.username"
                :maxlength="20"
                show-word-limit
                clearable
                prefix-icon="el-icon-user"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="formData.password"
                type="password"
                :show-password="true" 
                placeholder="请输入密码"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="确认密码" prop="password2">
              <el-input
                v-model="formData.password2"
                placeholder="请输入确认密码"
                type="password"
                :show-password="true" 
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="电话" prop="phone">
              <el-input v-model="formData.phone" :maxlength="11" show-word-limit clearable
                prefix-icon='el-icon-phone-outline' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="角色" prop="roles">
              <el-checkbox-group v-model="formData.roles" size="medium">
                <el-checkbox
                  v-for="(item, index) in rolesOptions"
                  :key="index"
                  :label="item.value"
                  :disabled="item.disabled"
                  >{{ item.label }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="头像" prop="headimg" required>
              <el-upload
                ref="headimg"
                :file-list="headimgfileList"
                :limit="1"
                :action="headimgAction"
                :before-upload="headimgBeforeUpload"
                list-type="picture"
                :on-success="handle_success"
                :on-remove="handle_remove"
              >
                <el-button size="small" type="primary" icon="el-icon-upload"
                  >点击上传</el-button
                >
                <div slot="tip" class="el-upload__tip">
                  只能上传不超过 10MB 的文件
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  <script>
export default {
  inheritAttrs: false,
  components: {},
  props: [],
  data() {
    return {
      dialogVisible: false,
      formData: {
        username: undefined,
        password: "",
        password2: undefined,
        phone: undefined,
        roles: [],
        headimg: null,
      },
      rules: {
        headimg:[
          {
            required: false,
            trigger: "blur",
          }
        ]
        ,
        phone: [
          {
            pattern: /^1(3|4|5|7|8|9)\d{9}$/,
            message: "手机号格式错误",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        password2: [
          {
            required: true,
            message: "请确认密码",
            trigger: "blur",
          },
        ],
      },
      headimgAction: "http://127.0.0.1:8086/upload/?tbname=admin",
      headimgfileList: [],
      rolesOptions: [
        {
          label: "管理员",
          value: "amdin",
        },
        {
          label: "用户",
          value: "user",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    getList() {
      this.$emit("getList");
    },
    onOpen() {
      this.dialogVisible = true;
    },
    onClose() {
      this.$refs["elForm"].resetFields();
      this.getList();
    },
    close() {
      this.$emit("update:visible", false);
      this.getList();
      this.dialogVisible = false;
    },
    handelConfirm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        this.close();
      });
      this.formData.roles = this.formData.roles.toString();
      console.log(this.formData);
      console.log(this.headimgfileList);
      this.formData.headimg = this.headimgfileList.toString();
      if (this.formData.id == null) {
        this.$http.post("admin", this.formData).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("添加完成");
            this.dialogVisible = false;
            this.formData.roles = [];
          }else{
            this.$message.error(res.message);
          }
        });
      }
    },
    headimgBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 10;
      if (!isRightSize) {
        this.$message.error("文件大小超过 10MB");
      }
      return isRightSize;
    },
    handle_success(res) {
      console.log(res);
      this.headimgfileList.push(res.resultData[0]);
      console.log(this.headimgfileList);
    },
    handle_remove(file, fileList) {
      let filename = file.response.resultData[0];
      let fileArray = this.headimgfileList;
      console.log(filename);
      console.log(fileArray);
      for (let i = 0; i < fileArray.length; i++) {
        if (fileArray[i] == filename) {
          fileArray.splice(i, 1);
        }
      }
      this.$http.delete("upload/admin/" + filename);
    },
  },
};
</script>
  <style>
.el-upload__tip {
  line-height: 1.2;
}
</style>
  