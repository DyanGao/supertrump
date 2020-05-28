import styled from "styled-components";
import { Form as FormikForm, Field as FormikField } from "formik";
import { TextField as MatTextField } from "@material-ui/core";

export const Form = styled(FormikForm)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  div {
    padding: 5px;
  }
`;

export const Field = styled(FormikField)`
  &.error {
    border: 1px solid red;
  }
`;

/* export const Label = styled.label`
  width: 130px;
  display: inline-block;
`; */

/* export const Row = styled.div`
  &:nth-child(2n) {
    background-color: #ccc;
  }
`; */

export const Error = styled.div`
  color: red;
`;

export const TextField = styled(MatTextField)`
  width: 400px;
` as typeof MatTextField;
