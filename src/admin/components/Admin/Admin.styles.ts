import { Paper as MatPaper } from "@material-ui/core";
import { compose, spacing, css } from "@material-ui/system";
import styled from "styled-components";

export const Paper = styled(MatPaper)`
  ${css(compose(spacing))}
` as any;
