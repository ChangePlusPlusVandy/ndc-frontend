import React, { useState, useEffect } from "react";
import { Title, Container } from "@mantine/core";

import OrderFormDiaperSize from "./OrderFormDiaperSize";

type RequestProps = {
    newborn: string | number;
    setNewborn: React.Dispatch<React.SetStateAction<string | number>>;
    size1: string | number;
    setSize1: React.Dispatch<React.SetStateAction<string | number>>;
    size2: string | number;
    setSize2: React.Dispatch<React.SetStateAction<string | number>>;
    size3: string | number;
    setSize3: React.Dispatch<React.SetStateAction<string | number>>;
    size4: string | number;
    setSize4: React.Dispatch<React.SetStateAction<string | number>>;
    size5: string | number;
    setSize5: React.Dispatch<React.SetStateAction<string | number>>;
    size6: string | number;
    setSize6: React.Dispatch<React.SetStateAction<string | number>>;
};

const OrderFormRequest: React.FC<RequestProps> = ({
    newborn,
    setNewborn,
    size1,
    setSize1,
    size2,
    setSize2,
    size3,
    setSize3,
    size4,
    setSize4,
    size5,
    setSize5,
    size6,
    setSize6,
}: RequestProps) => {
    return (
        <>
            <Container bg="white">
                <Title ta="center" m="lg">
                    Request Diapers
                </Title>
                <OrderFormDiaperSize
                    amount={newborn}
                    setAmount={setNewborn}
                    typeName="Newborn Diapers"
                />
                <OrderFormDiaperSize
                    amount={size1}
                    setAmount={setSize1}
                    typeName="Size 1"
                />
                <OrderFormDiaperSize
                    amount={size2}
                    setAmount={setSize2}
                    typeName="Size 2"
                />
                <OrderFormDiaperSize
                    amount={size3}
                    setAmount={setSize3}
                    typeName="Size 3"
                />
                <OrderFormDiaperSize
                    amount={size4}
                    setAmount={setSize4}
                    typeName="Size 4"
                />
                <OrderFormDiaperSize
                    amount={size5}
                    setAmount={setSize5}
                    typeName="Size 5"
                />
                <OrderFormDiaperSize
                    amount={size6}
                    setAmount={setSize6}
                    typeName="Size 6"
                />
            </Container>
        </>
    );
};

export default OrderFormRequest;
