type StaffOrderPadProps = {
    text: string;
};

const StaffOrderPad: React.FC<StaffOrderPadProps> = (props) => {
    return (
        <div className="margin-pad">
            <div className="grey-background order-b order-width">
                {props.text}
                <h2>100</h2>
            </div>
            <div className="grey-background order-bo">
                Order

            </div>
            <div className="grey-background order-bo">
                Order
            </div>
            <div className="grey-background order-bo">
                Order
            </div>
        </div>
    )
}

export default StaffOrderPad;
