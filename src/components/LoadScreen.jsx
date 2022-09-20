import React from 'react'
import { ScaleLoader } from 'react-spinners'

const LoadScreen = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <ScaleLoader color="black" /></div>
    )
}

export default LoadScreen