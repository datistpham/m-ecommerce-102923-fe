import axiosClient from "./axiosClient"

const categoriesApi = {
    getListCategories: async (pageNumber) => {
        try {
            const res = await axiosClient.get(`/api/category?pageNumber=${pageNumber}`)
            return res

        } catch (error) {
            console.log(error)
            return { ok: false }
        }
    },
    addCategory: async (data) => {
        try {
            const res = await axiosClient.post("/api/category/add", { ...data })
            return res
        } catch (error) {
            return { ok: false }
        }
    },
    updateCategory: async (categoryId, data) => {
        try {
            const res = await axiosClient.put(`/api/category/${categoryId}/update`, { ...data })

            return res

        } catch (error) {
            return { ok: false }
        }
    },
    deleteCategory: async (categoryId) => {
        try {
            const res = await axiosClient.delete(`/api/category/${categoryId}/delete`)

            return res
        } catch (error) {
            return { ok: false }
        }
    },
    getCategoryById: async (categoryId)=> {
        try {
            const res= await axiosClient.get(`/api/category/${categoryId}/get`)
            return res
        } catch (error) {
            console.log(error)
            return {ok: false}
        }
    }
}

export default categoriesApi