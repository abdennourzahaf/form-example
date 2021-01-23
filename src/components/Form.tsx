import React, { useState } from 'react';
import formatBytes from '../helpers/format-bytes';

// 5 MB
const maxFilesSize = 5242880;

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess('');
    setError('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess('form submitted');
    }, 4000);
  };

  const handleDragEvent = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    handleDragLeave(event);
    handleFilesUpload(event.dataTransfer.files);
  };

  const handleDragEnter = (event: React.DragEvent<HTMLLabelElement>) => {
    handleDragEvent(event);
    setIsDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    handleDragEvent(event);
    setIsDragActive(false);
  };

  const removeFile = (i: number) => {
    setUploadedFiles((uploadedFiles) => [
      ...uploadedFiles.slice(0, i),
      ...uploadedFiles.slice(i + 1),
    ]);
  };

  const handleFilesUpload = (files: FileList) => {
    if (uploadedFiles.length + files.length > 5) {
      setError('You can not upload more than 5 files');
      return;
    }
    let empty = Array(files.length).fill(0);
    if (
      empty.reduce((acc, _, i) => acc + files[i].size, 0) +
        uploadedFiles.reduce((acc, f) => acc + f.size, 0) >
      maxFilesSize
    ) {
      setError('Maximum files size is 5Mb');
      return;
    }
    if (empty.some((_, i) => !files[i].name.match(/\.(jpg|jpeg|png|pdf)$/i))) {
      setError('only the following formats are accepted ‘.pdf, .png, .jpg’');
      return;
    }

    setError('');

    setUploadedFiles((uploaded) => {
      return [...uploaded, ...files];
    });
  };

  return (
    <form action='POST' onSubmit={handleSubmit} className='space-y-3'>
      <input
        onChange={({ target }) => setName(target.value)}
        value={name}
        type='text'
        name='name'
        id='name'
        placeholder='Name'
        className='border-black border-2 p-2 rounded-lg focus:ring-1 focus:ring-blue-400 focus:border-blue-400 outline-none transition duration-200 w-full'
      />
      <input
        onChange={({ target }) => setEmail(target.value)}
        value={email}
        type='email'
        name='email'
        id='email'
        placeholder='Email'
        className='border-black border-2 p-2 rounded-lg focus:ring-1 focus:ring-blue-400 focus:border-blue-400 outline-none transition duration-200 w-full'
      />
      <div className='relative'>
        <input
          onChange={({ target }) => setPassword(target.value)}
          value={password}
          type={isPasswordVisible ? 'text' : 'password'}
          name='password'
          id='password'
          placeholder='Password'
          className='border-black border-2 p-2 rounded-lg focus:ring-1 focus:ring-blue-400 focus:border-blue-400 outline-none transition duration-200 w-full'
        />
        {password && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 469.333 469.333'
            height='24'
            width='24'
            className='absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer'
            onClick={() => setIsPasswordVisible((state) => !state)}>
            <g>
              <g>
                <g>
                  <path d='M234.667,170.667c-35.307,0-64,28.693-64,64s28.693,64,64,64s64-28.693,64-64S269.973,170.667,234.667,170.667z' />
                  <path d='M234.667,74.667C128,74.667,36.907,141.013,0,234.667c36.907,93.653,128,160,234.667,160     c106.773,0,197.76-66.347,234.667-160C432.427,141.013,341.44,74.667,234.667,74.667z M234.667,341.333     c-58.88,0-106.667-47.787-106.667-106.667S175.787,128,234.667,128s106.667,47.787,106.667,106.667     S293.547,341.333,234.667,341.333z' />
                </g>
              </g>
            </g>
          </svg>
        )}
      </div>
      <textarea
        onChange={({ target }) => setMessage(target.value)}
        value={message}
        name='message'
        id='message'
        placeholder='Message'
        className='border-black border-2 p-2 rounded-lg focus:ring-1 focus:ring-blue-400 focus:border-blue-400 outline-none transition duration-200 w-full'
      />
      <div className='w-full h-32 border-2 border-black focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 focus-within:border-solid border-dashed rounded-xl flex flex-col justify-center items-center relative'>
        <label
          htmlFor='files'
          className='h-full w-full outline-none absolute cursor-pointer'
          onDrag={handleDragEvent}
          onDragStart={handleDragEvent}
          onDragLeave={handleDragLeave}
          onDragEnd={handleDragLeave}
          onDragOver={handleDragEnter}
          onDragEnter={handleDragEnter}
          onDrop={handleDrop}></label>
        <input
          type='file'
          name='files'
          id='files'
          multiple
          onChange={({ target: { files } }) =>
            files && handleFilesUpload(files)
          }
          className='opacity-0 pointer-events-none absolute'
        />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className={`h-8 w-8 ${isDragActive && 'animate-bounce'}`}>
          <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
          <polyline points='17 8 12 3 7 8'></polyline>
          <line x1='12' y1='3' x2='12' y2='15'></line>
        </svg>
        <span className='text-sm mt-1'>Click to Upload or Drag and Drop</span>
        <span className='text-sm'>(pdf, png, jpg) up to 5Mb</span>
      </div>
      {uploadedFiles.map(({ name, size }, i) => (
        <div key={i} className='flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            className='inline transform rotate-12	'>
            <path d='M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z' />
          </svg>
          <span className=''>
            {(name.length > 30
              ? name.substr(0, 10) + '...' + name.substr(name.length - 15)
              : name) +
              ' (' +
              formatBytes(size) +
              ')'}
          </span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='28px'
            viewBox='0 0 24 24'
            width='28px'
            className='inline cursor-pointer ml-auto'
            onClick={() => removeFile(i)}>
            <path d='M12,4c-4.419,0-8,3.582-8,8s3.581,8,8,8s8-3.582,8-8S16.419,4,12,4z M15.707,14.293c0.391,0.391,0.391,1.023,0,1.414  C15.512,15.902,15.256,16,15,16s-0.512-0.098-0.707-0.293L12,13.414l-2.293,2.293C9.512,15.902,9.256,16,9,16  s-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414L10.586,12L8.293,9.707c-0.391-0.391-0.391-1.023,0-1.414  s1.023-0.391,1.414,0L12,10.586l2.293-2.293c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414L13.414,12L15.707,14.293z' />
          </svg>
        </div>
      ))}
      {error && (
        <div className='border-2 border-red-600 text-red-600 text-center rounded-lg p-1 bg-red-100  w-full'>
          {error}
        </div>
      )}
      {success && (
        <div className='border-2 border-green-600 text-green-600 text-center rounded-lg p-1 bg-green-100  w-full'>
          {success}
        </div>
      )}
      <button className='h-12 border-2 border-blue-500 rounded-lg p-1 bg-blue-500 hover:text-blue-500 w-full text-lg text-white hover:bg-white transition-colors duration-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black'>
        {isSubmitting ? (
          <svg className='h-8 w-8 mx-auto animate-spin' viewBox='0 0 50 50'>
            <circle
              className='animate-dash stroke-current'
              cx='25'
              cy='25'
              r='20'
              fill='none'
              strokeWidth='5'></circle>
          </svg>
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
};

export default Form;
