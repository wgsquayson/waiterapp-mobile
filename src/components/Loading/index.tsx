import { ActivityIndicator } from 'react-native';
import { Centered } from '../Centered';

export function Loading() {
  return (
    <Centered>
      <ActivityIndicator size='large' color='#D73035' />
    </Centered>
  );
}
