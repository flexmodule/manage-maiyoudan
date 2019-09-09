<template>
  <div class="merchant">
    <div class="filter-container">
      <el-input placeholder="商品号" v-model="listQuery.title" style="width: 200px;" class="filter-item"/>
      <el-input placeholder="商品名称" v-model="listQuery.title" style="width: 200px;" class="filter-item"/>
      <el-select v-model="listQuery.status" placeholder="商品状态" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in goodsstatus" :key="item.key" :label="item.value" :value="item.key"/>
      </el-select>
      <el-select v-model="listQuery.type" placeholder="商品类型" style="width: 140px" class="filter-item" >
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.value" :value="item.key"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出excel</el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">显示</el-checkbox>
    </div>

    <el-table

      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange">
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
			<el-table-column label="商品状态" class-name="status-col" width="60">
        <template slot-scope="scope">
          <span>{{ scope.row.status| statusFilter }}</span>
        </template>
      </el-table-column>
			<el-table-column label="可使用时间" class-name="status-col" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.usetime }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status!='published'" size="mini" type="success" @click="handleModifyStatus(scope.row,'published')">详情
          </el-button>
					<el-button v-if="scope.row.status!='published'" size="mini" type="success" @click="handleModifyStatus(scope.row,'published')">修改
          </el-button>
					<el-button v-if="scope.row.status!='published'" size="mini" type="success" @click="handleModifyStatus(scope.row,'published')">下架
          </el-button>
					<el-button v-if="scope.row.status!='published'" size="mini" type="success" @click="handleModifyStatus(scope.row,'published')">上架
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="top" label-width="80px" style="width: auto;">
        <el-form-item label="商品类型" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in sortOptions" :key="item.key" :label="item.value" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="使用时间" prop="usetime">
          <el-date-picker v-model="temp.usetime" type="datetime" placeholder="Please pick a date"/>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item label="商品状态">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select status">
            <el-option v-for="item in goodsstatus" :key="item.key" :label="item.value" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="库存">
         <el-input placeholder="库存" v-model="temp.stock" style="width: 200px;" class="filter-item"/>
        </el-form-item>
         <el-form-item label="已售数量">
         <el-input placeholder="已售数量" v-model="temp.salednum" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item label="卖价">
         <el-input placeholder="卖价" v-model="temp.sellingprice" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item label="优惠价">
         <el-input placeholder="优惠价" v-model="temp.spacialprice" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item label="成本价">
         <el-input placeholder="成本价" v-model="temp.cost" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item label="好评率">
         <el-input placeholder="好评率" v-model="temp.goodrate" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item label="详情">
         <quill-editor v-model="temp.content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
         </quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确认</el-button>
      </div>
    </el-dialog>

    <!-- <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog> -->

  </div>
</template>

<script>
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // Waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import api from '@/api/api';

export default {
  name: 'order',
  computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      if(status==1) {
        return "已上架"
      } 
      if(status==2) {
        return "已下架"
      }
    },
    typeFilter(type) {
      if(type==1) {
        return "美食"
      }
      if(type==2) {
        return "景点"
      }
      if(type==3) {
        return "娱乐"
      }
    }
  },
  data() {
    return {
      editorOption: {
          // some quill options
        },
      goodsstatus:[{key:1,value:'已上架'},{key:2,value:'已下架'}],
      tableKey: 0,
      list: null,
      total: 0,
      listQuery: {
        status: '',
        limit: 20,
        importance: undefined,
        title: undefined,
        type: '',
        sort: ''
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{key:1,value:'美食'},{key:2,value:'景点'},{key:3,value:'娱乐'}],
      showReviewer: false,
      temp: {
        stock: '',
        salednum: '',
        usetime: '',
        name: '',
        type: '',
        status: '',
        goodrate:'',
        cost:'',
        spacialprice:'',
        sellingprice:'',
        content:'<h2>I am Example</h2>',
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
    returntype(num) {
      if(num==1) {
        return "已上架"
      } 
      if(num==2) {
        return "已下架"
      }
    },
		changepicker() {

		},
    getList() {
        api.getGoodsList().then(res=>{
          console.log(res)
          if(res.data.code==0) {
            this.list=res.data.msg;
          }
        });
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        stock: '',
        salednum: '',
        usetime: '',
        name: '',
        type: '',
        status: '',
        goodrate:'',
        cost:'',
        spacialprice:'',
        sellingprice:'',
        content:""
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    createData() {
      let data=this.temp;
      api.addGoodsList(data).then(res=>{
          if(res.data.code==0) {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }
        });
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/utils/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
<style lang="scss" scoped>
.merchant {
	background:#fff;
	padding:20px;
	border-radius:10px;
}
</style>