import {createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit"
import { API } from "../config/Api"

export const getProducts = createAsyncThunk("products/getProducts", async() => {
    const response = await API.get("/products")
    return response.data.data
})

export const createProduct = createAsyncThunk("products/createProduct", async({formData, config}) => {
    try{
        const response = await API.post("/product", formData, config)
        alert("Add Product Success")
        console.log(response)  
        return response.data.data
    }catch(error) {
        if (error.response.data.message) {
            return alert(error.response.data.message)
        } else if (error.response.data) {
            return alert(error.response.data)
        }
    }
})

export const updateProduct = createAsyncThunk("products/updateProduct", async({id, formData, config}) => {
    try{
        const response = await API.patch(`/product/${id}`, formData, config)
        alert("Update Product Success")
        console.log(response)  
        return response.data.data
    }catch (error) {
        if (error.response.data.message) {
            return alert(error.response.data.message)
        } else if (error.response.data) {
            return alert(error.response.data)
        }
    }
})

export const deleteProduct = createAsyncThunk("products/deleteProduct", async(id) => {
    await API.delete(`/product/${id}`)
    return id
})

const productEntity = createEntityAdapter({
    selectId: (product) => product.id
})
const productSlice = createSlice({
    name: "product",
    initialState: productEntity.getInitialState(),
    extraReducers:{
        [getProducts.fulfilled]: (state, action) => {
            productEntity.setAll(state, action.payload)
        },
        [createProduct.fulfilled]: (state, action) => {
            productEntity.addOne(state, action.payload)
        },
        [deleteProduct.fulfilled]: (state, action) => {
            productEntity.removeOne(state, action.payload)
        },
        [updateProduct.fulfilled]: (state, action) => {
            productEntity.updateOne(state, {id: action.payload.id, updates: action.payload})
        }
    }
})

export const productSelectors= productEntity.getSelectors(state => state.product)
export default productSlice.reducer