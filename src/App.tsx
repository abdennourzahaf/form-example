import React from 'react';
import Form from './components/Form';

const App = () => {
  return (
    <div className='flex justify-center items-center h-screen bg-gray-300'>
      <div className='bg-white rounded-lg p-6 w-11/12 sm:max-w-md'>
        <h1 className='mb-4 font-semibold text-3xl'>Contact us</h1>
        <Form />
      </div>
    </div>
  );
};

export default App;
