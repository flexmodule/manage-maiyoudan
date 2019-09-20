<template>
  <div class="goods">
    <div class="filter-container">
      <el-input placeholder="商品号" v-model="listQuery.id" style="width: 200px;" class="filter-item"/>
      <el-input
        placeholder="商品名称"
        v-model="listQuery.name"
        style="width: 200px;"
        class="filter-item"
      />
      <el-input
        placeholder="关联商户code"
        v-model="listQuery.merchantcode"
        style="width: 200px;"
        class="filter-item"
      />
      <el-select
        v-model="listQuery.status"
        placeholder="商品状态"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in goodsstatus"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="listQuery.type"
        placeholder="商品类型"
        style="width: 140px"
        class="filter-item"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        />
      </el-select>
      <el-date-picker
        v-model="listQuery.activity_start"
        type="datetime"
        placeholder="活动开始时间"
        align="right"
        value-format="yyyy-MM-dd HH:mm:ss"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <el-date-picker
        v-model="listQuery.activity_end"
        type="datetime"
        placeholder="活动结束时间"
        align="right"
        value-format="yyyy-MM-dd HH:mm:ss"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >新增</el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >导出excel</el-button>
      <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey=tableKey+1"
      >显示</el-checkbox>
    </div>

    <el-table :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="商品id" sortable="custom" align="center" width="88">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品类型" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type | typeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.stock}}</span>
        </template>
      </el-table-column>
      <el-table-column label="已售数量" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.salednum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="卖价" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sellingprice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="优惠价" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.spacialprice}}</span>
        </template>
      </el-table-column>
      <el-table-column label="成本价" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cost }}</span>
        </template>
      </el-table-column>
      <el-table-column label="好评率" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.goodrate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="限购数" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.limitnum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品状态" class-name="status-col" width="60">
        <template slot-scope="scope">
          <span>{{ scope.row.status| statusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="关联商户号" class-name="status-col" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.merchant_code}}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动时间" class-name="status-col" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.activity_start}}-{{ scope.row.activity_end}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="detailGoods(scope.row)">详情</el-button>
          <el-button size="mini" type="primary" @click="modifyGoods(scope.row)">修改</el-button>
          <el-button v-if="scope.row.status=='1'" size="mini" type="warning" @click="modifystatus(scope.row.id,2)">下架</el-button>
          <el-button v-if="scope.row.status=='2'" size="mini" type="info" @click="modifystatus(scope.row.id,1)">上架</el-button>
          <el-button size="mini" type="danger" @click="deleteOpen(scope.row.id)">删除</el-button>
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
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="temp.name" clearable :disabled="isdisable"/>
        </el-form-item>
        <el-form-item label="商品简介" prop="description">
          <el-input v-model="temp.description" clearable :disabled="isdisable"/>
        </el-form-item>
        <el-form-item label="关联商户" prop="merchant_code">
          <el-input v-model="temp.merchant_code" clearable :disabled="isdisable"/>
        </el-form-item>
        <el-form-item label="商品主图">
          <el-upload
            class="avatar-uploader"
            :action="serverUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :disabled="isdisable"
          >
            <img v-if="temp.mainphoto" :src="temp.mainphoto" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品类型" prop="type">
          <el-select
            v-model="temp.type"
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
        <el-form-item label="商品开始售卖时间">
          <el-date-picker
            v-model="temp.activity_start"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
            :disabled="isdisable"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="商品售卖结束时间">
          <el-date-picker
            v-model="temp.activity_end"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
            :disabled="isdisable"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="商品可使用开始时间">
          <el-date-picker
            v-model="temp.starttime"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
            :disabled="isdisable"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="商品可使用结束时间">
          <el-date-picker
            v-model="temp.endtime"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
            :disabled="isdisable"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="使用规则">
          <el-input type="textarea" v-model="temp.rules" :disabled="isdisable"></el-input>
        </el-form-item>
        <el-form-item label="商品状态">
          <el-select
            v-model="temp.status"
            :disabled="isdisable"
            class="filter-item"
            placeholder="Please select status"
          >
            <el-option
              v-for="item in goodsstatus"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="库存">
          <el-input
            placeholder="库存"
            v-model="temp.stock"
            style="width: 200px;"
            class="filter-item"
            :disabled="isdisable"
          />
        </el-form-item>
        <el-form-item label="限购数">
          <el-input
            placeholder="限购数"
            v-model="temp.limitnum"
            style="width: 200px;"
            class="filter-item"
            :disabled="isdisable"
          />
        </el-form-item>
        <el-form-item label="已售数量">
          <el-input
            placeholder="已售数量"
            v-model="temp.salednum"
            style="width: 200px;"
            class="filter-item"
            :disabled="isdisable"
          />
        </el-form-item>
        <el-form-item label="卖价">
          <el-input
            placeholder="卖价"
            v-model="temp.sellingprice"
            style="width: 200px;"
            class="filter-item"
            :disabled="isdisable"
          />
        </el-form-item>
        <el-form-item label="优惠价">
          <el-input
            placeholder="优惠价"
            v-model="temp.spacialprice"
            style="width: 200px;"
            class="filter-item"
            :disabled="isdisable"
          />
        </el-form-item>
        <el-form-item label="成本价">
          <el-input
            placeholder="成本价"
            v-model="temp.cost"
            style="width: 200px;"
            class="filter-item"
            :disabled="isdisable"
          />
        </el-form-item>
        <el-form-item label="好评率">
          <el-input
            placeholder="好评率"
            v-model="temp.goodrate"
            style="width: 200px;"
            class="filter-item"
            :disabled="isdisable"
          />
        </el-form-item>
        <el-form-item label="详情">
          <file-editor :content="temp.detail" ref="mychild" @textChange="getEditorTxt"></file-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="dialogStatus !='detail'">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from "@/directive/waves"; // Waves directive
