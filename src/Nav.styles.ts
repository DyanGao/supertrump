import styled from "styled-components";
import { Toolbar as MatToolbar } from "@material-ui/core";

export const Toolbar = styled(MatToolbar)`
  &&& {
    display: flex;
    justify-content: space-between;
  }
` as typeof MatToolbar;
