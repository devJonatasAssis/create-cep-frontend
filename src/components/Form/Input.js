import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

export default function Input({ name, placeholder, ...rest }) {
    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: "value",
        });
    }, [fieldName, registerField]);
    return (
        <div>
            <input
                ref={inputRef}
                placeholder={placeholder}
                {...rest}
                style={{ borderWidth: 1, borderColor: error ? "red" : "#FFF" }}
            />
            {error && <span style={{ color: "#f00" }}>{error}</span>}
        </div>
    );
}
