import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { Text } from '../Text';
import { Container } from './styles';

type ButtonProps = TouchableOpacityProps & {
  children: string;
  loading?: boolean;
}

export function Button({ children, loading, ...props }: ButtonProps) {
  return (
    <Container  {...props} disabled={props.disabled || loading}>
      {loading
        ? <ActivityIndicator color='#FFF' />
        : <Text weight='600' color='#FFF'>{children}</Text>
      }
    </Container>
  );
}
