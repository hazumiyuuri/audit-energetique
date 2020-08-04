import React from 'react';
import Pdf from "react-to-pdf";

const PrintPreview = ({ target, label }) => {
    return (
        <>
            <Pdf targetRef={target} filename="code-example.pdf">
                {({ toPdf }) => <button onClick={toPdf} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">{ label }</button>}
            </Pdf>
        </>
    )
}

export default PrintPreview
