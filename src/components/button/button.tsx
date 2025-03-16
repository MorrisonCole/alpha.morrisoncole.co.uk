import { styled } from "@pigment-css/react";
import React from "react";

const StyledButton = styled.button`
  border-radius: 3px;
  padding: 0.5rem;
  background: hsla(0, 0%, 25%, 0.6);
  color: hsl(0, 0%, 100%);
  border: 2px solid white;
  margin-left: 1.5rem;
  margin-top: 1.5rem;
  min-width: max-content;

  &:hover {
    filter: brightness(1.2);
  }
`;

type ButtonProps = React.ComponentProps<"button">;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);
