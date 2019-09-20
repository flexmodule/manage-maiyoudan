<template>
  <div class="userlist">
    <div class="filter-container">
      <el-input
        placeholder="用户id"
        v-model="listQuery.id"
        style="width: 200px;"
        class="filter-item"
      />
      <el-input
        placeholder="城市(省)"
        v-model="listQuery.province"
        style="width: 200px;"
        class="filter-item"
      />
      <el-input
        placeholder="城市(市)"
        v-model="listQuery.city"
        style="width: 200px;"
        class="filter-item"
      />
      <el-input
        placeholder="用户code"
        v-model="listQuery.usercode"
        style="width: 200px;"
        class="filter-item"
      />
      <el-input
        placeholder="关联商户code"
        v-model="listQuery.merchantcode"
        style="width: 200px;"
        class="filter-item"
      />
      <el-input
        placeholder="关联分销code"
        v-model="listQuery.retailcode"
        style="width: 200px;"
        class="filter-item"
      />
      <el-input
        placeholder="昵称"
        v-model="listQuery.nikeName"
        style="width: 200px;"
        class="filter-item"
      />
      <el-select v-model="listQuery.sex" placeholder="性别" style="width: 140px" class="filter-item">
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >导出excel</el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;">显示code</el-checkbox>
    </div>
    <el-table :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="用户id" sortable="custom" align="center" width="88">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户头像" align="center" min-width="78">
        <template slot-scope="scope">
          <span class="headimg">
            <img :src="scope.row.avatarUrl" class="img" alt>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="是否属于商户" width="50" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ismerchant|typeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否是分销者" width="50" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.isretail | typeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="昵称" min-width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nikeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="openid" min-width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.open_id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="50" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sex|sexFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" class-name="status-col" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="省份" class-name="status-col" width="60">
        <template slot-scope="scope">
          <span>{{ scope.row.province}}</span>
        </template>
      </el-table-column>
      <el-table-column label="城市" class-name="status-col" width="60">
        <template slot-scope="scope">
          <span>{{ scope.row.city}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" label="用户code" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.usercode}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" label="关联商户code" min-width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.merchantcode}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" label="关联分销code" min-width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.retailcode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="detailUser(scope.row)">详情</el-button>
          <el-button size="mini" type="danger" @click="deleteOpen(scope.row.id)">删除</el-button>
          <el-button
            size="mini"
            type="info"
            v-if="!scope.row.retailcode"
            @click="modifystatus(scope.row.id,1,'retail')"
          >设置分销者</el-button>
          <el-button
            size="mini"
            type="warning"
            v-if="scope.row.retailcode"
            @click="cancelstatus(scope.row.id,2,'retail')"
          >取消分销</el-button>
          <el-button
            size="mini"
            type="info"
            v-if="!scope.row.merchantcode"
            @click="modifystatus(scope.row.id,1,'merchant')"
          >关联商户</el-button>
          <el-button
            size="mini"
            type="warning"
            v-if="scope.row.merchantcode"
            @click="cancelstatus(scope.row.id,2,'merchant')"
          >取消关联</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="top"
        label-width="80px"
        style="width: auto;"
      >
        <el-form-item label="用户ID" prop="id">
          <el-input v-model="temp.id" clearable :disabled="isdisable"/>
        </el-form-item>
        <el-form-item label="用户code" prop="usercode">
          <el-input v-model="temp.usercode" clearable :disabled="isdisable"/>
        </el-form-item>
        <el-form-item label="openID" prop="open_id">
          <el-input v-model="temp.open_id" clearable :disabled="isdisable"/>
        </el-form-item>
        <el-form-item label="用户头像">
          <el-upload
            class="avatar-uploader"
            :action="serverUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :disabled="isdisable"
          >
            <img v-if="temp.avatarUrl" :src="temp.avatarUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="性别" prop="type">
          <el-select
            v-model="temp.sex"
            class="filter-item"
            :disabled="isdisable"
            placeholder="Please select"
          >
            <el-option
              v-for="item in sortOptions"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户电话">
          <el-input
            placeholder="用户电话"
            v-model="temp.tel"
            class="filter-item"
            :disabled="isdisable"
          />
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input
            placeholder="用户昵称"
            v-model="temp.nikeName"
            class="filter-item"
            :disabled="isdisable"
          />
        </el-form-item>
        <el-form-item label="省份">
          <el-input
            placeholder="省份"
            v-model="temp.province"
            class="filter-item"
            :disabled="isdisable"
          />
        </el-form-item>
        <el-form-item label="城市">
          <el-input placeholder="城市" v-model="temp.city" class="filter-item" :disabled="isdisable"/>
        </el-form-item>
        <el-form-item label="是否分销">
          <span>{{temp.isretail|typeFilter}}</span>
        </el-form-item>
        <el-form-item label="关联分销code(为空则未关联)" prop="retailcode">
          <el-input v-model="temp.retailcode" clearable :disabled="isdisable"/>
        </el-form-item>
        <el-form-item label="是否属于商户">
          <span>{{temp.ismerchant|typeFilter}}</span>
        </el-form-item>
        <el-form-item label="关联商户code(为空则未关联)" prop="merchantcode">
          <el-input v-model="temp.merchantcode" clearable :disabled="isdisable"/>
        </el-form-item>
        <el-form-item label="真实姓名" prop="real_name">
          <el-input v-model="temp.real_name" clearable :disabled="isdisable"/>
        </el-form-item>
        <el-form-item label="创建时间" prop="createdAt">
          <el-input v-model="temp.createdAt" clearable :disabled="isdisable"/>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
