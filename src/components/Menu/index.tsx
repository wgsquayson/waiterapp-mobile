import { useState } from 'react';
import { FlatList } from 'react-native';

import {
  Product,
  ProductImage,
  ProductDetails,
  Divider,
  AddToCartButton
} from './styles';

import { Product as ProductType } from '../../types';

import { Text } from '../Text';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { Loading } from '../Loading';

import { formatCurrency } from '../../utils';

type MenuProps = {
  onAddToCart: (product: ProductType) => void;
  products: ProductType[];
  isChangingCategory: boolean;
}

export function Menu({
  onAddToCart,
  products,
  isChangingCategory
}: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  function handleOpenModal(product: ProductType) {
    setSelectedProduct(product);
    setIsModalVisible(true);
  }

  if (isChangingCategory) {
    return <Loading />;
  }

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 34 }}
        style={{ marginTop: 32 }}
        data={products}
        keyExtractor={product => product._id}
        ItemSeparatorComponent={Divider}
        renderItem={({ item: product }) => (
          <Product onPress={() => handleOpenModal(product)}>
            <ProductImage
              source={{ uri: `http://192.168.15.165:3001/uploads/${product.imagePath}` }}
            />
            <ProductDetails>
              <Text weight='600'>{product.name}</Text>
              <Text
                size={14}
                color='#666'
                style={{ marginVertical: 8 }}
              >{product.description}</Text>
              <Text size={14} weight='600'>{formatCurrency(product.price)}</Text>
              <AddToCartButton hitSlop={12} onPress={() => onAddToCart(product)}>
                <PlusCircle />
              </AddToCartButton>
            </ProductDetails>
          </Product>
        )}
      />
      <ProductModal
        onAddToCart={onAddToCart}
        product={selectedProduct}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
}
