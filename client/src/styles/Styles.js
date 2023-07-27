const Styles = {
  Modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    width: 500,
    p: 4,
    borderRadius: 2,
  },
  Avatar: {
    width: 200,
    height: 200,
    cursor: "pointer",
    transition: "opacity 0.3s",
    "&:hover": {
      opacity: 0.7,
    },
  },
  SearchTextField: {
    mr: 3,
    "& label": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      color: "white",
      "&.Mui-focused fieldset": {
        border: "1px solid white",
      },
      fieldset: {
        border: "1px solid white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
    },
  },
  AutoComplete: {
    mt: 3,
    "& .MuiAutocomplete-inputRoot": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "black",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "black",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        color: "black",
        borderColor: "black",
      },
    },
    "& .MuiAutocomplete-input": {
      color: "black",
    },
    "& .MuiInputLabel-outlined": {
      color: "black",
    },
    "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
      color: "black",
    },
    "&.Mui-focused .MuiInputLabel-outlined": {
      color: "black",
    },
  },
};

export default Styles;
