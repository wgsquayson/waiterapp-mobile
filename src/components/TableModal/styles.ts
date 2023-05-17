import styled from 'styled-components/native';

export const Overlay = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: stretch;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 0 24px;
`;

export const ModalBody = styled.View`
  background-color: #FAFAFA;
  border-radius: 8px;
  padding: 24px;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ModalForm = styled.View`
  margin-top: 32px;
`;

export const Input = styled.TextInput`
  padding: 16px;
  background-color: #FFF;
  border: 1px solid rgba(204, 204, 204, 0.5);
  border-radius: 8px;
  margin-bottom: 24px;
`;
