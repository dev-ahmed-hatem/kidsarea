import {
    FaUsers,
    FaCog,
    FaMoneyBill,
    FaUserTie,
    FaTicketAlt,
} from "react-icons/fa";
import Managers from "../components/users/managers/Managers";
import { BiSolidCategory } from "react-icons/bi";
import TicketsFilter from "../components/tickets/TicketsFilter";
import Games from "../components/settings/games/Games";
import { SlCalender } from "react-icons/sl";
import TicketSale from "../components/tickets/TicketSale";

export const routes = [
    {
        id: 1,
        title: "إدارة طاقم العمل",
        name: "user-management",
        url: "/users",
        icon: <FaUsers />,
        children: [
            {
                id: 1,
                title: "المديرين",
                name: "managers",
                url: "/users/managers",
                icon: <FaUserTie />,
                element: <Managers />,
                permissions: "unadjustable",
            },
        ],
    },
    {
        id: 2,
        title: "إعدادات النظام",
        name: "system-settings",
        url: "/settings",
        icon: <FaCog />,
        children: [
            {
                id: 1,
                title: "الألعاب",
                url: "/settings/games",
                icon: <BiSolidCategory />,
                element: <Games />,
            },
        ],
    },
    {
        id: 3,
        title: "التذاكر",
        name: "tickets",
        url: "/tickets",
        icon: <FaMoneyBill />,
        children: [
            {
                id: 1,
                title: "بيع تذكرة",
                name: "sale-ticket",
                url: "/tickets/sale-ticket",
                icon: <FaTicketAlt />,
                permissions: ["tickets.ticket"],
                element: <TicketSale />,
            },
            {
                id: 2,
                title: "التذاكر خلال فترة",
                name: "salaries",
                url: "/tickets/within-duration",
                icon: <SlCalender />,
                element: <TicketsFilter />,
            },
        ],
    },
];
