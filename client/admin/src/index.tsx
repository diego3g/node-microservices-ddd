import * as React from 'react';
import styled from 'styled-components';

export interface ILabelProps {
  labelWidth?: number;
}

export interface InputWithLabelProps extends ILabelProps {
  id?: string;
  label?: string;
}

export interface InputWithoutLabelProps extends ILabelProps {
  id: string;
  label: string;
}

export type InputLabelProps = InputWithLabelProps | InputWithoutLabelProps;

export interface InputProps {
  name?: string;
  type?: string;
}

const Wrapper = styled.div`
  display: flex;
  margin: 10px;
`;

const Label = styled.label`
  margin-right: 10px;
  font-weight: bold;
  width: ${(props: ILabelProps) => props.labelWidth || 100}px;
`;

const NativeInput = styled.input`
  width: 100%;
`;

export const Input: React.SFC<InputProps & InputLabelProps> = ({
  label,
  id,
  labelWidth,
  ...rest
}) => (
  <Wrapper>
    {label && (
      <Label labelWidth={labelWidth} htmlFor={id}>
        {label}:
      </Label>
    )}
    <NativeInput id={id} {...rest} />
  </Wrapper>
);

Input.defaultProps = {
  type: 'text',
};
