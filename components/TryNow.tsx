"use client";

import Button from "@mui/material/Button";

export default function TryNow( {size, className}: {size: "small" | "medium" | "large"; className?: string} ) {

    const handleClick = () => {
        console.log("Try Now");
    }


    return (
        <Button
            onClick={handleClick}
            variant="contained"
            size={size}
            className={className}
        >
            TRY NOW
        </Button>
    );
}
