import requset from '@/utils/request'

export const ArticleListApi = params => {
  return requset.get('/admin/interview/query', { params })
}

export const addArticleApi = data => {
  return requset.post('/admin/interview/create', data)
}

export const delArticleApi = id => {
  return requset({
    method: 'delete',
    url: '/admin/interview/remove',
    data: { id }
  })
}
