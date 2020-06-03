import {
  Fab as MatFab,
  Paper as MatPaper,
  Grid as MatGrid,
} from "@material-ui/core";
import { compose, spacing, css } from "@material-ui/system";
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

export const Paper = styled(MatPaper)`
  ${css(compose(spacing))}
` as any;

export const Grid = styled(MatGrid)`
  ${css(spacing)}
` as any;

export const Count = styled.div`
  margin-top: 8px;
  font-size: 12px;
  rgba(0,0,0,0.54);
`;
