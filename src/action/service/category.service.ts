import * as categoryDao from '@/action/dao/pms/category.dao'

export const getCategoryTree = async () => {
  return (await categoryDao.findCategoryTree()).map(
      category => {
        return {
          id: category.categoryId,
          name: category.name,
          children: category.childCategories.map(
              child => {
                return {
                  id: child.categoryId,
                  name: child.name,
                  children: child.childCategories.map(
                      grandChild => {
                        return {
                          id: grandChild.categoryId,
                          name: grandChild.name,
                          children: []
                        }
                      }
                  )
                }
              }
          )
        }
      }
  )
}
