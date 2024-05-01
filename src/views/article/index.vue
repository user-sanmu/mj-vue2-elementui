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
      <el-form label-width="80px" :model="form" :rules="rules" ref="form">
        <el-form-item label="标题" prop="stem">
          <el-input v-model="form.stem"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <template>
            <div style="border: 1px solid #ccc">
              <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editor"
                :defaultConfig="toolbarConfig"
                :mode="mode"
              />
              <Editor
                style="height: 500px; overflow-y: hidden"
                v-model="form.content"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="onCreated"
                @onBlur="onBlur"
              />
            </div>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { ArticleListApi, addArticleApi, delArticleApi } from '@/api/article'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  name: 'article-page',
  components: { Editor, Toolbar },
  data () {
    return {
      tableData: [],
      total: 0,
      current: 1,
      pageSize: 10,
      currentPage: 1,
      drawer: false,
      drawerType: '',
      form: {
        stem: '',
        content: ''
      },
      rules: {
        stem: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      },
      editor: null,
      html: '',
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default'
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
      // console.log(res)
      this.tableData = res.data.rows
      this.total = res.data.total
    },
    del (id) {
      this.$confirm('请确认删除').then(async _ => {
        await delArticleApi(id)
        this.initData()
      })
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.initData()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.current = val
      this.initData()
    },
    openDrawer (type) {
      // console.log(type)
      this.drawerType = type
      this.drawer = true
    },
    handleClose () {
      this.drawer = false
    },
    onSubmit () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          // console.log(this.form)
          try {
            await addArticleApi(this.form)
            this.$refs.form.resetFields()
            this.handleClose()
            this.initData()
            this.$message.success('添加成功')
          } catch (err) {
            console.log(err)
            if (err.response) {
              this.$message.error(err.response.data.message)
              console.log(err)
            } else {
              this.$message.error('添加失败')
            }
          }
        }
      })
    },
    onBlur () {
      this.$refs.form.validateField('content')
      // console.log(this.$refs.form.content)
      // console.log(111)
    },
    onCreated (editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    beforeDestroy () {
      const editor = this.editor
      if (editor == null) return
      editor.destroy() // 组件销毁时，及时销毁编辑器
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

<style src="@wangeditor/editor/dist/css/style.css"></style>
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
