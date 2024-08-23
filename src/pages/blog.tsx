import BlogView from "../sections/blog/view/blog-view";
import { Helmet } from "react-helmet-async";

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Blog | Zion Admin </title>
      </Helmet>

      <BlogView />
    </>
  );
}