// import { parseTime } from '@/utils'
import FileEditor from "@/components/fileEditor";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import api from "@/api/api";
import { setTimeout } from "timers";

export default {
  name: "goods",
  computed: {},
  components: { Pagination, FileEditor },
  directives: { waves },
  filters: {
    statusFilter(status) {
      if (status == 1) {
        return "已上架";
      }
      if (status == 2) {
        return "已下架";
      }
    },
    typeFilter(type) {
      if (type == 1) {
        return "美食";
      }
      if (type == 2) {
        return "景点";
      }
      if (type == 3) {
        return "娱乐";
      }
    }
  },
  data() {
    return {
      isdisable: false,
      serverUrl: this.$baseurl + "/maiyoudan/getimg", //上传的图片服务器地址
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      goodsstatus: [
        { key: 1, value: "已上架" },
        { key: 2, value: "已下架" },
        { key: "", value: "全部" }
      ],
      tableKey: 0,
      list: null,
      total: 0,
      listQuery: {
        status: "",
        merchantcode: "",
        id: "",
        name: "",
        type: "",
        activity_start: "",
        activity_end: "",
        page: 1,
        limit: 10
      },
      sortOptions: [
        { key: 1, value: "美食" },
        { key: 2, value: "景点" },
        { key: 3, value: "娱乐" },
        { key: "", value: "全部" }
      ],
      showReviewer: false,
      temp: {
        stock: "",
        salednum: "",
        name: "",
        type: "",
        status: "",
        goodrate: "",
        cost: "",
        starttime: "",
        endtime: "",
        spacialprice: "",
        sellingprice: "",
        detail: "",
        mainphoto: "",
        description: "",
        activity_start: "",
        activity_end: "",
        rules: "",
        merchant_code: "",
        limitnum:""
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
    modifygoodstatus(id,status) {
      api.modifygoodstatus({id:id,query:{status:status}}).then(res => {
        if (res.data.code == 0) {
          this.$notify({
            title: "成功",
            message: "更新状态成功",
            type: "success",
            duration: 2000
          });
          this.getList();
        } else {
          this.$message({
            type: 'info',
            message: res.data.msg
          }); 
        }
      });
    },
    modifystatus(id,status) {
      this.$confirm('此操作将更改商品状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          if(res=="confirm") {
            this.modifygoodstatus(id,status);
          } 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    },
    handleClose(done) {
      this.resetTemp();
      done();
    },
    cancel() {
      this.resetTemp();
      this.dialogFormVisible = false;
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
    getEditorTxt(value) {
      this.temp.detail = value;
    },
    returntype(num) {
      if (num == 1) {
        return "已上架";
      }
      if (num == 2) {
        return "已下架";
      }
    },
    getList() {
      api.getGoodsList({query:this.listQuery}).then(res => {
        if (res.data.code == 0) {
          if (res.data.msg && res.data.msg.rows) {
            this.list = res.data.msg.rows;
          }
          if (res.data.msg && res.data.msg.count) {
            this.total = res.data.msg.count;
          }
        } else {
          this.$message({
            type: 'info',
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
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteGoods(id);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    deleteGoods(id) {
      api.deletegoods({id:id}).then(res => {
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
            type: 'info',
            message: res.data.msg
          }); 
        }
      });
    },
    modifyGoods(row) {
      this.isdisable = false;
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.temp = row;
    },
    detailGoods(row) {
      this.isdisable = true;
      this.dialogStatus = "detail";
      this.dialogFormVisible = true;
      this.temp = row;
    },
    resetTemp() {
      this.temp = {
        stock: "",
        salednum: "",
        name: "",
        type: "",
        status: "",
        goodrate: "",
        cost: "",
        starttime: "",
        endtime: "",
        spacialprice: "",
        sellingprice: "",
        detail: "",
        mainphoto: "",
        description: "",
        activity_start: "",
        activity_end: "",
        rules: "",
        merchant_code: "",
        limitnum:""
      };
    },
    handleCreate() {
      this.isdisable = false;
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      let data = this.temp;
      api.addGoodsList({query:data}).then(res => {
        if (res.data.code == 0) {
          this.resetTemp();
          this.$notify({
            title: "成功",
            message: "创建成功",
            type: "success",
            duration: 2000
          });
          this.getList();
          setTimeout(() => {
            this.dialogFormVisible = false;
          }, 1000);
        } else {
          this.$message({
            type: 'info',
            message: res.data.msg
          }); 
        }
      });
    },
    updateData() {
      let data = this.temp;
      api.modifygoods({query:data,id:data.id}).then(res => {
        if (res.data.code == 0) {
          this.resetTemp();
          this.$notify({
            title: "成功",
            message: "修改成功",
            type: "success",
            duration: 2000
          });
          this.getList();
          setTimeout(() => {
            this.dialogFormVisible = false;
          }, 1000);
        } else {
          this.$message({
            type: 'info',
            message: res.data.msg
          }); 
        }
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/utils/Export2Excel").then(excel => {
        const tHeader = ["id", "name", "type", "stock", "salednum","sellingprice","spacialprice","cost","goodrate","status","starttime","endtime","description","merchant_code","created_at","updated_at"];
        const filterVal = ["id", "name", "type", "stock", "salednum","sellingprice","spacialprice","cost","goodrate","status","starttime","endtime","description","merchant_code","created_at","updated_at"];
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list"
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      let that=this
      let filter = this.$options.filters['typeFilter']
      console.log(filter)
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j == "status") {
            return that.returntype(v[j]);
          } else if (j == "type") {
            return filter(v[j]);
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
.goods {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
}
</style>