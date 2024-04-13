import React, { useState, useEffect, FormEvent } from "react";
import "@mantine/dates/styles.css";
import OrderStatusIndicator from "../components/OrderStatusIndicator";
import "./OrderPopup.css";
import { IconCircleX } from '@tabler/icons-react';
import { randomId, useDisclosure, useListState } from "@mantine/hooks";
import { Modal, Button, Title, Text, NumberInput, Checkbox, Container, Stepper, Stack, Group, TextInput, Select } from "@mantine/core";
import Order from "./OrderTracking/OrderClass";
import { useAuth } from "../AuthContext";
import "../styles/OrderPopup.css";

const StaffOrderPopup: React.FC<{
    children: React.ReactNode;
    order: Order;
}> = ({ children, order }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [canEdit, setCanEdit] = useState<boolean>(false);
    const [showSubmitButton, setShowSubmitButton] = useState<boolean>(false);
    const { isStaff, currentUser } = useAuth();

    const [editNewborn, setNewborn] = useState<number>(order?.diaperDist[0] || 0);
    const [editSize1, setSize1] = useState<number>(order?.diaperDist[1] || 0);
    const [editSize2, setSize2] = useState<number>(order?.diaperDist[2] || 0);
    const [editSize3, setSize3] = useState<number>(order?.diaperDist[3] || 0);
    const [editSize4, setSize4] = useState<number>(order?.diaperDist[4] || 0);
    const [editSize5, setSize5] = useState<number>(order?.diaperDist[5] || 0);
    const [editSize6, setSize6] = useState<number>(order?.diaperDist[6] || 0);
    const [editStatus, setStatus] = useState<string>(order?.status || "OPEN");


    useEffect(() => {
        if (isStaff || order.status === "OPEN" || order.status === "PLACED") {
            setCanEdit(true);
        }
    }, [isStaff])


    useEffect(() => {
        if (editNewborn != order?.diaperDist[0] || editSize1 != order?.diaperDist[1] || editSize2 != order?.diaperDist[2] || editSize3 != order?.diaperDist[3] || editSize4 != order?.diaperDist[4] || editSize5 != order?.diaperDist[5] || editSize6 != order?.diaperDist[6]) {
            setShowSubmitButton(true);
        } else {
            setShowSubmitButton(false);
        }
    }, [editNewborn, editSize1, editSize2, editSize3, editSize4, editSize5, editSize6])


    const editQuantities = async () => {
        try {
            const token = await currentUser?.getIdToken();

            const body = {
                status: editStatus,
                numDiapers: [editNewborn, editSize1, editSize2, editSize3, editSize4, editSize5, editSize6].reduce((partialSum, a) => partialSum + a, 0),
                newborn: editNewborn,
                size1: editSize1,
                size2: editSize2,
                size3: editSize3,
                size4: editSize4,
                size5: editSize5,
                size6: editSize6,
                orderId: order.id,
            };

            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/order`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(body),
                }
            );

        } catch (error) {
            console.error("Error: " + error);
        }
    };

    async function handleSubmit() {
        try {
            await editQuantities();
            close();
            window.location.reload()
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    function cleanup() {
        setNewborn(order?.diaperDist[0] || 0);
        setSize1(order?.diaperDist[1] || 0);
        setSize2(order?.diaperDist[2] || 0);
        setSize3(order?.diaperDist[3] || 0);
        setSize4(order?.diaperDist[4] || 0);
        setSize5(order?.diaperDist[5] || 0);
        setSize6(order?.diaperDist[6] || 0);
        setStatus(order?.status || "CANCELLED");
        close();
    }

    function statusToViewable(status: string) {
        switch (status) {
            case "OPEN":
            case "PLACED":
                return 'Unreviewed'
            case "APPROVED":
                return 'Approve'
            case "FILLED":
                return "Delivered"
            case "CANCELLED":
                return 'Cancel'
            default:
                return 'Canceled'
        }
    }
    function viewableToStatus(status: string) {
        switch (status) {
            case "Unreviewed":
                return "OPEN"
            case "Approve":
                return "APPROVED"
            case "Delivered":
                return "FILLED"
            case "Cancel":
                return "CANCELLED"
            default:
                return "CANCELLED"
        }
    }



    return (
        <>
            <div onClick={open}>{children}</div>
            <Modal
                opened={opened}
                onClose={cleanup}
                withCloseButton={false}

                centered
                size="xl"
                padding="xl"
                radius="15"
            >
                <div className="order-popup-container">
                    <Title order={2}>Order Details</Title>
                    <div className="popup-staff-column">
                        <div className="popup-staff-left">
                            <div className="order-status-staff">
                                <Title order={4} className="order-status-title">Status</Title>
                                <div className="order-status-content">
                                    <Select
                                        value={statusToViewable(editStatus)}
                                        onChange={(value) => setStatus(value ? viewableToStatus(value) : "CANCELLED")}
                                        data={['Unreviewed', 'Approve', 'Cancel', 'Delivered']}
                                    />
                                </div>
                            </div>

                            <div className="order-info">
                                <Title order={4} className="order-info-title">Order Information</Title>
                                <div className="order-info-content">
                                    <div className="order-info-content-inner">
                                        <Text size="sm">Date</Text>
                                        <Text>{order?.datePlaced.toDateString()}</Text>
                                    </div>
                                    <div className="order-info-content-inner">
                                        <Text size="sm">Diaper Quantity (Total)</Text>
                                        <Text>{order?.numDiapers}</Text>
                                    </div>
                                    <div className="order-info-content-inner">
                                        <Text size="sm">Distribution Center</Text>
                                        {/* TODO: Fix Hardcoded Val */}
                                        <Text>Warehouse</Text>
                                    </div>
                                    <div className="order-info-content-inner">
                                        <Text size="sm">Delivery Instructions</Text>
                                        {/* TODO: Fix Hardcoded Val */}
                                        <Text>Leave at reception</Text>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-info single-order-modal-margin">
                                <Title order={4} >Contact information</Title>
                                <div className="order-contact-content">
                                    <div className="order-contact-content-inner">
                                        <Text size="sm">Phone Number</Text>
                                        <Text>{order?.datePlaced.toDateString()}</Text>
                                    </div>
                                    <div className="order-contact-content-inner">
                                        <Text size="sm">Email</Text>
                                        <Text>{order?.datePlaced.toDateString()}</Text>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="popup-staff-right">


                            <div className="single-order-quantities">
                                <div className="single-order-quantities-heading">
                                    <Title order={4} >Diaper Quantities</Title>
                                    <div className="quantities-header-right-section">
                                        <Text size="sm">Total</Text>
                                        <Text size="md">{order?.numDiapers}</Text>
                                    </div>
                                </div>

                                <div className="order-quantities">
                                    <div className="order-quantities-inner">
                                        <Text size="md" fw={600}>Newborn</Text>
                                        {canEdit ?
                                            <input
                                                type="number"
                                                className="order-popup-input"
                                                value={editNewborn}
                                                onChange={(e) => setNewborn(Number(e.target.value))}
                                            /> :
                                            <Text>{order?.diaperDist[0]}</Text>
                                        }

                                    </div>
                                    <div className="order-quantities-inner">
                                        <Text size="md" fw={600}>Size 1</Text>
                                        {canEdit ?
                                            <input
                                                type="number"
                                                className="order-popup-input"
                                                value={editSize1}
                                                onChange={(e) => setSize1(Number(e.target.value))}
                                            /> :
                                            <Text>{order?.diaperDist[1]}</Text>
                                        }
                                    </div>
                                    <div className="order-quantities-inner">
                                        <Text size="md" fw={600}>Size 2</Text>
                                        {canEdit ?
                                            <input
                                                type="number"
                                                className="order-popup-input"
                                                value={editSize2}
                                                onChange={(e) => setSize2(Number(e.target.value))}
                                            /> :
                                            <Text>{order?.diaperDist[2]}</Text>
                                        }
                                    </div>
                                    <div className="order-quantities-inner">
                                        <Text size="md" fw={600}>Size 3</Text>
                                        {canEdit ?
                                            <input
                                                type="number"
                                                className="order-popup-input"
                                                value={editSize3}
                                                onChange={(e) => setSize3(Number(e.target.value))}
                                            /> :
                                            <Text>{order?.diaperDist[3]}</Text>
                                        }
                                    </div>
                                    <div className="order-quantities-inner">
                                        <Text size="md" fw={600}>Size 4</Text>
                                        {canEdit ?
                                            <input
                                                type="number"
                                                className="order-popup-input"
                                                value={editSize4}
                                                onChange={(e) => setSize4(Number(e.target.value))}
                                            /> :
                                            <Text>{order?.diaperDist[4]}</Text>
                                        }
                                    </div>
                                    <div className="order-quantities-inner">
                                        <Text size="md" fw={600}>Size 5</Text>
                                        {canEdit ?
                                            <input
                                                type="number"
                                                className="order-popup-input"
                                                value={editSize5}
                                                onChange={(e) => setSize5(Number(e.target.value))}
                                            /> :
                                            <Text>{order?.diaperDist[5]}</Text>
                                        }
                                    </div>
                                    <div className="order-quantities-inner">
                                        <Text size="md" fw={600}>Size 6</Text>
                                        {canEdit ?
                                            <input
                                                type="number"
                                                className="order-popup-input"
                                                value={editSize6}
                                                onChange={(e) => setSize6(Number(e.target.value))}
                                            /> :
                                            <Text>{order?.diaperDist[6]}</Text>
                                        }
                                    </div>
                                </div>

                            </div>
                            <div className="submit-button-container-staff">
                                <Button
                                    radius="0.8rem"
                                    size="md"
                                    color="var(--primary-color)"
                                    onClick={handleSubmit}
                                >
                                    Submit Changes
                                </Button>

                            </div>


                        </div>
                    </div>

                </div>
            </Modal >
        </>

    )
};

export default StaffOrderPopup;






















