import { SxProps, Theme } from "@mui/material/styles";

export const tableHeaderStyles: SxProps<Theme> = {
    backgroundColor: "#2596be", 
    color: "white", 
    fontWeight: "bold",
    textAlign: "center",
    border: "1px solid black"
};
export const tableCellStyles: SxProps<Theme> = {
    textAlign: "center", 
    border: "1px solid black", 
};


export const tableRowStyles: SxProps<Theme> = {
    border: "1px solid black",
};

export const buttonStyles: SxProps<Theme> = {
  backgroundColor: "green",
  color: "white",
  borderRadius: "20px",
  textTransform: "none",
  width: "100px",
  "&:hover": { backgroundColor: "darkgreen" },
};

export const redButtonStyles: SxProps<Theme> = {
  ...buttonStyles,
  backgroundColor: "red",
  "&:hover": { backgroundColor: "darkred" },
};

export const inputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
    },
  };
  
  
