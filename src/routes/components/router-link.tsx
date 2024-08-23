import { Link, LinkProps } from "react-router-dom";

import { forwardRef } from "react";

interface RouterLinkProps
  extends Omit<
    React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>,
    "href"
  > {
  href: string;
}

// ----------------------------------------------------------------------

const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(({ href, ...other }, ref) => (
  <Link ref={ref} to={href} {...other} />
));

export default RouterLink;
