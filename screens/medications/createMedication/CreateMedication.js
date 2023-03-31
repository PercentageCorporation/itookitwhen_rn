import React from 'react';
import { CreateProvider } from './CreateProvider';
import CreateSequencer from './CreateSequencer';

export default function CreateMedication() {
  console.log('CreateMedication');

  return(
    <CreateProvider>
      <CreateSequencer />
    </CreateProvider>
  );
}
