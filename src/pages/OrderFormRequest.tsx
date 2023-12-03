import React, { useState, useEffect } from "react";
import {
    Title,
    Container,
} from "@mantine/core";

import OrderFormDiaperSize from "./OrderFormDiaperSize";

const OrderFormRequest: React.FC = () => {
    const [newbornSizeAmount, setNewbornSizeAmount] = useState<string | number>(
        1
    );
    const [sizeOneAmount, setSizeOneAmount] = useState<string | number>(1);
    const [sizeTwoAmount, setSizeTwoAmount] = useState<string | number>(1);
    const [sizeThreeAmount, setSizeThreeAmount] = useState<string | number>(1);
    const [sizeFourAmount, setSizeFourAmount] = useState<string | number>(1);
    const [sizeFiveAmount, setSizeFiveAmount] = useState<string | number>(1);
    const [sizeSixAmount, setSizeSixAmount] = useState<string | number>(1);
    return (
        <>
            <Container bg="white">
                <Title ta="center" m="lg">
                    Request Diapers
                </Title>
                <OrderFormDiaperSize
                    amount={newbornSizeAmount}
                    setAmount={setNewbornSizeAmount}
                    typeName="Newborn Diapers"
                />
                <OrderFormDiaperSize
                    amount={sizeOneAmount}
                    setAmount={setSizeOneAmount}
                    typeName="Size 1"
                />
                <OrderFormDiaperSize
                    amount={sizeTwoAmount}
                    setAmount={setSizeTwoAmount}
                    typeName="Size 2"
                />
                <OrderFormDiaperSize
                    amount={sizeThreeAmount}
                    setAmount={setSizeThreeAmount}
                    typeName="Size 3"
                />
                <OrderFormDiaperSize
                    amount={sizeFourAmount}
                    setAmount={setSizeFourAmount}
                    typeName="Size 4"
                />
                <OrderFormDiaperSize
                    amount={sizeFiveAmount}
                    setAmount={setSizeFiveAmount}
                    typeName="Size 5"
                />
                <OrderFormDiaperSize
                    amount={sizeSixAmount}
                    setAmount={setSizeSixAmount}
                    typeName="Size 6"
                />
            </Container>
        </>
    );
};

export default OrderFormRequest;
