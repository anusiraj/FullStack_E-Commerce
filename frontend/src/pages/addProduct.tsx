import { useState, useEffect } from 'react'
import { Box, TextField, Button } from '@mui/material'

import { useAppDispatch } from '../hooks/reduxHook'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { createProduct } from '../redux/reducer/productReducer'
import axios from 'axios';

const AddProduct = () => {
    const dispatch = useAppDispatch()
    const initialState = {
        title: "",
        price: 0,
        description: "",
        categoryId: 0,
        image: ['']
    }
    const [formValue, setFormValue] = useState(initialState)
    const { title, price, description, categoryId, image } = formValue
    const [imageUrl, setImageUrl] = useState('')
    const pTitle = formValue.title
    const pPrice = formValue.price
    const pDescription = formValue.description
    const pCategoryId = formValue.categoryId
    const pImage = imageUrl

    const handleChange = (e: any) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }
    const handleAdd = () => {
        dispatch(createProduct({
            "title": pTitle,
            "price": pPrice,
            "description": pDescription,
            "categoryId": pCategoryId,
            "images": [pImage]
        }))
        toast.success("New product added successfully!")
    }
    const [selectedImage, setSelectedImage] = useState<FileList | null>(null);
    useEffect(() => {
        if (selectedImage) {
            axios.post("https://api.escuelajs.co/api/v1/files/upload", {
                file: selectedImage[0]
            }, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
            ).then(response => setImageUrl(response.data.location))
        }
    }, [selectedImage])

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                margin="normal"
                type="text"
                required
                fullWidth
                id="title"
                label="Product title"
                name="title"
                autoFocus
                value={title} onChange={handleChange} />
            <TextField margin="normal"
                required
                fullWidth
                type="number"
                id="price"
                label="Product Price"
                name="price"
                value={price} onChange={handleChange} />
            <TextField margin="normal"
                required
                fullWidth
                type="text"
                id="description"
                label="Product Description"
                name="description"
                value={description} onChange={handleChange} />
            <TextField margin="normal"
                required
                fullWidth
                type="number"
                id="categoryId"
                label="Product Category Id"
                name="categoryId"
                value={categoryId} onChange={handleChange} />
            <input
                accept="image/"
                name="file"
                type="file"
                multiple
                id="select-image"
                style={{ display: 'none' }}
                onChange={(e) => setSelectedImage(e.currentTarget.files)}
            />
            <label htmlFor="select-image">
                <Button variant="contained" color="primary" component="span">
                    Upload Image
                </Button>
            </label>
            <Button variant="contained" color="primary" onClick={handleAdd}>
                Submit
            </Button>
        </Box>
    )
}
export default AddProduct
