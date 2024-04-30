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
          <el-button icon="el-icon-plus" size="small" type="primary" round>
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
                <i class="el-icon-edit"></i>
                <i class="el-icon-share"></i>
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
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        background
      >
      </el-pagination>
    </el-card>
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
      currentPage: 1
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      const res = await ArticleListApi()
      console.log(res)
      this.tableData = res.data.rows
      this.total = res.data.total
    },
    del (id) {
      console.log(id)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
