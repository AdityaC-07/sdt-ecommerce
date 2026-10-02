import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import Button from '../../components/ui/Button'
import PageWrapper from '../../components/layout/PageWrapper'
import SectionHeader from '../../components/layout/SectionHeader'
import { ROUTES } from '../../constants/routes'

const ProductListing = () => {
  const navigate = useNavigate()

  return (
    <PageWrapper maxWidth="lg">
      <SectionHeader
        title="My Products"
        action={
          <Button onClick={() => navigate(ROUTES.SELLER_ADD_PRODUCT)}>
            <Plus size={18} className="mr-2" />
            Add Product
          </Button>
        }
      />
      <div className="text-center py-12 text-gray-500">
        No products listed yet. Click "Add Product" to get started.
      </div>
    </PageWrapper>
  )
}

export default ProductListing
