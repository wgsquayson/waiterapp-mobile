import styled from 'styled-components/native';

export const Image = styled.ImageBackground`
  width: 100%;
  height: 200px;
  align-items: flex-end;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  margin: 24px;
`;

export const ModalBody = styled.View`
  flex:1;
  background-color: #FAFAFA;
  padding: 32px 24px 0;
`;

export const IngredientsContainer = styled.View`
 flex: 1;
  margin-top: 32px;
`;

export const Ingredient = styled.View`
  align-items: center;
  flex-direction: row;
  border: 1px solid rgba(204, 204, 204, 0.3);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 4px;
`;

export const Footer = styled.View`
  min-height: 110px;
  background-color: #FFF;
  padding: 16px 24px;
`;

export const FooterContainer = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

