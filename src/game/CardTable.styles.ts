import styled, { css } from "styled-components";

export const Td = styled.td`
  padding: 5px 0;
`;

interface TrProps {
  active?: boolean;
  darkMode: boolean;
}

export const Tr = styled.tr`
  ${(props: TrProps) =>
    props.darkMode &&
    css`
      &:nth-child(2n) {
        background-color: #666;
      }
    `}
  ${(props: TrProps) =>
    !props.darkMode &&
    css`
      &:nth-child(2n) {
        background-color: #ddd;
      }
    `}
  :hover {
    background-color: ligthblule;
  }
  ${(props: TrProps) =>
    props.active &&
    css`
      &&& {
        background-color: yellow;
      }
    `}
`;
