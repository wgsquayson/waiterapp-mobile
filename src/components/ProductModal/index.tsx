import { FlatList, Modal, ModalProps, View } from 'react-native';
import {
  CloseButton,
  Footer,
  FooterContainer,
  Image,
  Ingredient,
  IngredientsContainer,
  ModalBody
} from './styles';

import { Product } from '../../types';

import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { Button } from '../Button';

import { formatCurrency } from '../../utils';

type ProductModalProps = ModalProps & {
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product) => void;
};

export function ProductModal({
  onClose,
  product,
  onAddToCart,
  ...props
}: ProductModalProps ) {
  if (!product) return null;

  function handleAddToCard() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    onAddToCart(product!);

    onClose();
  }

  return (
    <Modal
      {...props}
      animationType='slide'
      presentationStyle='pageSheet'
      onRequestClose={onClose}
    >
      <Image source={{ uri: `http://192.168.15.165:3001/uploads/${product.imagePath}` }}>
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>
      <ModalBody>
        <Text weight='600' size={24}>{product.name}</Text>
        <Text
          color='#666'
          style={{ marginTop: 8 }}
        >
          {product.description}
        </Text>
        {product.ingredients.length > 0 &&
          <IngredientsContainer>
            <Text weight='600' color='#666'>Ingredientes</Text>
            <FlatList
              style={{ marginTop: 16 }}
              data={product.ingredients}
              keyExtractor={ingredient => ingredient._id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: ingredient }) => (
                <Ingredient>
                  <Text>{ingredient.icon}</Text>
                  <Text
                    size={14}
                    color='#666'
                    style={{ marginLeft: 20 }}
                  >
                    {ingredient.name}
                  </Text>
                </Ingredient>
              )}
            />
          </IngredientsContainer>
        }
      </ModalBody>
      <Footer>
        <FooterContainer>
          <View>
            <Text color='#666'>Preço</Text>
            <Text
              weight='700'
              size={20}
            >
              {formatCurrency(product.price)}
            </Text>
          </View>
          <Button onPress={handleAddToCard}>
            Adicionar ao pedido
          </Button>
        </FooterContainer>
      </Footer>
    </Modal>
  );
}
