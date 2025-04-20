import { useEffect, useState } from "react"
import { createBrand, createCategory, createProduct, deleteBrand, deleteCategory, deleteProduct, getBrandsByCategory, getCategories, getProducts, reactivateBrand, reactivateCategory, reactivateProduct } from "../Home/services/categorias.service.js"

import {
    AlertTriangle,
    Package,
    ShoppingBag,
    Tag,
  } from "lucide-react"

const useAdmin = (user) => {
    const [newCategory, setNewCategory] = useState({ nombre: "" })
    const [newBrand, setNewBrand] = useState({ nombre: "", id_categoria: "" })

    const [selectedCategory, setSelectedCategory] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")

    const [products, setProducts] = useState([])
      const [categories, setCategories] = useState([])
      const [brands, setBrands] = useState([])
      const [loading, setLoading] = useState(true)


      const [isAddProductOpen, setIsAddProductOpen] = useState(false)
      const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
      const [isAddBrandOpen, setIsAddBrandOpen] = useState(false)

      // Form states
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    precio: "",
    id_marca: "",
    descripcion: "",
    talles: [],
    sabores: [],
  })
  
  const [productImage, setProductImage] = useState(null)
    // Fetch data on component mount
  useEffect(() => {
    fetchCategories()
    fetchProducts()
    fetchAllBrands()
  }, [])

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await getCategories()
      setCategories(response || [])
    } catch (error) {
      console.error("Error fetching categories:", error)
      setCategories([])
    }
  }

  // Fetch brands by category
  const fetchBrandsByCategory = async (categoryId) => {
    try {
      const response = await getBrandsByCategory(categoryId)
      setBrands(response || [])
    } catch (error) {
      console.error("Error fetching brands:", error)
      setBrands([])
    }
  }

  // Fetch all brands
  const fetchAllBrands = async () => {
    try {
      // Fetch all categories first
      const categories = await getCategories()
      // For each category, fetch brands
      let allBrands = []
      for (const category of categories) {
        const brands = await getBrandsByCategory(category.id)
        allBrands = [...allBrands, ...brands]
      }

      setBrands(allBrands || [])
    } catch (error) {
      console.error("Error fetching all brands:", error)
      setBrands([])
    }
  }

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await getProducts()
      setProducts(response || [])
    } catch (error) {
      console.error("Error fetching products:", error)
      setProducts([]) // Set to empty array in case of error
    } finally {
      setLoading(false)
    }
  }

  // Add new category
  const handleAddCategory = async () => {
    try {
      const response = await createCategory(newCategory, user.token)

      if (response.nombre) {
        fetchCategories()
        setNewCategory({ nombre: "" })
        setIsAddCategoryOpen(false)
      } else {
        console.error("Failed to add category")
      }
    } catch (error) {
      console.error("Error adding category:", error)
    }
  }

   // Handle category change
   const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId)
    if (categoryId && categoryId !== "all") {
      fetchBrandsByCategory(categoryId)
    } else {
      fetchAllBrands()
    }
  }

  // Add new brand
  const handleAddBrand = async () => {
    try {
      const response = await createBrand(newBrand, user.token)

      if (response.id_categoria) {
        fetchAllBrands()
        setNewBrand({ nombre: "", id_categoria: "" })
        setIsAddBrandOpen(false)
      } else {
        console.error("Failed to add brand")
      }
    } catch (error) {
      console.error("Error adding brand:", error)
    }
  }

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      if (productImage) {
        formData.append("file", productImage);
      }
  
      // Procesar talles: convertir números enteros, pero mantener fracciones y otros formatos
      const processedProduct = {
        ...newProduct,
        talles: newProduct.talles.map((t) => {
          // Si es un número entero válido, conviértelo
          if (/^\d+$/.test(t)) {
            return Number.parseInt(t, 10);
          }
          // Si tiene formato de fracción tipo "7 3/4", mantenerlo como string
          return t.trim();
        }),
      };
  
      formData.append("data", JSON.stringify(processedProduct))

      const response = await createProduct(formData, user.token)

      if (response.id) {
        fetchProducts()
        setNewProduct({
          nombre: "",
          precio: "",
          id_marca: "",
          descripcion: "",
          talles: [],
          sabores: [],
        })
        setProductImage(null)
        setIsAddProductOpen(false)
      } else {
        console.error("Failed to add product")
      }
    } catch (error) {
      console.error("Error adding product:", error)
    }
  }

  // Delete product
  const handleDeleteProduct = async (productId) => {
    try {
        await deleteProduct(productId, user.token)
        fetchProducts()
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  // Delete category
  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId, user.token)
        fetchCategories()
    } catch (error) {
      console.error("Error deleting category:", error)
    }
  }

  // Delete brand
  const handleDeleteBrand = async (brandId) => {
    try {
      await deleteBrand(brandId, user.token)
        fetchAllBrands()
    } catch (error) {
      console.error("Error deleting brand:", error)
    }
  }

  // Handle file change for product image
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProductImage(e.target.files[0])
    }
  }

  // Handle size/talle input for products (edit mode)
  const handleTallesChange = (e) => {
    const tallesString = e.target.value;
    const tallesArray = tallesString
      .split(",")
      .filter((t) => t) // Mantiene los espacios en blanco
      .map((t) => t.trim()); // Mantener cada talle como string, sin conversión

    setNewProduct({
      ...newProduct,
      talles: tallesArray.join(", "), // Enviar como string
    });
  }

  // Handle flavors/sabores input for products
  const handleSaboresChange = (e) => {
    const saboresString = e.target.value
    const saboresArray = saboresString
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s)
    setNewProduct({
      ...newProduct,
      sabores: saboresArray,
    })
  }

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.nombre?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get product image URL
  const getProductImageUrl = (product) => {
    if (product.fotos && product.fotos.length > 0) {
      return product.fotos[0].link
    }
    return "/placeholder.svg?height=48&width=48"
  }

  const handleReactivateProduct = async (productId) => {
    try {
      await reactivateProduct(productId, user.token)
      fetchProducts()
    } catch (error) {
      console.error("Error reactivating product:", error)
    }
  }

    const handleReactivateBrand = async (brandId) => {
    try {
      await reactivateBrand(brandId, user.token)
      fetchAllBrands()
    } catch (error) {
      console.error("Error reactivating brand:", error)
    }
}

    const handleReactivateCategory = async (categoryId) => {
    try {
      await reactivateCategory(categoryId, user.token)
        fetchCategories()
    } catch (error) {
        console.error("Error reactivating category:", error)
    }}




  // Sample data for dashboard stats
  const stats = [
    { title: "Total Productos", value: products.length, icon: Package },
    { title: "Categorías", value: categories.length, icon: Tag },
    { title: "Marcas", value: brands.length, icon: ShoppingBag },
    { title: "Sin Stock", value: 0, icon: AlertTriangle }, // This would need actual data
  ]

  return {
    newCategory,
    setNewCategory,
    newBrand,
    setNewBrand,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    products,
    setProducts,
    categories,
    setCategories,
    brands,
    setBrands,
    loading,
    setLoading,
    isAddProductOpen,
    setIsAddProductOpen,
    isAddCategoryOpen,
    setIsAddCategoryOpen,
    isAddBrandOpen,
    setIsAddBrandOpen,
    newProduct,
    setNewProduct,
    productImage,
    setProductImage,
    fetchCategories,
    fetchBrandsByCategory,
    fetchAllBrands,
    fetchProducts,
    handleAddCategory,
    handleCategoryChange,
    handleAddBrand,
    handleAddProduct,
    handleDeleteProduct,
    handleDeleteCategory,
    handleDeleteBrand,
    handleFileChange,
    handleTallesChange,
    handleSaboresChange,
    filteredProducts,
    getProductImageUrl,
    stats,
    handleReactivateProduct,
    handleReactivateBrand,
    handleReactivateCategory,
  }
}

export {useAdmin}