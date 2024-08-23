import { Helmet } from "react-helmet-async";
import ProductsView from "../sections/products/view/products-view";

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Products | Zion Admin </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
