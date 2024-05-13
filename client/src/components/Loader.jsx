import React from 'react';
import { useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";

function Loader(props) {
    let [loading, setLoading] = useState(true);
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    return (
        <div className="sweet-loading justify-content-center align-items-center">

            <MoonLoader
                color={"#000"}
                loading={loading}
                cssOverride={override}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}

export default Loader;