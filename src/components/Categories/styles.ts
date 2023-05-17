import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Category = styled.TouchableOpacity<{ isSelected: boolean; }>`
  align-items: center;
  margin-left: 24px;
  opacity: ${props => props.isSelected ? 1 : 0.5};
`;

export const Icon = styled.View`
  background: #FFF;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, ${Platform.OS === 'android' ? 1 : 0.1});
  elevation: 2;
`;