import waves from "@/directive/waves"; // Waves directive
// import { parseTime } from '@/utils'
import FileEditor from "@/components/fileEditor";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import api from "@/api/api";
import { setTimeout } from "timers";

export default {
  name: "merchant",
  computed: {
    area: {
      get: function() {
        let array = [];
        let arr = this.temp.pcd;
        if (!arr) {
          return array;
        }
        if (arr.split(",")) {
          if (arr.split(",")[0]) {
            array.push(TextToCode[arr.split(",")[0]].code);
          }
          if (arr.split(",")[1]) {
            array.push(TextToCode[arr.split(",")[0]][arr.split(",")[1]].code);
          }
          if (arr.split(",")[2]) {
            array.push(
              TextToCode[arr.split(",")[0]][arr.split(",")[1]][
                arr.split(",")[2]
              ].code
            );
          }
        }
        console.log(array);
        return array;
      },
      set: function(value) {
        this.temp.pcd = "";
        console.log(CodeToText[value[1]]);
        if (value[0]) {
          this.temp.pcd = CodeToText[value[0]];
        }
        if (value[1]) {
          this.temp.pcd += "," + CodeToText[value[1]];
        }
        if (value[2]) {
          this.temp.pcd += "," + CodeToText[value[2]];
        }
      }
    }
  },
  components: { Pagination, FileEditor },
  directives: { waves },
  filters: {
    sexFilter(status) {
      if (status == 1) {
        return "男";
      }
      if (status == 2) {
        return "女";
      }
    },
    typeFilter(type) {
      if (type == 1) {
        return "是";
      }
      if (type == 2) {
        return "否";
      }
    }
  },
  data() {
    return {
      isdisable: false,
      serverUrl: this.$baseurl + "/maiyoudan/getimg", //上传的图片服务器地址
      list: null,
      total: 0,
      listQuery: {
        id: "",
        province: "",
        merchantcode: "",
        retailcode: "",
        city: "",
        usercode: "",
        nikeName: "",
        sex: "",
        page: 1,
        limit: 10
      },
      sortOptions: [
        { key: 1, value: "男" },
        { key: 2, value: "女" },
        { key: "", value: "全部" }
      ],
      showReviewer: false,
      temp: {
        id: "",
        nikename: "",
        usercode: "",
        ismerchant: "",
        isretail: "",
        avatarurl: "",
        open_id: "",
        mobile: "",
        province: "",
        city: "",
        sex: "",
        real_name: "",
        createdAt: "",
        merchantcode: "",
        retailcode: ""
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create",
        detail: "Detail"
      },
      dialogPvVisible: false,
      rules: {
        type: [
          { required: true, message: "type is required", trigger: "change" }
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change"
          }
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" }
        ]
      },
      downloadLoading: false
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    cancelstatus(id, status, txt) {
      this.$confirm("此操作将更改用户状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          if (res == "confirm") {
            if (txt == "retail") {
              this.modifyisretail(id, status, "");
            }
            if (txt == "merchant") {
              this.modifyismerchant(id, status, "");
            }
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    modifystatus(id, status, txt) {
      this.$prompt("请输入邮箱", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (txt == "retail") {
            this.modifyisretail(id, status, value);
          }
          if (txt == "merchant") {
            this.modifyismerchant(id, status, value);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    modifyismerchant(id, status, value) {
      api
        .modifyismerchant({
          id: id,
          query: { ismerchant: status, merchantcode: value }
        })
        .then(res => {
          if (res.data.code == 0) {
            this.resetTemp();
            this.$notify({
              title: "成功",
              message: "设置成功",
              type: "success",
              duration: 2000
            });
            this.getList();
          } else {
            this.$message({
              type: "info",
              message: res.data.msg
            });
          }
        });
    },
    modifyisretail(id, status, value) {
      api
        .modifyisretail({
          id: id,
          query: { isretail: status, retailcode: value }
        })
        .then(res => {
          if (res.data.code == 0) {
            this.resetTemp();
            this.$notify({
              title: "成功",
              message: "设置成功",
              type: "success",
              duration: 2000
            });
            this.getList();
          } else {
            this.$message({
              type: "info",
              message: res.data.msg
            });
          }
        });
    },
    handleClose(done) {
      this.resetTemp();
      done();
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      if (res.code == 0) {
        this.temp.mainphoto = res.msg;
      } else {
        this.$message.error("上传失败");
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    getList() {
      api.getUserList({ query: this.listQuery }).then(res => {
        if (res.data.code == 0) {
          if (res.data.msg && res.data.msg.rows) {
            this.list = res.data.msg.rows;
          }
          if (res.data.msg && res.data.msg.count) {
            this.total = res.data.msg.count;
          }
        } else {
          this.$message({
            type: "info",
            message: res.data.msg
          });
        }
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    deleteOpen(id) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteUser(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deleteUser(id) {
      api.deleteuser({ id: id }).then(res => {
        if (res.data.code == 0) {
          this.resetTemp();
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000
          });
          this.getList();
        } else {
          this.$message({
            type: "info",
            message: res.data.msg
          });
        }
      });
    },
    detailUser(row) {
      this.isdisable = true;
      this.dialogStatus = "detail";
      this.dialogFormVisible = true;
      this.temp = row;
    },
    resetTemp() {
      this.temp = {
        id: "",
        nikename: "",
        usercode: "",
        ismerchant: "",
        isretail: "",
        avatarurl: "",
        open_id: "",
        mobile: "",
        province: "",
        city: "",
        sex: "",
        real_name: "",
        createdAt: "",
        merchantcode: "",
        retailcode: ""
      };
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/utils/Export2Excel").then(excel => {
        const tHeader = [
          "id",
          "nikename",
          "usercode",
          "ismerchant",
          "isretail",
          "avatarurl",
          "open_id",
          "mobile",
          "province",
          "city",
          "sex",
          "real_name",
          "merchantcode",
          "retailcode",
          "created_at",
          "updated_at"
        ];
        const filterVal = [
          "id",
          "nikename",
          "usercode",
          "ismerchant",
          "isretail",
          "avatarurl",
          "open_id",
          "mobile",
          "province",
          "city",
          "sex",
          "real_name",
          "merchantcode",
          "retailcode",
          "createdAt",
          "updatedAt"
        ];
        const data = this.formatJson(filterVal, this.list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list"
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      let that = this;
      let typefilter = this.$options.filters["typeFilter"];
      let sexfilter = this.$options.filters["sexFilter"];
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j == "ismerchant"||j=="isretail") {
            return typefilter(v[j]);
          } else if (j == "sex") {
            return sexfilter(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.userlist {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
}
</style>