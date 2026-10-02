import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Plus, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Card from '../../components/ui/Card'
import PageWrapper from '../../components/layout/PageWrapper'
import SectionHeader from '../../components/layout/SectionHeader'
import ProductCard from '../../components/features/ProductCard'
import useUIStore from '../../store/uiStore'
import categories from '../../data/categories.json'

const ProductForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { showToast } = useUIStore()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    name: '',
    brand: '',
    category: '',
    subcategory: '',
    description: '',
    price: '',
    originalPrice: '',
    stock: '',
    tags: [],

    // Step 2: Specifications
    specs: [],

    // Step 3: Images
    images: ['', '', '', '', ''],
  })

  const categoriesList = categories

  const specTemplates = {
    Laptops: [
      { name: 'RAM', value: '' },
      { name: 'Storage', value: '' },
      { name: 'Processor', value: '' },
      { name: 'Battery', value: '' },
      { name: 'Weight', value: '' },
      { name: 'Display', value: '' },
    ],
    Headphones: [
      { name: 'Battery Life', value: '' },
      { name: 'Driver Size', value: '' },
      { name: 'Weight', value: '' },
      { name: 'Connectivity', value: '' },
    ],
    Smartphones: [
      { name: 'RAM', value: '' },
      { name: 'Storage', value: '' },
      { name: 'Processor', value: '' },
      { name: 'Battery', value: '' },
      { name: 'Display', value: '' },
      { name: 'Camera', value: '' },
    ],
    Cameras: [
      { name: 'Sensor Size', value: '' },
      { name: 'Megapixels', value: '' },
      { name: 'Video Resolution', value: '' },
      { name: 'Weight', value: '' },
    ],
    Smartwatches: [
      { name: 'Battery Life', value: '' },
      { name: 'Display Size', value: '' },
      { name: 'Water Resistance', value: '' },
      { name: 'Weight', value: '' },
    ],
  }

  const availableTags = ['coding', 'gaming', 'travel', 'student', 'professional', 'senior-friendly']

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...formData.specs]
    newSpecs[index][field] = value
    setFormData((prev) => ({ ...prev, specs: newSpecs }))
  }

  const addSpec = () => {
    setFormData((prev) => ({
      ...prev,
      specs: [...prev.specs, { name: '', value: '' }],
    }))
  }

  const removeSpec = (index) => {
    setFormData((prev) => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index),
    }))
  }

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData((prev) => ({ ...prev, images: newImages }))
  }

  const toggleTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }))
  }

  const handleCategoryChange = (category) => {
    setFormData((prev) => ({
      ...prev,
      category,
      specs: specTemplates[category] || [],
    }))
  }

  const validateStep1 = () => {
    if (!formData.name || !formData.brand || !formData.category || !formData.description || !formData.price || !formData.stock) {
      showToast('Please fill all required fields', 'error')
      return false
    }
    if (parseFloat(formData.price) <= 0) {
      showToast('Price must be greater than 0', 'error')
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (formData.specs.length === 0) {
      showToast('Please add at least one specification', 'error')
      return false
    }
    return true
  }

  const validateStep3 = () => {
    if (!formData.images[0]) {
      showToast('Please add at least one image', 'error')
      return false
    }
    return true
  }

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return
    if (step === 2 && !validateStep2()) return
    if (step === 3 && !validateStep3()) return
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    if (!validateStep3()) return

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Create product object
      const newProduct = {
        id: `p${Date.now()}`,
        name: formData.name,
        brand: formData.brand,
        category: formData.category,
        subcategory: formData.subcategory,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : parseFloat(formData.price),
        discount: formData.originalPrice ? Math.round(((parseFloat(formData.originalPrice) - parseFloat(formData.price)) / parseFloat(formData.originalPrice)) * 100) : 0,
        images: formData.images.filter((img) => img !== ''),
        rating: 0,
        reviewCount: 0,
        inStock: parseInt(formData.stock) > 0,
        seller: { id: 's001', name: 'Your Store', rating: 4.5, verified: true },
        specs: formData.specs.reduce((acc, spec) => {
          if (spec.name && spec.value) {
            acc[spec.name] = spec.value
          }
          return acc
        }, {}),
        tags: formData.tags,
        badges: [],
        trustScore: 75,
        deliveryDays: 3,
        returnPolicy: '10-day returns',
        reviews: [],
        reviewSummary: { pros: [], cons: [], sentiment: 'No reviews yet' },
        needTags: formData.tags,
      }

      // In a real app, this would be saved to a database
      // For now, we'll store it in localStorage
      const sellerProducts = JSON.parse(localStorage.getItem('sellerProducts') || '[]')
      sellerProducts.push(newProduct)
      localStorage.setItem('sellerProducts', JSON.stringify(sellerProducts))

      setLoading(false)
      showToast('Product published successfully!', 'success')
      navigate('/seller/products')
    }, 1500)
  }

  // Preview product object
  const previewProduct = {
    id: 'preview',
    name: formData.name || 'Product Name',
    brand: formData.brand || 'Brand',
    category: formData.category || 'Category',
    price: parseFloat(formData.price) || 0,
    originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : parseFloat(formData.price) || 0,
    discount: formData.originalPrice && formData.price ? Math.round(((parseFloat(formData.originalPrice) - parseFloat(formData.price)) / parseFloat(formData.originalPrice)) * 100) : 0,
    images: formData.images.filter((img) => img !== '') || ['https://via.placeholder.com/400'],
    rating: 0,
    reviewCount: 0,
    inStock: true,
    seller: { id: 's001', name: 'Your Store', rating: 4.5, verified: true },
    specs: formData.specs.reduce((acc, spec) => {
      if (spec.name && spec.value) {
        acc[spec.name] = spec.value
      }
      return acc
    }, {}),
    tags: formData.tags,
    badges: [],
    trustScore: 75,
    deliveryDays: 3,
  }

  return (
    <PageWrapper maxWidth="lg">
      <SectionHeader
        title={id ? 'Edit Product' : 'Add New Product'}
        subtitle="Step {step} of 3"
      />

      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                s <= step ? 'bg-[#1E3A5F] text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {s < step ? <X size={20} /> : s}
            </div>
            {s < 3 && (
              <div className={`w-20 h-1 mx-2 ${s < step ? 'bg-[#1E3A5F]' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      <Card className="p-6 mb-6">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[#1E3A5F]">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Product Name *"
                placeholder="Enter product name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
              <Input
                label="Brand *"
                placeholder="Enter brand name"
                value={formData.brand}
                onChange={(e) => handleInputChange('brand', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                  value={formData.category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  <option value="">Select category</option>
                  {categoriesList.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <Input
                label="Subcategory"
                placeholder="e.g. Gaming, Ultrabook"
                value={formData.subcategory}
                onChange={(e) => handleInputChange('subcategory', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                rows={4}
                placeholder="Describe your product (minimum 200 characters)"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                minLength={200}
              />
              <p className="text-sm text-gray-500 mt-1">{formData.description.length}/200 characters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Price (₹) *"
                type="number"
                placeholder="0"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
              />
              <Input
                label="MRP/Original Price (₹)"
                type="number"
                placeholder="0"
                value={formData.originalPrice}
                onChange={(e) => handleInputChange('originalPrice', e.target.value)}
              />
              <Input
                label="Stock Quantity *"
                type="number"
                placeholder="0"
                value={formData.stock}
                onChange={(e) => handleInputChange('stock', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Use Case Tags</label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      formData.tags.includes(tag)
                        ? 'bg-[#1E3A5F] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Specifications */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[#1E3A5F]">Specifications</h3>

            {formData.specs.map((spec, index) => (
              <div key={index} className="flex gap-4 items-end">
                <div className="flex-1">
                  <Input
                    label="Spec Name"
                    placeholder="e.g. RAM"
                    value={spec.name}
                    onChange={(e) => handleSpecChange(index, 'name', e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    label="Spec Value"
                    placeholder="e.g. 16GB"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                  />
                </div>
                <Button
                  variant="danger"
                  size="md"
                  onClick={() => removeSpec(index)}
                  disabled={formData.specs.length === 1}
                >
                  <X size={18} />
                </Button>
              </div>
            ))}

            <Button variant="outline" onClick={addSpec} className="w-full">
              <Plus size={18} className="mr-2" />
              Add Specification
            </Button>
          </div>
        )}

        {/* Step 3: Images & Review */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[#1E3A5F]">Images & Preview</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.images.map((image, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image {index + 1} {index === 0 && '*'}
                  </label>
                  <Input
                    placeholder="Enter image URL"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <div className="border-t pt-6">
              <h4 className="text-lg font-semibold text-[#1E3A5F] mb-4">Product Preview</h4>
              <div className="max-w-md mx-auto">
                <ProductCard product={previewProduct} variant="grid" />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            <ChevronLeft size={18} className="mr-2" />
            Back
          </Button>

          {step < 3 ? (
            <Button onClick={handleNext}>
              Next
              <ChevronRight size={18} className="ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} loading={loading}>
              Publish Product
            </Button>
          )}
        </div>
      </Card>
    </PageWrapper>
  )
}

export default ProductForm
