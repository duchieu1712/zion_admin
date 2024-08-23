export const customStyles = {
  option: (
    provider: any,
    { isFocused, isSelected }: { isFocused: boolean; isSelected: boolean },
  ) => ({
    ...provider,
    backgroundColor: isSelected ? "#5142FC" : isFocused ? "#5142FC" : "#3C3C56",
    "&:active": {
      backgroundColor: isFocused ? "#5142FC" : "#000",
    },
    // '&:hover': {
    //   background: isSelected ? '#5142FC' : 'none',
    //   border: isSelected ? 'none' : '1px solid #fff',
    // },
  }),
  menu: (provider: any, _: any) => ({
    ...provider,
    backgroundColor: "#3C3C56",
    width: "100%",
    height: "100%",
    color: "#fff",
    padding: 0,
    borderColor: " #3C3C56",
    zIndex: "1111",
    margin: "1px",
    broder: "1px solid #3C3C56",
  }),
  control: (provided: any, _: any) => ({
    // none of react-select's styles are passed to <Control />
    ...provided,
    background: "transparent",
    width: "100%",
    broder: "1px solid #3C3C56",
    borderColor: "#3C3C56",
    borderRadius: "8px",
    "&:hover": {
      borderColor: " #3C3C56",
    },
    height: "56px",
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    const marginLeft = 0;

    return { ...provided, opacity, transition, marginLeft };
  },
};
