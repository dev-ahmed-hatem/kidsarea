import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SaleTicketPrint = ({}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { sale_ticket } = location.state || {};

    useEffect(() => {
        setTimeout(() => {
            window.print();
            // setTimeout(() => {
            //     navigate("/tickets/sale-ticket");
            // }, 500);
        }, 2000);
    }, []);

    return (
        <div className="w-[24mm] text-[8px] py=[10mm] px-0 mx-auto my-0 text-center">
            {/* Logo */}
            <img
                src="./logo.jpeg"
                alt="Logo"
                className="w-16 inline-block rounded-full"
            />
            <p className="text-center my-2">تذكرة ألعاب</p>
            <p className="text-center mt-1">{sale_ticket.date}</p>

            <table className="text-center text-[6px] font-ligh my-5 w-full">
                <thead>
                    <tr>
                        <th className="h-8 text-center border-[0.5px] border-black">
                            اللعبة
                        </th>
                        <th className="h-8 text-center border-[0.5px] border-black">
                            السعر
                        </th>
                        <th className="h-8 text-center border-[0.5px] border-black">
                            إجمالى
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* Table Body */}
                    {sale_ticket?.items?.map((item, index) => (
                        <tr key={index}>
                            <td className="h-8 text-center border-[0.5px] border-black">
                                {item.game.name}
                            </td>
                            <td className="h-8 text-center border-[0.5px] border-black">
                                {Number.parseInt(item.game.price)}
                            </td>
                            <td className="h-8 text-center border-[0.5px] border-black">
                                {item.total_price}
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td className="h-8 text-center border border-black">
                            إجمالى
                        </td>
                        <td
                            className="h-8 text-center border border-black"
                            colSpan={2}
                        >
                            {sale_ticket.total_price} جنيه
                        </td>
                    </tr>
                    <tr>
                        <td className="h-8 text-center border border-black">
                            الخصم
                        </td>
                        <td
                            className="h-8 text-center border border-black"
                            colSpan={2}
                        >
                            {sale_ticket.discount} %
                        </td>
                    </tr>
                    <tr>
                        <td className="h-8 text-center border border-black">
                            إجمالى
                        </td>
                        <td
                            className="h-8 text-center border border-black"
                            colSpan={2}
                        >
                            {sale_ticket.after_discount} جنيه
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SaleTicketPrint;
