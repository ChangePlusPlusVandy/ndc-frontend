import React, { useState } from 'react';
import SliderWhite from "../components/SliderWhite";
import "../CSS/RequestDiaper.css";

const RequestDiaper: React.FC = () => {
    const [result, setResult] = useState<String[]>([]);

    const addToResult = (element: any) => {
        setResult(result => [...result, element]);
    };

    const handleSubmit = () => {
        console.log(result);
        return result;
    }

    return <div className='flex flex-col center'>
        <h1>Request Diapers</h1>
        <div>
            <SliderWhite addToResult={addToResult}/>
            <SliderWhite addToResult={addToResult}/>
            <SliderWhite addToResult={addToResult}/>
            <SliderWhite addToResult={addToResult}/>
            <SliderWhite addToResult={addToResult}/>
            <SliderWhite addToResult={addToResult}/>
        </div>
        <button onClick={handleSubmit}>Submit</button>
    </div>;
}

export default RequestDiaper;
