import { Fab as MatFab } from "@material-ui/core";
import styled from "styled-components";

export const Fab = styled(MatFab)`
  &&& {
    position: fixed;
    bottom: 0;
    left: 50%;
    margin-bottom: 20px;
    transform: translateX(-50%);
  }
`;
