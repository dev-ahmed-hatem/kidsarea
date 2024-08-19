import React from "react";

const TicketCard = ({ ticket }) => {
    return (
        <div className="border-2 flex flex-col gap-y-3 border-primary rounded-lg w-full md:min-w-40 md:w-[47%] lg:max-w-lg lg:min-w-60 p-4">
            <p className="text-primary-900 font-bold">تذكرة لعبة</p>
            <p>
                رقم التذكرة :{" "}
                <span className="text-primary font-bold ms-2">{ticket.id}</span>
            </p>
            <p>
                اللعبة :{" "}
                <span className="text-primary font-bold ms-2">
                    {ticket?.game?.name}
                </span>
            </p>
            <p>
                السعر :{" "}
                <span className="text-primary font-bold ms-2">
                    {ticket?.game?.price} جنيه
                </span>
            </p>
            <p>
                الكمية :{" "}
                <span className="text-primary font-bold ms-2">
                    {ticket?.amount}
                </span>
            </p>
            <p>
                الإجمالى :{" "}
                <span className="text-primary font-bold ms-2">
                    {ticket?.total_price} جنيه
                </span>
            </p>
            <p>
                التاريخ :{" "}
                <span className="text-primary font-bold ms-2">
                    {ticket?.date}
                </span>
            </p>
        </div>
    );
};

export default TicketCard;
