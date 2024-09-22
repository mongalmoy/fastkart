import "@/styles/app/product/productStyle.css";
import Navigationbar from '@/components/NavigationBar/navigationbar'
import Pageflow from '@/components/pageflow/pageflow'

const ProductLayout = ({children}) => {
  return (
    <>
      <Navigationbar />
      <div className="page_body">
        <div>
          <Pageflow />
          {children}
        </div>
      </div>
    </>
  )
}

export default ProductLayout