"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  Edit,
  Eye,
  Instagram,
  Plus,
  Search,
  Trash2,
  User,
  PhoneIcon as WhatsApp,
  RefreshCw,
  Info,
  Loader2,
  ArrowDownIcon,
  ArrowUpIcon,
  LayoutGrid,
  TableIcon,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "../../context/auth/AuthContext"
import { useAdmin } from "../../Hooks/useAdmin"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Modificar la configuración de API para asegurarnos de que se construyan correctamente las URLs
// Configuración de API
const API_CONFIG = {
  // Use window._env_ if available, otherwise fallback to localhost
  baseUrl:
    (typeof window !== "undefined" && window._env_ && window._env_.API_URL) || "https://stone-market-back.vercel.app",
  generalUri: "/stone/api",
}

const AdminPanel = () => {
  const { user } = useAuth()

  // Modificar la línea donde se usa el hook useAdmin para pasar explícitamente la configuración de API
  const {
    newCategory,
    setNewCategory,
    newBrand,
    setNewBrand,
    selectedCategory,
    searchTerm,
    setSearchTerm,
    categories,
    brands,
    loading,
    isAddProductOpen,
    setIsAddProductOpen,
    isAddCategoryOpen,
    setIsAddCategoryOpen,
    isAddBrandOpen,
    setIsAddBrandOpen,
    newProduct,
    setNewProduct,
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
  } = useAdmin(user, API_CONFIG)

  // Admin panel state
  const [activeTab, setActiveTab] = useState("products")
  const [isMobile, setIsMobile] = useState(false)

  // Estados para edición
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false)
  const [isEditBrandOpen, setIsEditBrandOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [editingCategory, setEditingCategory] = useState(null)
  const [editingBrand, setEditingBrand] = useState(null)
  const [productImage, setProductImage] = useState(null)

  // Estados para indicadores de carga
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false)
  const [isUpdatingCategory, setIsUpdatingCategory] = useState(false)
  const [isUpdatingBrand, setIsUpdatingBrand] = useState(false)
  const [isDeletingProduct, setIsDeletingProduct] = useState(null)
  const [isDeletingCategory, setIsDeletingCategory] = useState(null)
  const [isDeletingBrand, setIsDeletingBrand] = useState(null)
  const [isReactivatingProduct, setIsReactivatingProduct] = useState(null)
  const [isReactivatingCategory, setIsReactivatingCategory] = useState(null)
  const [isReactivatingBrand, setIsReactivatingBrand] = useState(null)

  // 1. Add pagination state and controls to the component
  // Add these state variables after the other state declarations
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [viewMode, setViewMode] = useState("table") // "table" or "grid"
  const [sortOrder, setSortOrder] = useState("none") // "none", "asc", or "desc"

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Funciones para iniciar la edición
  const startEditProduct = (product) => {
    console.log("Iniciando edición de producto:", product)
    // Asegurarse de que talles y sabores sean arrays
    const talles = Array.isArray(product.talles) ? product.talles : []
    const sabores = Array.isArray(product.sabores) ? product.sabores : []

    setEditingProduct({
      ...product,
      id_marca: product.Marca?.id?.toString() || product.id_marca?.toString(),
      talles: talles,
      sabores: sabores,
    })
    setIsEditProductOpen(true)
  }

  const startEditCategory = (category) => {
    console.log("Iniciando edición de categoría:", category)
    setEditingCategory({ ...category })
    setIsEditCategoryOpen(true)
  }

  const startEditBrand = (brand) => {
    console.log("Iniciando edición de marca:", brand)
    setEditingBrand({
      ...brand,
      id_categoria: brand.id_categoria?.toString(),
    })
    setIsEditBrandOpen(true)
  }

  // Funciones para manejar la edición
  const handleEditProduct = async () => {
    try {
      if (!editingProduct.nombre || !editingProduct.precio || !editingProduct.id_marca) {
        alert("Error: Por favor completa los campos obligatorios: Nombre, Precio y Marca")
        return
      }

      setIsUpdatingProduct(true)
      const formData = new FormData()

      // Add image if a new one is selected
      if (productImage) {
        formData.append("file", productImage)
      }

      // No hacer la conversión a números, mantener todo como string
      const processedProduct = {
        ...editingProduct,
        talles: editingProduct.talles.map((t) => t.trim()), // Mantener los talles como string
      }


      formData.append("data", JSON.stringify(processedProduct))

      console.log("Enviando actualización de producto:", processedProduct)
      console.log("URL:", `${API_CONFIG.baseUrl}${API_CONFIG.generalUri}/productos/${editingProduct.id}`)

      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.generalUri}/productos/${editingProduct.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData,
      })

      console.log("Respuesta del servidor:", response.status)

      if (response.ok) {
        alert("Producto actualizado correctamente")
        // Actualizar la lista de productos
        window.location.reload()
        setEditingProduct(null)
        setProductImage(null)
        setIsEditProductOpen(false)
      } else {
        let errorMessage = "Error desconocido"
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || "Error desconocido"
        } catch (e) {
          // Si no se puede parsear como JSON, usar el status text
          errorMessage = response.statusText || "Error desconocido"
        }
        alert(`Error al actualizar producto: ${errorMessage}. Código: ${response.status}`)
      }
    } catch (error) {
      console.error("Error updating product:", error)
      alert(`Error al actualizar producto: ${error.message}`)
    } finally {
      setIsUpdatingProduct(false)
    }
  }

  const handleEditCategory = async () => {
    try {
      if (!editingCategory.nombre || editingCategory.nombre.trim() === "") {
        alert("Error: El nombre de la categoría es obligatorio")
        return
      }

      setIsUpdatingCategory(true)
      console.log("Enviando actualización de categoría:", editingCategory)
      console.log("URL:", `${API_CONFIG.baseUrl}${API_CONFIG.generalUri}/categorias/${editingCategory.id}`)

      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.generalUri}/categorias/${editingCategory.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(editingCategory),
      })

      console.log("Respuesta del servidor:", response.status)

      if (response.ok) {
        alert("Categoría actualizada correctamente")
        // Actualizar la lista de categorías
        window.location.reload()
        setEditingCategory(null)
        setIsEditCategoryOpen(false)
      } else {
        let errorMessage = "Error desconocido"
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || "Error desconocido"
        } catch (e) {
          // Si no se puede parsear como JSON, usar el status text
          errorMessage = response.statusText || "Error desconocido"
        }
        alert(`Error al actualizar categoría: ${errorMessage}. Código: ${response.status}`)
      }
    } catch (error) {
      console.error("Error updating category:", error)
      alert(`Error al actualizar categoría: ${error.message}`)
    } finally {
      setIsUpdatingCategory(false)
    }
  }

  const handleEditBrand = async () => {
    try {
      if (!editingBrand.nombre || editingBrand.nombre.trim() === "") {
        alert("Error: El nombre de la marca es obligatorio")
        return
      }

      if (!editingBrand.id_categoria) {
        alert("Error: Debes seleccionar una categoría")
        return
      }

      setIsUpdatingBrand(true)
      console.log("Enviando actualización de marca:", editingBrand)
      console.log("URL:", `stone/marcas/${editingBrand.id}`)

      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.generalUri}/marcas/${editingBrand.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(editingBrand),
      })

      console.log("Respuesta del servidor:", response.status)

      if (response.ok) {
        alert("Marca actualizada correctamente")
        // Actualizar la lista de marcas
        window.location.reload()
        setEditingBrand(null)
        setIsEditBrandOpen(false)
      } else {
        let errorMessage = "Error desconocido"
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || "Error desconocido"
        } catch (e) {
          // Si no se puede parsear como JSON, usar el status text
          errorMessage = response.statusText || "Error desconocido"
        }
        alert(`Error al actualizar marca: ${errorMessage}. Código: ${response.status}`)
      }
    } catch (error) {
      console.error("Error updating brand:", error)
      alert(`Error al actualizar marca: ${error.message}`)
    } finally {
      setIsUpdatingBrand(false)
    }
  }

  // Funciones para manejar los cambios en los formularios de edición
  const handleEditProductTallesChange = (e) => {
    const tallesString = e.target.value
    const tallesArray = tallesString
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t)
    setEditingProduct({
      ...editingProduct,
      talles: tallesArray,
    })
  }

  const handleEditProductSaboresChange = (e) => {
    const saboresString = e.target.value
    const saboresArray = saboresString
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s)
    setEditingProduct({
      ...editingProduct,
      sabores: saboresArray,
    })
  }

  const handleEditProductFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProductImage(e.target.files[0])
    }
  }

  // Versiones mejoradas de las funciones de eliminación y reactivación con indicadores de carga
  const handleDeleteProductWithLoading = async (productId) => {
    setIsDeletingProduct(productId)
    try {
      await handleDeleteProduct(productId)
    } finally {
      setIsDeletingProduct(null)
    }
  }

  const handleDeleteCategoryWithLoading = async (categoryId) => {
    setIsDeletingCategory(categoryId)
    try {
      await handleDeleteCategory(categoryId)
    } finally {
      setIsDeletingCategory(null)
    }
  }

  const handleDeleteBrandWithLoading = async (brandId) => {
    setIsDeletingBrand(brandId)
    try {
      await handleDeleteBrand(brandId)
    } finally {
      setIsDeletingBrand(null)
    }
  }

  const handleReactivateProductWithLoading = async (productId) => {
    setIsReactivatingProduct(productId)
    try {
      await handleReactivateProduct(productId)
    } finally {
      setIsReactivatingProduct(null)
    }
  }

  const handleReactivateCategoryWithLoading = async (categoryId) => {
    setIsReactivatingCategory(categoryId)
    try {
      await handleReactivateCategory(categoryId)
    } finally {
      setIsReactivatingCategory(null)
    }
  }

  const handleReactivateBrandWithLoading = async (brandId) => {
    setIsReactivatingBrand(brandId)
    try {
      await handleReactivateBrand(brandId)
    } finally {
      setIsReactivatingBrand(null)
    }
  }

  // 2. Add pagination logic for products
  // Add this after the filteredProducts declaration
  const paginateItems = (items, page, perPage) => {
    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage
    return items.slice(startIndex, endIndex)
  }

  // 3. Add sorting function for products
  // Add this after the paginateItems function
  const sortProducts = (products, order) => {
    if (order === "none") return products

    return [...products].sort((a, b) => {
      if (order === "asc") {
        return a.precio - b.precio
      } else {
        return b.precio - a.precio
      }
    })
  }

  // 4. Modify the search function to search by name, brand, or category
  // Replace the existing search functionality with this enhanced version
  // This should be used when filtering products
  const enhancedFilteredProducts = useMemo(() => {
    let filtered = filteredProducts

    // Apply sorting
    filtered = sortProducts(filtered, sortOrder)

    return filtered
  }, [filteredProducts, sortOrder])

  // 5. Create paginated lists for all sections
  const paginatedProducts = useMemo(() => {
    return paginateItems(enhancedFilteredProducts, currentPage, itemsPerPage)
  }, [enhancedFilteredProducts, currentPage, itemsPerPage])

  const paginatedCategories = useMemo(() => {
    return paginateItems(categories, currentPage, itemsPerPage)
  }, [categories, currentPage, itemsPerPage])

  const paginatedBrands = useMemo(() => {
    return paginateItems(brands, currentPage, itemsPerPage)
  }, [brands, currentPage, itemsPerPage])

  // 7. Add product detail view dialog state
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const [detailProduct, setDetailProduct] = useState(null)

  // 6. Add function to handle tab changes and reset pagination
  const handleTabChange = (value) => {
    setActiveTab(value)
    setCurrentPage(1) // Reset to first page when changing tabs
  }

  // 8. Add function to view product details
  const viewProductDetails = (product) => {
    setDetailProduct(product)
    setIsProductDetailOpen(true)
  }

  // 9. Modify the search functionality to search by name, brand, or category
  // Replace the useEffect or useMemo that filters products with this:
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to first page when searching
  }

  // Main admin panel UI
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/StoneMarket.png" />
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Bienvenido, Administrador</h1>
                <p className="text-muted-foreground">Panel de Administración de StoneMarket</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

            {stats
              .filter((stat) => !stat.title.includes("Sin Stock"))
              .map((stat, index) => (
                <Card key={index} className="overflow-hidden border-l-4 border-l-primary">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <stat.icon className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
          
          <Tabs defaultValue="products" onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="products" onClick={() => handleTabChange("products")}>
                Productos
              </TabsTrigger>
              <TabsTrigger value="categories" onClick={() => handleTabChange("categories")}>
                Categorías
              </TabsTrigger>
              <TabsTrigger value="brands" onClick={() => handleTabChange("brands")}>
                Marcas
              </TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Gestión de Productos</CardTitle>
                    <CardDescription>Administra los productos de tu tienda</CardDescription>
                  </div>
                  <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Producto
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
                      <DialogHeader>
                        <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                        <DialogDescription>
                          Completa los detalles del producto para agregarlo a tu tienda.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="col-span-1 sm:col-span-2">
                            <Label htmlFor="nombre">Nombre del Producto</Label>
                            <Input
                              id="nombre"
                              value={newProduct.nombre}
                              onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="precio">Precio</Label>
                            <Input
                              id="precio"
                              type="number"
                              value={newProduct.precio}
                              onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="marca">Marca</Label>
                            <Select
                              value={newProduct.id_marca}
                              onValueChange={(value) => setNewProduct({ ...newProduct, id_marca: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar marca" />
                              </SelectTrigger>
                              <SelectContent>
                                {brands.map((brand) => (
                                  <SelectItem key={brand.id} value={brand.id.toString()}>
                                    {brand.nombre}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="col-span-1 sm:col-span-2">
                            <Label htmlFor="descripcion">Descripción</Label>
                            <Textarea
                              id="descripcion"
                              value={newProduct.descripcion}
                              onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
                            />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <Label htmlFor="talles">Talles (separados por coma)</Label>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Ingresa los talles separados por comas. Ejemplo: 36, 37, 38</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <Input id="talles" placeholder="36, 37, 38, 39" onChange={handleTallesChange} />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <Label htmlFor="sabores">Sabores (separados por coma)</Label>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Ingresa los sabores separados por comas. Ejemplo: Manzana, Fresa</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <Input id="sabores" placeholder="Manzana, Banana, Fresa" onChange={handleSaboresChange} />
                          </div>
                          <div className="col-span-1 sm:col-span-2">
                            <Label htmlFor="imagen">Imagen del Producto</Label>
                            <Input id="imagen" type="file" onChange={handleFileChange} />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleAddProduct}>Guardar Producto</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Diálogo de edición de producto */}
                  <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
                      <DialogHeader>
                        <DialogTitle>Editar Producto</DialogTitle>
                        <DialogDescription>Modifica los detalles del producto.</DialogDescription>
                      </DialogHeader>
                      {editingProduct && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="col-span-1 sm:col-span-2">
                              <Label htmlFor="edit-nombre">Nombre del Producto</Label>
                              <Input
                                id="edit-nombre"
                                value={editingProduct.nombre}
                                onChange={(e) => setEditingProduct({ ...editingProduct, nombre: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-precio">Precio</Label>
                              <Input
                                id="edit-precio"
                                type="number"
                                value={editingProduct.precio}
                                onChange={(e) => setEditingProduct({ ...editingProduct, precio: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-marca">Marca</Label>
                              <Select
                                value={editingProduct.id_marca}
                                onValueChange={(value) => setEditingProduct({ ...editingProduct, id_marca: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Seleccionar marca" />
                                </SelectTrigger>
                                <SelectContent>
                                  {brands.map((brand) => (
                                    <SelectItem key={brand.id} value={brand.id.toString()}>
                                      {brand.nombre}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="col-span-1 sm:col-span-2">
                              <Label htmlFor="edit-descripcion">Descripción</Label>
                              <Textarea
                                id="edit-descripcion"
                                value={editingProduct.descripcion}
                                onChange={(e) => setEditingProduct({ ...editingProduct, descripcion: e.target.value })}
                              />
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <Label htmlFor="edit-talles">Talles (separados por coma)</Label>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Info className="h-4 w-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Ingresa los talles separados por comas. Ejemplo: 36, 37, 38</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                              <Input
                                id="edit-talles"
                                placeholder="36, 37, 38, 39"
                                value={Array.isArray(editingProduct.talles) ? editingProduct.talles.join(", ") : ""}
                                onChange={handleEditProductTallesChange}
                              />
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <Label htmlFor="edit-sabores">Sabores (separados por coma)</Label>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Info className="h-4 w-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Ingresa los sabores separados por comas. Ejemplo: Manzana, Fresa</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                              <Input
                                id="edit-sabores"
                                placeholder="Manzana, Banana, Fresa"
                                value={Array.isArray(editingProduct.sabores) ? editingProduct.sabores.join(", ") : ""}
                                onChange={handleEditProductSaboresChange}
                              />
                            </div>
                            <div className="col-span-1 sm:col-span-2">
                              <Label htmlFor="edit-imagen">Imagen del Producto (opcional)</Label>
                              <Input id="edit-imagen" type="file" onChange={handleEditProductFileChange} />
                              {editingProduct.fotos && editingProduct.fotos.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-sm text-muted-foreground">Imagen actual:</p>
                                  <div className="w-24 h-24 rounded-md overflow-hidden mt-1">
                                    <img
                                      src={editingProduct.fotos[0].link || "/placeholder.svg"}
                                      alt={editingProduct.nombre}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditProductOpen(false)}
                          disabled={isUpdatingProduct}
                        >
                          Cancelar
                        </Button>
                        <Button onClick={handleEditProduct} disabled={isUpdatingProduct}>
                          {isUpdatingProduct ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Guardando...
                            </>
                          ) : (
                            "Guardar Cambios"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                    {/* 11. Replace the search input in the Products tab with the enhanced version */}
                    {/* Find the search input in the Products tab and replace it with: */}
                    <div className="relative flex-1 w-full">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar por nombre, marca o categoría..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                    </div>
                  </div>

                  {/* 12. Add view mode toggle and sort controls to the Products tab */}
                  {/* Add this after the search and category filter: */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant={viewMode === "table" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("table")}
                      >
                        <TableIcon className="h-4 w-4 mr-2" />
                        Tabla
                      </Button>
                      <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                      >
                        <LayoutGrid className="h-4 w-4 mr-2" />
                        Cuadrícula
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                      <span className="text-sm text-muted-foreground">Ordenar por precio:</span>
                      <Button
                        variant={sortOrder === "asc" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSortOrder(sortOrder === "asc" ? "none" : "asc")}
                      >
                        <ArrowUpIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={sortOrder === "desc" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSortOrder(sortOrder === "desc" ? "none" : "desc")}
                      >
                        <ArrowDownIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p>Cargando productos...</p>
                    </div>
                  ) : enhancedFilteredProducts.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No se encontraron productos</p>
                    </div>
                  ) : /* 13. Replace the product listing with conditional rendering based on view mode */
                  /* Replace the Table component in the Products tab with: */
                  viewMode === "table" ? (
                    <div className="overflow-auto">
                      <ScrollArea className="max-h-[1000vh]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Imagen</TableHead>
                              <TableHead>Nombre</TableHead>
                              <TableHead>Precio</TableHead>
                              <TableHead>Estado</TableHead>
                              <TableHead className="hidden md:table-cell">Marca</TableHead>
                              <TableHead className="hidden md:table-cell">Categoría</TableHead>
                              <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {paginatedProducts.map((product) => (
                              <TableRow key={product.id}>
                                <TableCell>
                                  <div className="w-12 h-12 rounded-md overflow-hidden">
                                    <img
                                      src={getProductImageUrl(product) || "/placeholder.svg"}
                                      alt={product.nombre}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </TableCell>
                                <TableCell className="font-medium">{product.nombre}</TableCell>
                                <TableCell>${product.precio}</TableCell>
                                <TableCell>
                                  <Badge variant={product?.esActivo ? "default" : "secondary"}>
                                    {product?.esActivo ? "Activo" : "Inactivo"}
                                  </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {product?.Marca?.nombre || "N/A"}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {product?.Marca?.Categoria?.nombre || "N/A"}
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => viewProductDetails(product)}
                                          >
                                            <Eye className="h-4 w-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Ver detalles</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>

                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger>
                                          <Button variant="ghost" size="icon" onClick={() => startEditProduct(product)}>
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Editar producto</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>

                                    {product?.esActivo ? (
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="text-red-500"
                                              onClick={() => handleDeleteProductWithLoading(product.id)}
                                              disabled={isDeletingProduct === product.id}
                                            >
                                              {isDeletingProduct === product.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                              ) : (
                                                <Trash2 className="h-4 w-4" />
                                              )}
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>Desactivar producto</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    ) : (
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="text-green-700"
                                              onClick={() => handleReactivateProductWithLoading(product.id)}
                                              disabled={isReactivatingProduct === product.id}
                                            >
                                              {isReactivatingProduct === product.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                              ) : (
                                                <RefreshCw className="h-4 w-4" />
                                              )}
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>Reactivar producto</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                      {paginatedProducts.map((product) => (
                        <Card key={product.id} className="overflow-hidden">
                          <div className="relative aspect-square">
                            <img
                              src={getProductImageUrl(product) || "/placeholder.svg"}
                              alt={product.nombre}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2">
                              <Badge variant={product?.esActivo ? "default" : "secondary"}>
                                {product?.esActivo ? "Activo" : "Inactivo"}
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-medium truncate">{product.nombre}</h3>
                            <p className="text-sm text-muted-foreground truncate">
                              {product?.Marca?.nombre || "N/A"} - {product?.Marca?.Categoria?.nombre || "N/A"}
                            </p>
                            <p className="font-bold mt-2">${product.precio}</p>
                            <div className="flex justify-between mt-4">
                              <Button variant="outline" size="sm" onClick={() => viewProductDetails(product)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Detalles
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => startEditProduct(product)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* 14. Add pagination controls for Products tab */}
                  {/* Add this after the product listing: */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                      Mostrando {paginatedProducts.length} de {enhancedFilteredProducts.length} productos
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Anterior
                      </Button>
                      <span className="text-sm">
                        Página {currentPage} de {Math.ceil(enhancedFilteredProducts.length / itemsPerPage)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage >= Math.ceil(enhancedFilteredProducts.length / itemsPerPage)}
                      >
                        Siguiente
                      </Button>
                      <Select
                        value={itemsPerPage.toString()}
                        onValueChange={(value) => {
                          setItemsPerPage(Number(value))
                          setCurrentPage(1)
                        }}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 por pág</SelectItem>
                          <SelectItem value="10">10 por pág</SelectItem>
                          <SelectItem value="20">20 por pág</SelectItem>
                          <SelectItem value="50">50 por pág</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Gestión de Categorías</CardTitle>
                    <CardDescription>Administra las categorías de productos</CardDescription>
                  </div>
                  <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Categoría
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Agregar Nueva Categoría</DialogTitle>
                        <DialogDescription>Ingresa el nombre de la nueva categoría.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div>
                          <Label htmlFor="category-name">Nombre de la Categoría</Label>
                          <Input
                            id="category-name"
                            value={newCategory.nombre}
                            onChange={(e) => setNewCategory({ ...newCategory, nombre: e.target.value })}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleAddCategory}>Guardar Categoría</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Diálogo de edición de categoría */}
                  <Dialog open={isEditCategoryOpen} onOpenChange={setIsEditCategoryOpen}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Categoría</DialogTitle>
                        <DialogDescription>Modifica los detalles de la categoría.</DialogDescription>
                      </DialogHeader>
                      {editingCategory && (
                        <div className="grid gap-4 py-4">
                          <div>
                            <Label htmlFor="edit-category-name">Nombre de la Categoría</Label>
                            <Input
                              id="edit-category-name"
                              value={editingCategory.nombre}
                              onChange={(e) => setEditingCategory({ ...editingCategory, nombre: e.target.value })}
                            />
                          </div>
                          <div>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditCategoryOpen(false)}
                          disabled={isUpdatingCategory}
                        >
                          Cancelar
                        </Button>
                        <Button onClick={handleEditCategory} disabled={isUpdatingCategory}>
                          {isUpdatingCategory ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Guardando...
                            </>
                          ) : (
                            "Guardar Cambios"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  {categories.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No hay categorías disponibles</p>
                    </div>
                  ) : (
                    <div className="overflow-auto">
                      <ScrollArea className="max-h-[1000vh]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>ID</TableHead>
                              <TableHead>Nombre</TableHead>
                              <TableHead>Estado</TableHead>
                              <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                          </TableHeader>
                          {/* 19. Update the categories table to use pagination */}
                          {/* Replace the categories TableBody with: */}
                          <TableBody>
                            {paginatedCategories.map((category) => (
                              <TableRow key={category.id}>
                                <TableCell>{category.id}</TableCell>
                                <TableCell className="font-medium">{category.nombre}</TableCell>
                                <TableCell>
                                  <Badge variant={category.esActivo ? "default" : "secondary"}>
                                    {category.esActivo ? "Activo" : "Inactivo"}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => startEditCategory(category)}
                                          >
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Editar categoría</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>

                                    {category.esActivo ? (
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="text-red-500"
                                              onClick={() => handleDeleteCategoryWithLoading(category.id)}
                                              disabled={isDeletingCategory === category.id}
                                            >
                                              {isDeletingCategory === category.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                              ) : (
                                                <Trash2 className="h-4 w-4" />
                                              )}
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>Desactivar categoría</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    ) : (
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="text-green-700"
                                              onClick={() => handleReactivateCategoryWithLoading(category.id)}
                                              disabled={isReactivatingCategory === category.id}
                                            >
                                              {isReactivatingCategory === category.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                              ) : (
                                                <RefreshCw className="h-4 w-4" />
                                              )}
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>Reactivar categoría</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </div>
                  )}
                  {/* 15. Add pagination controls for Categories tab */}
                  {/* Add this after the categories table: */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                      Mostrando {paginatedCategories.length} de {categories.length} categorías
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Anterior
                      </Button>
                      <span className="text-sm">
                        Página {currentPage} de {Math.ceil(categories.length / itemsPerPage)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage >= Math.ceil(categories.length / itemsPerPage)}
                      >
                        Siguiente
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Brands Tab */}
            <TabsContent value="brands">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Gestión de Marcas</CardTitle>
                    <CardDescription>Administra las marcas de productos</CardDescription>
                  </div>
                  <Dialog open={isAddBrandOpen} onOpenChange={setIsAddBrandOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Marca
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Agregar Nueva Marca</DialogTitle>
                        <DialogDescription>Completa los detalles de la nueva marca.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div>
                          <Label htmlFor="brand-name">Nombre de la Marca</Label>
                          <Input
                            id="brand-name"
                            value={newBrand.nombre}
                            onChange={(e) => setNewBrand({ ...newBrand, nombre: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="brand-category">Categoría</Label>
                          <Select
                            value={newBrand.id_categoria}
                            onValueChange={(value) => setNewBrand({ ...newBrand, id_categoria: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar categoría" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id.toString()}>
                                  {category.nombre}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddBrandOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleAddBrand}>Guardar Marca</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Diálogo de edición de marca */}
                  <Dialog open={isEditBrandOpen} onOpenChange={setIsEditBrandOpen}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Marca</DialogTitle>
                        <DialogDescription>Modifica los detalles de la marca.</DialogDescription>
                      </DialogHeader>
                      {editingBrand && (
                        <div className="grid gap-4 py-4">
                          <div>
                            <Label htmlFor="edit-brand-name">Nombre de la Marca</Label>
                            <Input
                              id="edit-brand-name"
                              value={editingBrand.nombre}
                              onChange={(e) => setEditingBrand({ ...editingBrand, nombre: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-brand-category">Categoría</Label>
                            <Select
                              value={editingBrand.id_categoria}
                              onValueChange={(value) => setEditingBrand({ ...editingBrand, id_categoria: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar categoría" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.nombre}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditBrandOpen(false)} disabled={isUpdatingBrand}>
                          Cancelar
                        </Button>
                        <Button onClick={handleEditBrand} disabled={isUpdatingBrand}>
                          {isUpdatingBrand ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Guardando...
                            </>
                          ) : (
                            "Guardar Cambios"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  {brands.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No hay marcas disponibles</p>
                    </div>
                  ) : (
                    <div className="overflow-auto">
                      <ScrollArea className="max-h-[1000vh]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>ID</TableHead>
                              <TableHead>Nombre</TableHead>
                              <TableHead className="hidden md:table-cell">Categoría</TableHead>
                              <TableHead>Estado</TableHead>
                              <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                          </TableHeader>
                          {/* 20. Update the brands table to use pagination */}
                          {/* Replace the brands TableBody with: */}
                          <TableBody>
                            {paginatedBrands.map((brand) => (
                              <TableRow key={brand.id}>
                                <TableCell>{brand.id}</TableCell>
                                <TableCell className="font-medium">{brand.nombre}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {categories.find((c) => c.id === brand.id_categoria)?.nombre || "N/A"}
                                </TableCell>
                                <TableCell>
                                  <Badge variant={brand.esActivo ? "default" : "secondary"}>
                                    {brand.esActivo ? "Activo" : "Inactivo"}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger>
                                          <Button variant="ghost" size="icon" onClick={() => startEditBrand(brand)}>
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Editar marca</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>

                                    {brand.esActivo ? (
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="text-red-500"
                                              onClick={() => handleDeleteBrandWithLoading(brand.id)}
                                              disabled={isDeletingBrand === brand.id}
                                            >
                                              {isDeletingBrand === brand.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                              ) : (
                                                <Trash2 className="h-4 w-4" />
                                              )}
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>Desactivar marca</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    ) : (
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="text-green-700"
                                              onClick={() => handleReactivateBrandWithLoading(brand.id)}
                                              disabled={isReactivatingBrand === brand.id}
                                            >
                                              {isReactivatingBrand === brand.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                              ) : (
                                                <RefreshCw className="h-4 w-4" />
                                              )}
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>Reactivar marca</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </div>
                  )}
                  {/* 16. Add pagination controls for Brands tab */}
                  {/* Add this after the brands table: */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                      Mostrando {paginatedBrands.length} de {brands.length} marcas
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Anterior
                      </Button>
                      <span className="text-sm">
                        Página {currentPage} de {Math.ceil(brands.length / itemsPerPage)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage >= Math.ceil(brands.length / itemsPerPage)}
                      >
                        Siguiente
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* 17. Add product detail dialog */}
      {/* Add this at the end of the component, before the return statement closes: */}
      <Dialog open={isProductDetailOpen} onOpenChange={setIsProductDetailOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Detalles del Producto</DialogTitle>
          </DialogHeader>
          {detailProduct && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="rounded-lg overflow-hidden border">
                  <img
                    src={getProductImageUrl(detailProduct) || "/placeholder.svg"}
                    alt={detailProduct.nombre}
                    className="w-full aspect-square object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold">{detailProduct.nombre}</h3>
                  <p className="text-muted-foreground">
                    {detailProduct?.Marca?.nombre || "N/A"} - {detailProduct?.Marca?.Categoria?.nombre || "N/A"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={detailProduct?.esActivo ? "default" : "secondary"}>
                    {detailProduct?.esActivo ? "Activo" : "Inactivo"}
                  </Badge>
                  <p className="text-xl font-bold">${detailProduct.precio}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Descripción:</h4>
                  <p className="text-sm">{detailProduct.descripcion || "Sin descripción"}</p>
                </div>

                {detailProduct.talles && detailProduct.talles.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-1">Talles disponibles:</h4>
                    <div className="flex flex-wrap gap-2">
                      {detailProduct.talles.map((talle, index) => (
                        <Badge key={index} variant="outline">
                          {talle}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {detailProduct.sabores && detailProduct.sabores.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-1">Sabores disponibles:</h4>
                    <div className="flex flex-wrap gap-2">
                      {detailProduct.sabores.map((sabor, index) => (
                        <Badge key={index} variant="outline">
                          {sabor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <Button
                    onClick={() => {
                      setIsProductDetailOpen(false)
                      startEditProduct(detailProduct)
                    }}
                    className="w-full"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Producto
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-black text-white border-t border-gray-800">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3">
                <img src="/Iconos/StoneMarket.png" alt="Stone Market Logo" className="w-12 h-12 md:w-16 md:h-16" />
                <h3 className="text-xl md:text-2xl" style={{ fontFamily: "'Permanent Marker', cursive" }}>
                  STONE MARKET
                </h3>
              </div>
              <p className="text-gray-400 text-sm md:text-base">
                Tu tienda online para zapatillas, vapes y gorras de calidad.
              </p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl mb-3 md:mb-4 flex items-center">
                <Clock className="mr-2 h-4 w-4 md:h-5 md:w-5" /> Horarios
              </h4>
              <p className="text-gray-400 text-sm md:text-base">Lunes a Domingo</p>
              <p className="text-gray-400 text-sm md:text-base">13:00PM a 04:00AM</p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl mb-3 md:mb-4">Contacto</h4>
              <a
                href="https://wa.me/5493518153322"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-gray-200 transition-colors mb-2 text-sm md:text-base"
              >
                <WhatsApp className="mr-2 h-4 w-4 md:h-5 md:w-5" /> +5493518153322
              </a>
              <a
                href="https://instagram.com/stonemarket_cordoba"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-gray-200 transition-colors text-sm md:text-base"
              >
                <Instagram className="mr-2 h-4 w-4 md:h-5 md:w-5" /> stonemarket_cordoba
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} SkartIt. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export { AdminPanel }

