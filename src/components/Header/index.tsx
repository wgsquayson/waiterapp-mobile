import { TouchableOpacity } from 'react-native';

import { Text } from '../Text';
import { Container, Content, OrderHeader, Table } from './styles';

type HeaderProps = {
  selectedTable?: string;
  onOrderCancel: () => void;
}

export function Header({ selectedTable, onOrderCancel }: HeaderProps) {
  return (
    <Container>
      {
        selectedTable
          ? (
            <Content>
              <OrderHeader>
                <Text size={24} weight='600'>Pedido</Text>
                <TouchableOpacity onPress={onOrderCancel}>
                  <Text color='#D73035' weight='600' size={14}>cancelar pedido</Text>
                </TouchableOpacity>
              </OrderHeader>
              <Table>
                <Text color='#666'>Mesa {selectedTable}</Text>
              </Table>
            </Content>
          )
          : (
            <>
              <Text size={14} opacity={0.9}>Bem-vindo(a) ao</Text>
              <Text weight='700' size={24}>WAITER<Text size={24}>APP</Text></Text>
            </>
          )
      }
    </Container>
  );
}
