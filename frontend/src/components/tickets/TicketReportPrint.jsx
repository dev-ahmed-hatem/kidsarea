import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Report = () => {
    const location = useLocation();
    const { data } = location.state || {};

    useEffect(() => {
        setTimeout(() => {
            window.print();
        }, 2000);
    }, []);

    return (
        <div className="w-[20mm] text-[8px] py=[10mm] px-0 my-0 text-center">
            {/* Logo */}
            <img
                src="./logo.jpeg"
                alt="Logo"
                className="w-16 inline-block rounded-full"
            />
            <p className="text-center my-2">تقرير تذاكر</p>
            <p className="text-center mt-1">من : {data.from_date}</p>
            <p className="text-center mb-1">إلى : {data.to_date}</p>

            {/* Table Headers */}
            <table className="text-center text-[6px] font-ligh my-5 w-full">
                <thead>
                    <tr>
                        <th className="h-8 text-center border border-black">
                            اللعبة
                        </th>
                        <th className="h-8 text-center border border-black">
                            السعر
                        </th>
                        <th className="h-8 text-center border border-black">
                            إجمالى
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* Table Body */}
                    {data.tickets.map((ticket) => {
                        return ticket.items.map((item, index) => (
                            <tr key={index}>
                                <td className="h-8 text-center border border-black">
                                    {item.game.name}
                                </td>
                                <td className="h-8 text-center border border-black">
                                    {Number.parseInt(item.game.price)}
                                </td>
                                <td className="h-8 text-center border border-black">
                                    {item.total_price}
                                </td>
                            </tr>
                        ));
                    })}
                    <tr>
                        <td className="h-8 text-center border border-black" colSpan={2}>الإجمالى :</td>
                        <td className="h-8 text-center border border-black">{data.total_price} جنيه</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

// Styles
const styles = {
    container: {
        width: "48mm",
        margin: "0 auto",
        padding: "10mm 0",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #000",
        boxSizing: "border-box",
        fontSize: "14px",
    },
    logo: {
        maxWidth: "100%",
        marginBottom: "10mm",
    },
    table: {
        width: "100%",
        margin: "0 auto",
        textAlign: "center",
        marginBottom: "10mm",
    },
    tableHeaderRow: {
        borderBottom: "1px solid #000",
        display: "flex",
        justifyContent: "space-between",
        padding: "5px 0",
    },
    tableRow: {
        display: "flex",
        justifyContent: "space-between",
        padding: "5px 0",
    },
    tableCell: {
        flex: 1,
        textAlign: "center",
        border: "1px solid",
        heigh: "100%",
        display: "inline-block",
    },
    total: {
        borderTop: "1px solid #000",
        paddingTop: "10mm",
        fontSize: "15px",
        fontWeight: "bold",
    },
};

export default Report;
