import { Modal, Button, ActionIcon, Title, NumberInput, Checkbox, Container, Stepper, Stack, Group } from "@mantine/core";
import "@mantine/dates/styles.css";
import { IconCircleFilled, IconPencil } from "@tabler/icons-react";

// Size: xs | sm | md | lg | xl | xxl | xxxl
export default function OrderStatusIndicator({ status, size = "md" }: { status: string, size: string }) {

    function getDotSize() {
        switch (size) {
            case "xs":
                return "0.5rem";
            case "sm":
                return "0.6rem";
            case "md":
                return "0.7rem";
            case "lg":
                return "0.75rem";
            case "xl":
                return "0.8rem";
            default:
                return "0.5rem"
        }
    }

    function getIndicator() {
        switch (status) {
            case "OPEN":
            case "PLACED":
                return (
                    <Button
                        leftSection={<IconCircleFilled size={getDotSize()} />}
                        variant="light" color="indigo"
                        size={size}
                        radius="xl"
                    >
                        Unreviewed
                    </Button>
                );
            case "APPROVED":
                return (
                    <Button
                        leftSection={<IconCircleFilled size={getDotSize()} />}
                        variant="light"
                        color="yellow"
                        size={size}
                        radius="xl"
                    >
                        In Progress
                    </Button >
                );
            case "FILLED":
                return (
                    <Button
                        leftSection={<IconCircleFilled size={getDotSize()} />}
                        variant="light"
                        color="green"
                        size={size}
                        radius="xl"
                    >
                        Delivered
                    </Button>
                );
            case "CANCELLED":
                return (
                    <Button
                        leftSection={<IconCircleFilled size={getDotSize()} />}
                        variant="light"
                        color="red"
                        size={size}
                        radius="xl"
                    >
                        Cancelled
                    </Button>
                );
            default:
                return status;
        }
    }
    return (
        getIndicator()
    );
}
