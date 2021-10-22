import React from "react";
import { Container } from "@mui/material";
// import Styled from "./style";
// import BasicMenu from "../../components/headers";
import ButtonAppBar from "../../components/appbar";

const MainPage: React.FC = () => {
  return (
    <Container maxWidth="xl">
      {/* <BasicMenu /> */}
      <ButtonAppBar />
    </Container>
  );
};

export default MainPage;
