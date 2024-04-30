<template>
  <div class="article-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>面经后台</el-breadcrumb-item>
      <el-breadcrumb-item>面经管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never" border="false">
      <template #header>
        <div class="header">
          <span>共 {{ total }} 条记录</span>
          <el-button
            icon="el-icon-plus"
            size="small"
            type="primary"
            round
            @click="openDrawer('add')"
          >
            添加面经
          </el-button>
        </div>
        <el-table :data="tableData" style="width: 100%" stripe>
          <el-table-column prop="stem" label="标题" width="400">
          </el-table-column>
          <el-table-column prop="creator" label="作者"> </el-table-column>
          <el-table-column prop="likeCount" label="点赞"> </el-table-column>
          <el-table-column prop="views" label="浏览"> </el-table-column>
          <el-table-column prop="createdAt" label="更新日期" width="180">
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template #default="{ row }">
              <div class="actions">
                <i class="el-icon-view" @click="openDrawer('view')"></i>
                <i class="el-icon-edit" @click="openDrawer('edit')"></i>
                <i class="el-icon-delete" @click="del(row.id)"></i>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 50, 100, 200, 300, 400]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
    <!-- 抽屉 -->
    <el-drawer
      :title="drawerTitle"
      :visible.sync="drawer"
      :before-close="handleClose"
      size="50%"
    >
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
import { ArticleListApi } from '@/api/article'

export default {
  name: 'article-page',
  data () {
    return {
      tableData: [],
      total: 0,
      current: 1,
      pageSize: 10,
      currentPage: 1,
      drawer: false,
      drawerType: ''
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      const res = await ArticleListApi({
        current: this.current,
        pageSize: this.pageSize
      })
      console.log(res)
      this.tableData = res.data.rows
      this.total = res.data.total
    },
    del (id) {
      console.log(id)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.initData()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.current = val
      this.initData()
    },
    openDrawer (type) {
      console.log(type)
      this.drawerType = type
      this.drawer = true
    },
    handleClose (done) {
      this.$confirm('请确认关闭')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  },
  computed: {
    drawerTitle () {
      if (this.drawerType === 'add') {
        return '添加面经'
      } else if (this.drawerType === 'edit') {
        return '编辑面经'
      } else {
        return '面经预览'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 25px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
  }
  .actions {
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    color: #666;
    > i:hover {
      color: rgba(114, 124, 245, 1);
      cursor: pointer;
    }
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-breadcrumb {
  margin-top: 10px;
}
.el-form {
  padding-right: 40px;
}
.quill-editor {
  ::v-deep .ql-editor {
    height: 300px;
  }
}
.el-rate {
  padding: 10px 0;
}
.article-preview {
  padding: 0 40px 40px 40px;
  > h5 {
    font-size: 20px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 30px;
    margin: 0 0 20px 0;
  }
}
</style>
