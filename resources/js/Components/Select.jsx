import React, { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function Select(
    { className = '', isFocused = false, children, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <select
            {...props}
            className={
                'border-gray-300 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-300 focus:border-primary dark:focus:border-primary focus:ring-primary dark:focus:ring-primary rounded-md shadow-sm ' +
                className
            }
            ref={input}
        >
            {children}
        </select>
    );
}); 