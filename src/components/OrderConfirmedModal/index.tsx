import { Modal, ModalProps } from 'react-native';
import { Container, OkButton } from './styles';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';

type OrderConfirmedModalProps = ModalProps & {
  onClose: () => void
}

export function OrderConfirmedModal({
  onClose,
  ...props
}: OrderConfirmedModalProps) {
  return (
    <Modal
      {...props}
      animationType='fade'
    >
      <Container>
        <CheckCircle />
        <Text
          style={{ marginTop: 12 }}
          size={20}
          weight='600'
          color='#FFF'
        >
          Pedido confirmado
        </Text>
        <Text
          style={{ marginTop: 4 }}
          color='#FFF'
          opacity={0.9}
        >
          O pedido já entrou na fila de produção
        </Text>
        <OkButton onPress={onClose}>
          <Text color="#d73035" weight='600'>OK</Text>
        </OkButton>
      </Container>
    </Modal>
  );
}
