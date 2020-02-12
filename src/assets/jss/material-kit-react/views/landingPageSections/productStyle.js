import { title } from "assets/jss/material-kit-react.js";




const productStyle = {
  section: {
    padding: "70px 0",
    textAlign: "center"
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  description: {
    color: "#999"
  },
  buttonWide: {
    width: "120px",
    marginTop: "50px"
  },
  select: {
    width: "90%",
    marginTop: "25px"
  },
  contentCard: {
    border: "3px solid #4CAF50",
    borderTop: "50px solid #4CAF50",
    borderRadius: "10px 10px 0px 0px",
    paddingBottom: "30px",
    paddingTop: "20px",
    paddingRight: "15px",
    margin: "5px",
    marginTop: "20px",
    boxShadow: "0px 10px 8px -1px rgba(214,214,214,1)"
  },
  numbering: {
    marginLeft: "0",
    marginTop: "-70px",
    fontWeight: "500",
    textAlign: "left"
  },
  delete: {
    marginRight: "-30px",
    marginTop: "-75px",
    fontWeight: "500",
    textAlign: "right"
  },
  imageRaised: {
    boxShadow: "0px 5px 4px -1px rgba(214,214,214,1)"
  }
};

export default productStyle;
