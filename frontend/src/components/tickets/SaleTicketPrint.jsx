import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Table } from "flowbite-react";

const SaleTicketPrint = ({}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { sale_ticket } = location.state || {};

    useEffect(() => {
        window.print();
        navigate("/tickets/sale-ticket");
    }, []);

    return (
        <div className="w-full">
            <h1 className="font-bold text-center text-3xl pt-4">Happy Land</h1>
            <div>
                <p className="text-center my-4">تذكرة ألعاب</p>
            </div>
            <div>
                <p className="text-center my-4">التاريخ: {sale_ticket.date}</p>
            </div>
            <div className="table-wrapper overflow-x-auto w-full">
                <Table className="min-w-[400px]" border={"1px"}>
                    <Table.Head className="text-right">
                        <Table.HeadCell className="border border-black">
                            اسم اللعبة
                        </Table.HeadCell>
                        <Table.HeadCell className="border border-black">
                            السعر
                        </Table.HeadCell>
                        <Table.HeadCell className="border border-black">
                            الكمية
                        </Table.HeadCell>
                        <Table.HeadCell className="border border-black">
                            الإجمالى
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        {sale_ticket?.items?.map((item) => (
                            <Table.Row
                                key={item.id}
                                className="mb-8 text-right"
                            >
                                <Table.Cell className="border border-black">
                                    <label className="mx-4">
                                        {item.game.name}
                                    </label>
                                </Table.Cell>
                                <Table.Cell className="border border-black">
                                    <label>{item.game.price} جنيه</label>
                                </Table.Cell>
                                <Table.Cell className="border border-black">
                                    <label>{item.amount}</label>
                                </Table.Cell>
                                <Table.Cell className="border border-black">
                                    <label>{item.total_price} جنيه</label>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
            <div className="totals text-base text-center">
                <div className="mt-8">
                    <label>
                        الإجمالى :{" "}
                        <span className="mx-3">
                            {sale_ticket.total_price} جنيه
                        </span>
                    </label>
                </div>
                <div>
                    <label>
                        نسبة الخصم :{" "}
                        <span className="mx-3">{sale_ticket.discount} %</span>
                    </label>
                </div>
                <div>
                    <label>
                        الصافى :{" "}
                        <span className="mx-3">
                            {sale_ticket.after_discount} جنيه
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default SaleTicketPrint;
