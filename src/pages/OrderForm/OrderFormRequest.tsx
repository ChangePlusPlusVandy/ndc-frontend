import React, { useState, useEffect } from "react";
import { Title, Container, Stack } from "@mantine/core";

import OrderFormDiaperSize from "./OrderFormDiaperSize";

type RequestProps = {
    sizes: any;
    setSizes: any;
};

const OrderFormRequest: React.FC<RequestProps> = ({
    sizes,
    setSizes,
}: RequestProps) => {
    const updateSize = (name: string, value: any) => {
        setSizes((prevSize: any) => ({ ...prevSize, [name]: value }));
    };

    return (
        <>
            <Container bg="white">
                <Title ta="center" m="lg">
                    Request Diapers
                </Title>
                <OrderFormDiaperSize
                    typeName="Newborn Diapers"
                    keyName="newborn"
                    updateSize={updateSize}
                    initialSize={sizes.newborn}
                />
                <OrderFormDiaperSize
                    typeName="Size 1"
                    keyName="size1"
                    updateSize={updateSize}
                    initialSize={sizes.size1}
                />
                <OrderFormDiaperSize
                    typeName="Size 2"
                    keyName="size2"
                    updateSize={updateSize}
                    initialSize={sizes.size2}
                />
                <OrderFormDiaperSize
                    typeName="Size 3"
                    keyName="size3"
                    updateSize={updateSize}
                    initialSize={sizes.size3}
                />
                <OrderFormDiaperSize
                    typeName="Size 4"
                    keyName="size4"
                    updateSize={updateSize}
                    initialSize={sizes.size4}
                />
                <OrderFormDiaperSize
                    typeName="Size 5"
                    keyName="size5"
                    updateSize={updateSize}
                    initialSize={sizes.size5}
                />
                <OrderFormDiaperSize
                    typeName="Size 6"
                    keyName="size6"
                    updateSize={updateSize}
                    initialSize={sizes.size6}
                />
            </Container>
        </>
    );
};

export default OrderFormRequest;
