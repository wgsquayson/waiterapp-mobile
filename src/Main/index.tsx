import { useEffect, useState } from 'react';

import {
  Header,
  Button,
  Cart,
  Categories,
  Menu,
  TableModal,
  Text,
  Centered,
  Icons,
  Loading
} from '../components';

import {
  CategoriesContainer,
  Container,
  Footer,
  MenuContainer
} from './styles';

import { CartItem, Category, Product } from '../types';
import { api } from '../utils';

export function Main () {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isChangingCategory, setIsChangingCategory] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/products')
    ])
      .then(([categoriesResponse, productsResponse]) => {
        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  async function handleSelectCategory(categoryId: string) {
    setIsChangingCategory(true);
    const route = !categoryId ? '/products':  `/categories/${categoryId}/products`;

    const response = await api.get(route);

    setProducts(response.data);
    setIsChangingCategory(false);
  }

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddToCard(product: typeof products[number]) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id);

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product
        });
      }

      const newCartItems = [...prevState];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1
      };

      return newCartItems;

    });
  }

  const handleDecrementFromCard = (product: typeof products[number]) => {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id);

      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);

        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1
      };

      return newCartItems;
    });
  };

  return (
    <>
      <Container edges={['top']}>
        <Header selectedTable={selectedTable} onOrderCancel={handleResetOrder} />

        {
          isLoading
            ? (
              <Loading />
            )
            : (
              <>
                <CategoriesContainer>
                  <Categories onSelectCategory={handleSelectCategory} categories={categories} />
                </CategoriesContainer>
                {
                  products.length > 0
                    ? (
                      <MenuContainer>
                        <Menu
                          isChangingCategory={isChangingCategory}
                          products={products}
                          onAddToCart={handleAddToCard}
                        />
                      </MenuContainer>
                    )
                    : (
                      <Centered>
                        <Icons.Empty />
                        <Text color='#666' style={{ marginTop: 24 }}>Nenhum produto foi encontrado</Text>
                      </Centered>
                    )
                }
              </>
            )
        }

        <Footer>
          {selectedTable
            ? <Cart
              selectedTable={selectedTable}
              cartItems={cartItems}
              onAdd={handleAddToCard}
              onDecrement={handleDecrementFromCard}
              onConfirmOrder={handleResetOrder}
            />
            : <Button
              onPress={() => setIsTableModalVisible(true)}
              disabled={isLoading}
            >
                Novo pedido
            </Button>
          }
        </Footer>
      </Container>
      <TableModal
        onSave={handleSaveTable}
        onClose={() => setIsTableModalVisible(false)}
        visible={isTableModalVisible}
      />
    </>
  );
}
