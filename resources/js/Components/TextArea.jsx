import React, { forwardRef } from 'react';

export default forwardRef(function TextArea({ className = '', ...props }, ref) {
  return (
    <textarea
      {...props}
      ref={ref}
      className={
        'input ' +
        className
      }
    />
  );
}); 