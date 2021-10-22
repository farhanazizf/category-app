import { ListItem, ListItemButton, Collapse, Card } from "@mui/material";
import styled from "styled-components/macro";

const Styled = {
  FlexContainer: styled.div`
    display: flex;
    flex-wrap: wrap;
  `,
  Card: styled(Card)`
    margin: 20px;
  `,
  ListParent: styled(ListItem)`
    &&& {
      max-width: 70%;
    }
  `,
  ListFirst: styled(ListItemButton)`
    &&& {
      // max-width: 70%;
      ul {
        padding-left: 20px;
      }
      div.MuiListItemText-root {
        padding-left: 20px;
      }
    }
  `,
  CollapseFirst: styled(Collapse)`
    padding-left: 20px;
  `,
};

export default Styled;
