import React, { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextArea(
    { className = '', isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <textarea
            {...props}
            className={
                'border-gray-300 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-300 focus:border-primary dark:focus:border-primary focus:ring-primary dark:focus:ring-primary rounded-md shadow-sm ' +
                className
            }
            ref={input}
        />
    );
}); 