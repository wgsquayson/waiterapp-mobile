import { useState } from 'react';
import { Modal, ModalProps, Platform, TouchableOpacity } from 'react-native';

import { Input, ModalBody, ModalForm, ModalHeader, Overlay } from './styles';

import { Text } from '../Text';
import { Close } from '../Icons/Close';
import { Button } from '../Button';

type TableModalProps = ModalProps & {
  onSave: (table: string) => void;
  onClose: () => void;
}

export function TableModal({ onClose, onSave, ...props }: TableModalProps) {
  const [table, setTable] = useState('');

  function handleClose() {
    onClose();

    setTable('');
  }

  function handleSave() {
    onSave(table);

    handleClose();
  }

  return (
    <Modal
      transparent
      animationType='fade'
      {...props}
    >
      <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ModalBody>
          <ModalHeader>
            <Text weight='600'>Informe a mesa</Text>
            <TouchableOpacity hitSlop={12} onPress={handleClose}>
              <Close color='#666' />
            </TouchableOpacity>
          </ModalHeader>

          <ModalForm>
            <Input
              keyboardType='number-pad'
              placeholder='Número da mesa'
              placeholderTextColor='#666'
              autoFocus
              onChangeText={setTable}
            />
            <Button disabled={!table} onPress={handleSave}>Salvar</Button>
          </ModalForm>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
