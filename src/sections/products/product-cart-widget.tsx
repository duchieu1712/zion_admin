import Iconify from "../../components/iconify/iconify";
import { ThemePropsCustom } from "../../theme";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }: { theme?: ThemePropsCustom }) => ({
  zIndex: 999,
  right: 0,
  display: "flex",
  cursor: "pointer",
  position: "fixed",
  alignItems: "center",
  top: theme?.spacing(16),
  height: theme?.spacing(5),
  paddingLeft: theme?.spacing(2),
  paddingRight: theme?.spacing(2),
  paddingTop: theme?.spacing(1.25),
  boxShadow: theme?.customShadows.z20,
  color: theme?.palette.text.primary,
  backgroundColor: theme?.palette.background.paper,
  borderTopLeftRadius: Number(theme?.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme?.shape.borderRadius) * 2,
  transition: theme?.transitions.create("opacity"),
  "&:hover": { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function CartWidget() {
  return (
    <StyledRoot>
      <Badge showZero badgeContent={0} color="error" max={99}>
        <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
      </Badge>
    </StyledRoot>
  );
}
