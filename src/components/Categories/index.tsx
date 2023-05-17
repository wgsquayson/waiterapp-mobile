import { FlatList } from 'react-native';
import { useState } from 'react';

import { Text } from '../Text';
import { Category, Icon } from './styles';
import { Category as CategoryType } from '../../types';

type CategoriesProps = {
  categories: CategoryType[];
  onSelectCategory: (categoryId: string) => Promise<void>;
}

export function Categories({ categories, onSelectCategory }: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectCategory(categoryId: string) {
    if (categoryId === selectedCategory) {
      setSelectedCategory('');
      onSelectCategory('');
      return;
    }

    setSelectedCategory(categoryId);
    onSelectCategory(categoryId);
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 24 }}
      data={categories}
      keyExtractor={category => category._id}
      renderItem={({ item: category }) => (
        <Category
          isSelected={category._id === selectedCategory}
          onPress={() => handleSelectCategory(category._id)}
        >
          <Icon>
            <Text>{category.icon}</Text>
          </Icon>
          <Text size={14} weight='600'>{category.name}</Text>
        </Category>
      )}
    />
  );
}
