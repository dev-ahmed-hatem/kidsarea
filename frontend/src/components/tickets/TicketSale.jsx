import React, { useState, useEffect } from "react";
import { Label, TextInput, Table, Datepicker, Button } from "flowbite-react";
import Loading from "../groups/Loading";
import ViewGroup from "../groups/ViewGroup";
import TableGroup from "../groups/TableGroup";
import { MdEdit, MdDelete } from "react-icons/md";
import TablePagination from "../groups/TablePagination";
import endpoints from "../../config/config";
import ConfirmDelete from "../groups/ConfirmDelete";
import { useDrawer } from "../../providers/DrawerProvider";
import { FaPrint, FaMoneyBill, FaPercent } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { FcInvite } from "react-icons/fc";
import { defaultFormSubmission, fetch_list_data } from "../../config/actions";
import { useToast } from "../../providers/ToastProvider";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const TicketForm = ({ postURL, defaultValues, callBack }) => {
    const navigate = useNavigate();

    // edit date modification
    const [date, setDate] = useState(
        defaultValues
            ? new Date(defaultValues?.date).toLocaleDateString("en-CA")
            : null
    );

    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [post, setPost] = useState(false);
    const { showToast } = useToast();
    const {
        handleSubmit,
        trigger,
        formState: { errors },
        setError,
        reset,
    } = useForm({
        defaultValues: {
            ...defaultValues,
            game: defaultValues?.game?.id,
        },
    });
    const formFunction = defaultValues ? "edit" : "add";
    const [games, setGames] = useState(null);

    const [selectedGames, setSelectedGames] = useState([]);
    const [discount, setDiscount] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [discountPercent, setDiscountPercent] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);

    useEffect(() => {
        calculateTotalPrice();
    }, [selectedGames, discount, discountPercent]);

    const handleGameChange = (game, amount) => {
        setSelectedGames((prev) => {
            const exists = prev.find((g) => g.id === game.id);
            if (exists) {
                return prev.map((g) =>
                    g.id === game.id ? { ...g, amount: amount || g.amount } : g
                );
            } else {
                return [...prev, { ...game, amount: amount || 1 }];
            }
        });
    };

    const handleCheckboxChange = (game) => {
        setSelectedGames((prev) => {
            const exists = prev.find((g) => g.id === game.id);
            if (exists) {
                return prev.filter((g) => g.id !== game.id);
            } else {
                return [...prev, { ...game, amount: 1 }];
            }
        });
    };

    const calculateTotalPrice = () => {
        const total = selectedGames.reduce(
            (acc, game) => acc + game.price * game.amount,
            0
        );
        setTotalPrice(total);
        if (discount && discountPercent > 0) {
            setDiscountedPrice(total - total * (discountPercent / 100));
        } else {
            setDiscountedPrice(total);
        }
    };

    const onSubmit = () => {
        const ticketData =
            formFunction == "add"
                ? {
                      games: selectedGames.map((game) => ({
                          game_id: game.id,
                          amount: game.amount,
                          total_price: game.price * game.amount,
                      })),
                      total_price: discountedPrice,
                      discount: discountPercent,
                      after_discount: discountedPrice,
                  }
                : {
                      date: date,
                  };

        defaultFormSubmission({
            url: postURL,
            data: ticketData,
            formFunction: formFunction,
            setPost: setPost,
            showToast: showToast,
            message: { add: "تم إضافة التذكرة", edit: "تم تعديل التذكرة" },
            reset: reset,
            callBack: callBack,
            onSuccess: (response) => {
                if (formFunction == "add") {
                    navigate("/sale-ticket-print", {
                        state: { sale_ticket: response.data },
                    });
                }
            },
            setError: setError,
        });
    };

    const get_current_games = () => {
        fetch_list_data({
            searchURL: `${endpoints.game_list}no_pagination=true`,
            setData: setGames,
            setFetchError: setFetchError,
            setLoading: setIsLoading,
        });
    };

    useEffect(() => {
        get_current_games();
    }, []);

    return (
        <div
            className={`wrapper p-4 my-8 bg-white rounded border-t-4 border-primary shadow-lg`}
        >
            <h1 className="font-bold text-text text-lg">
                {formFunction == "add"
                    ? "بيع تذكرة"
                    : "تعديل تاريخ تذكرة مباعة"}
            </h1>
            <hr className="h-px my-3 bg-gray-200 border-0"></hr>
            <form
                className="fields flex gap-x-10 gap-y-6 flex-wrap"
                onSubmit={handleSubmit(onSubmit)}
            >
                {isLoading ? (
                    <Loading className={`w-full text-center`} />
                ) : fetchError ? (
                    <p className="text-lg text-center text-red-600 py-4 w-full m-auto">
                        خطأ في تحميل البيانات
                    </p>
                ) : (
                    <>
                        {formFunction == "add" ? (
                            <div className="w-full lg:w-3/4">
                                <div className="table-wrapper overflow-x-auto w-full">
                                    <Table className="min-w-[400px]">
                                        <Table.Head className="text-right">
                                            <Table.HeadCell>
                                                اختر
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                اسم اللعبة
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                السعر
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                الكمية
                                            </Table.HeadCell>
                                        </Table.Head>
                                        <Table.Body>
                                            {games.map((game) => (
                                                <Table.Row
                                                    key={game.id}
                                                    className="mb-8 text-right"
                                                >
                                                    <Table.Cell>
                                                        <input
                                                            type="checkbox"
                                                            id={`game_${game.id}`}
                                                            onChange={() =>
                                                                handleCheckboxChange(
                                                                    game
                                                                )
                                                            }
                                                            checked={
                                                                !!selectedGames.find(
                                                                    (g) =>
                                                                        g.id ===
                                                                        game.id
                                                                )
                                                            }
                                                        />
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <label
                                                            htmlFor={`game_${game.id}`}
                                                            className="mx-4"
                                                        >
                                                            {game.name}
                                                        </label>
                                                    </Table.Cell>
                                                    <Table.Cell className="min-w-[230px]">
                                                        <TextInput
                                                            id="price"
                                                            type="number"
                                                            className="inline-block me-4"
                                                            rightIcon={
                                                                FaMoneyBill
                                                            }
                                                            placeholder="السعر"
                                                            color={"primary"}
                                                            value={game.price}
                                                            disabled
                                                        />
                                                    </Table.Cell>
                                                    <Table.Cell className="min-w-[230px]">
                                                        <TextInput
                                                            id="amount"
                                                            type="number"
                                                            className="inline-block"
                                                            rightIcon={FcInvite}
                                                            placeholder="العدد"
                                                            color={
                                                                errors.amount
                                                                    ? "failure"
                                                                    : "primary"
                                                            }
                                                            value={
                                                                selectedGames.find(
                                                                    (g) =>
                                                                        g.id ===
                                                                        game.id
                                                                )
                                                                    ? selectedGames.find(
                                                                          (g) =>
                                                                              g.id ===
                                                                              game.id
                                                                      ).amount
                                                                    : 0
                                                            }
                                                            onChange={(e) =>
                                                                handleGameChange(
                                                                    game,
                                                                    parseInt(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                )
                                                            }
                                                            onBlur={() =>
                                                                trigger(
                                                                    "amount"
                                                                )
                                                            }
                                                            disabled={
                                                                !selectedGames.find(
                                                                    (g) =>
                                                                        g.id ===
                                                                        game.id
                                                                )
                                                            }
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))}
                                        </Table.Body>
                                    </Table>
                                </div>
                                <div className="totals text-base">
                                    <div className="my-6">
                                        <label>
                                            الإجمالى : {totalPrice.toFixed(2)}{" "}
                                            جنيه
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="me-4"
                                                checked={discount}
                                                onChange={() =>
                                                    setDiscount(!discount)
                                                }
                                            />
                                            الخصم
                                        </label>
                                    </div>
                                    {discount && (
                                        <>
                                            <div className="mb-6">
                                                <label>
                                                    نسبة الخصم :
                                                    <TextInput
                                                        id="discount"
                                                        type="number"
                                                        className="inline-block mx-3"
                                                        rightIcon={FaPercent}
                                                        placeholder="الخصم"
                                                        color={"primary"}
                                                        value={discountPercent}
                                                        onChange={(e) =>
                                                            setDiscountPercent(
                                                                parseFloat(
                                                                    e.target
                                                                        .value
                                                                ) || 0
                                                            )
                                                        }
                                                        min={0}
                                                        max={100}
                                                    />
                                                </label>
                                            </div>

                                            <div>
                                                <label>
                                                    الصافى :{" "}
                                                    {discountedPrice.toFixed(2)}{" "}
                                                    جنيه
                                                </label>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="w-full lg:max-w-md lg:w-[30%]">
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="start_date"
                                        value="تاريخ بدأ الاشتراك :"
                                    />
                                </div>
                                <Datepicker
                                    id="start_date"
                                    language="ar"
                                    labelClearButton="مسح"
                                    labelTodayButton="اليوم"
                                    placeholder="تاريخ بدأ الاشتراك"
                                    color={"primary"}
                                    onSelectedDateChanged={(date) => {
                                        setDate(
                                            date.toLocaleDateString("en-CA")
                                        );
                                    }}
                                    defaultDate={
                                        defaultValues?.date
                                            ? new Date(defaultValues?.date)
                                            : new Date()
                                    }
                                />
                            </div>
                        )}
                        <div className="flex flex-wrap max-h-12 min-w-full justify-center">
                            <Button
                                type="submit"
                                color={
                                    formFunction == "add" ? "primary" : "accent"
                                }
                                disabled={
                                    formFunction == "edit"
                                        ? false
                                        : post || selectedGames.length == 0
                                }
                                className="w-32 h-10 flex justify-center items-center"
                                size={"xl"}
                                isProcessing={post}
                                processingSpinner={
                                    <AiOutlineLoading className="h-6 w-6 animate-spin" />
                                }
                            >
                                {formFunction == "edit" ? "تعديل" : "طباعة"}
                            </Button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};

const TicketSale = () => {
    const navigate = useNavigate();
    const current_user = JSON.parse(localStorage.getItem("auth_user"));

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
        const searchURL = `${endpoints.sale_ticket}${
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
                postURL={endpoints.sale_ticket}
                callBack={get_current_tickets}
            />

            {/* table data */}
            <ViewGroup title={`التذاكر المباعة يوم  ${date}`}>
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
                                        <Table.HeadCell>الصافى</Table.HeadCell>
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
                                                        {ticket.after_discount ? (
                                                            ticket.after_discount
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
                                                                    navigate(
                                                                        "/sale-ticket-print",
                                                                        {
                                                                            state: {
                                                                                sale_ticket:
                                                                                    ticket,
                                                                            },
                                                                        }
                                                                    );
                                                                }}
                                                            />
                                                            <MdEdit
                                                                className="text-accent-700 cursor-pointer"
                                                                onClick={() => {
                                                                    handleDrawer(
                                                                        "edit",
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

export default TicketSale;
