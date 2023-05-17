import { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

import { CartItem, Product } from '../../types';
import {
  Actions,
  Image,
  Item,
  ProductContainer,
  QuantityContainer,
  Summary,
  TotalContainer
} from './styles';

import { Text } from '../Text';
import { Button } from '../Button';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { Icons } from '../Icons';

import { api, formatCurrency } from '../../utils';

type CartProps = {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
}

export function Cart({
  cartItems,
  onAdd,
  onDecrement,
  onConfirmOrder,
  selectedTable
}: CartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const total = cartItems.reduce((acc, {product, quantity}) => {
    return acc + product.price * quantity;
  }, 0);

  async function handleConfirmOrder() {
    const payload = {
      table: selectedTable,
      products: cartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity
      }))
    };

    setIsLoading(true);

    await api.post('/orders', payload);

    setIsModalVisible(true);
    setIsLoading(false);
  }

  function handleOk() {
    setIsModalVisible(false);
    onConfirmOrder();
  }

  return (
    <>
      <OrderConfirmedModal visible={isModalVisible} onClose={handleOk} />
      {
        cartItems.length > 0 && (
          <FlatList
            data={cartItems}
            style={{ marginBottom: 20, maxHeight: 150 }}
            keyExtractor={cartItem => cartItem.product._id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: cartItem }) => (
              <Item>
                <ProductContainer>
                  <Image
                    source={{ uri: `http://192.168.15.165:3001/uploads/${cartItem.product.imagePath}` }}
                  />
                  <QuantityContainer>
                    <Text size={14} color='#666'>{cartItem.quantity}x</Text>
                  </QuantityContainer>
                  <View>
                    <Text size={14} weight='600'>{cartItem.product.name}</Text>
                    <Text
                      size={14}
                      color='#666'
                      style={{ marginTop: 4 }}
                    >
                      {formatCurrency(cartItem.product.price)}
                    </Text>
                  </View>
                </ProductContainer>
                <Actions>
                  <TouchableOpacity
                    style={{ marginRight: 24 }}
                    onPress={() => onAdd(cartItem.product)}
                  >
                    <Icons.PlusCircle />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                    <Icons.MinusCircle />
                  </TouchableOpacity>
                </Actions>
              </Item>
            )}
          />
        )
      }

      <Summary>
        <TotalContainer>
          {cartItems.length > 0
            ? (
              <>
                <Text color='#666'>Total</Text>
                <Text
                  size={20}
                  weight='600'>
                  {formatCurrency(total)}
                </Text>
              </>
            )
            : <Text color='#999'>Seu carrinho está vazio</Text>
          }
        </TotalContainer>
        <Button
          loading={isLoading}
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}>
            Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
