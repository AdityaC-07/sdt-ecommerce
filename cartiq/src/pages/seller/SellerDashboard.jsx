import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import Button from '../../components/ui/Button'
import PageWrapper from '../../components/layout/PageWrapper'
import SectionHeader from '../../components/layout/SectionHeader'
import { ROUTES } from '../../constants/routes'

const SellerDashboard = () => {
  const navigate = useNavigate()

  return (
    <PageWrapper maxWidth="lg">
      <SectionHeader
        title="Seller Dashboard"
        action={
          <Button onClick={() => navigate(ROUTES.SELLER_ADD_PRODUCT)}>
            <Plus size={18} className="mr-2" />
            Add Product
          </Button>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-[#1E3A5F]">0</h3>
          <p className="text-gray-600">Total Products</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-[#1E3A5F]">0</h3>
          <p className="text-gray-600">Active Orders</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-[#1E3A5F]">₹0</h3>
          <p className="text-gray-600">Total Revenue</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-[#1E3A5F]">0.0</h3>
          <p className="text-gray-600">Avg Rating</p>
        </div>
      </div>
      <div className="text-center py-12 text-gray-500">
        Get started by adding your first product.
      </div>
    </PageWrapper>
  )
}

export default SellerDashboard
