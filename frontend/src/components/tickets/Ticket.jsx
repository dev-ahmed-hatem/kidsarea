import React, { useState, useEffect } from "react";
import { Label, Table, Datepicker } from "flowbite-react";
import Loading from "../groups/Loading";
import ViewGroup from "../groups/ViewGroup";
import TableGroup from "../groups/TableGroup";
import { MdEdit, MdDelete } from "react-icons/md";
import TablePagination from "../groups/TablePagination";
import endpoints from "../../config/config";
import TicketForm from "./TicketForm";
import { fetch_list_data } from "../../config/actions";
import ConfirmDelete from "../groups/ConfirmDelete";
import { useDrawer } from "../../providers/DrawerProvider";
import { FaPrint } from "react-icons/fa";
import { printTicket } from "./utils";

const Ticket = () => {
    //////////////////////////////// providers ////////////////////////////////
    const { showDrawer, closeDrawer } = useDrawer();

    //////////////////////////////// list data ////////////////////////////////
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));
    const [searchParam, setSearchParam] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const handleDrawer = (drawerFunction, item) => {
        if (drawerFunction == "edit") {
            showDrawer(
                "تعديل تذكرة",
                MdEdit,
                <TicketForm
                    postURL={item.url}
                    defaultValues={item}
                    callBack={() => {
                        get_current_tickets();
                        closeDrawer();
                    }}
                />
            );
        } else {
            showDrawer(
                "حذف تذكرة",
                MdDelete,
                <>
                    <ConfirmDelete
                        deleteURL={item.url}
                        deletePrompt={"هل أنت متأكد تريد حذف التذكرة؟"}
                        itemName={""}
                        closeDrawer={closeDrawer}
                        callBack={() => {
                            setSearchParam(null);
                            setPageNumber(null);
                            get_current_tickets();
                        }}
                        toastMessage={"تم حذف التذكرة بنجاح"}
                    />
                </>
            );
        }
    };

    const get_current_tickets = () => {
        const searchURL = `${endpoints.ticket_list}${
            searchParam ? `&search=${searchParam}` : ""
        }${pageNumber ? `&page=${pageNumber}` : ""}${
            date ? `&date=${date}` : ""
        }
        `;

        fetch_list_data({
            searchURL: searchURL,
            setData: setData,
            setFetchError: setFetchError,
            setLoading: setLoading,
        });
    };

    useEffect(() => {
        get_current_tickets();
    }, [searchParam, pageNumber, date]);

    return (
        <>
            {/* add form */}
            <TicketForm
                postURL={endpoints.ticket_list}
                callBack={get_current_tickets}
            />

            {/* table data */}
            <ViewGroup title={`تذاكر يوم  ${date}`}>
                {loading ? (
                    <Loading />
                ) : fetchError ? (
                    <p className="text-lg text-center text-red-600 py-4">
                        خطأ في تحميل البيانات
                    </p>
                ) : (
                    <>
                        <div className="w-full lg:max-w-md mb-5">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="birth_date"
                                    value="التاريخ  :"
                                />
                            </div>
                            <Datepicker
                                id="birth_date"
                                language="ar"
                                labelClearButton="مسح"
                                labelTodayButton="اليوم"
                                placeholder="تاريخ الميلاد"
                                color={"primary"}
                                onSelectedDateChanged={(date) => {
                                    setDate(date.toLocaleDateString("en-CA"));
                                }}
                            />
                        </div>
                        <TableGroup
                            onChange={(event) => {
                                setSearchParam(event.target.value);
                                setPageNumber(1);
                            }}
                        >
                            {data.count == 0 ? (
                                <Table.Body>
                                    <Table.Row className="text-lg text-center text-gray-800 py-3 font-bold bg-red-500">
                                        <Table.Cell>لا توجد بيانات</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            ) : (
                                <>
                                    <Table.Head>
                                        <Table.HeadCell>
                                            رقم التذكرة
                                        </Table.HeadCell>
                                        <Table.HeadCell>اللعبة</Table.HeadCell>
                                        <Table.HeadCell>السعر</Table.HeadCell>
                                        <Table.HeadCell>الكمية</Table.HeadCell>
                                        <Table.HeadCell>
                                            الإجمالى
                                        </Table.HeadCell>
                                        <Table.HeadCell>التاريخ</Table.HeadCell>
                                        <Table.HeadCell>إجراءات</Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body>
                                        {data.results.map((ticket) => {
                                            return (
                                                <Table.Row
                                                    key={ticket.id}
                                                    className="bg-white font-medium text-gray-900"
                                                >
                                                    <Table.Cell>
                                                        {ticket.id ? (
                                                            ticket.id
                                                        ) : (
                                                            <span className="text-red-600">
                                                                غير مسجل
                                                            </span>
                                                        )}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {ticket.game?.name ? (
                                                            ticket.game?.name
                                                        ) : (
                                                            <span className="text-red-600">
                                                                غير مسجل
                                                            </span>
                                                        )}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {ticket.game?.price ? (
                                                            ticket.game?.price
                                                        ) : (
                                                            <span className="text-red-600">
                                                                غير مسجل
                                                            </span>
                                                        )}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {ticket.amount ? (
                                                            ticket.amount
                                                        ) : (
                                                            <span className="text-red-600">
                                                                غير مسجل
                                                            </span>
                                                        )}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {ticket.total_price ? (
                                                            ticket.total_price
                                                        ) : (
                                                            <span className="text-red-600">
                                                                غير مسجل
                                                            </span>
                                                        )}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {ticket.date ? (
                                                            ticket.date
                                                        ) : (
                                                            <span className="text-red-600">
                                                                غير مسجل
                                                            </span>
                                                        )}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <span className="flex text-xl gap-x-3">
                                                            <FaPrint
                                                                className="text-accent cursor-pointer"
                                                                onClick={() => {
                                                                    printTicket(
                                                                        ticket
                                                                    );
                                                                }}
                                                            />
                                                            <MdEdit
                                                                className="text-accent cursor-pointer"
                                                                onClick={() => {
                                                                    handleDrawer(
                                                                        "edit",
                                                                        ticket
                                                                    );
                                                                }}
                                                            />
                                                            <MdDelete
                                                                className="text-secondary cursor-pointer"
                                                                onClick={() => {
                                                                    handleDrawer(
                                                                        "delete",
                                                                        ticket
                                                                    );
                                                                }}
                                                            />
                                                        </span>
                                                    </Table.Cell>
                                                </Table.Row>
                                            );
                                        })}
                                    </Table.Body>
                                </>
                            )}
                        </TableGroup>

                        {data.total_pages > 1 && (
                            <TablePagination
                                totalPages={data.total_pages}
                                currentPage={data.current_page}
                                onPageChange={(page) => {
                                    setPageNumber(page);
                                }}
                            />
                        )}
                    </>
                )}
            </ViewGroup>
        </>
    );
};

export default Ticket;
