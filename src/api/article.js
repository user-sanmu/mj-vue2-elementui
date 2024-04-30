import requset from '@/utils/request'

export const ArticleListApi = params => {
  return requset.get('/admin/interview/query', { params })
}
