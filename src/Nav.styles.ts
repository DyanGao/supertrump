import styled from "styled-components";
import { Toolbar as MatToolbar } from "@material-ui/core";

export const Toolbar = styled(MatToolbar)`
  &&& {
    display: flex;
    justify-content: space-between;
  }
  button {
    margin-left: 16px;
    color white;
  }
` as typeof MatToolbar;
