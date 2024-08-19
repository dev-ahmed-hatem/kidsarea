// import {
//     FaUsers,
//     FaCog,
//     FaMoneyBill,
//     FaUserTie,
//     FaTicketAlt,
// } from "react-icons/fa";
// import Managers from "../components/users/managers/Managers";
// import { BiSolidCategory } from "react-icons/bi";
// import Ticket from "../components/tickets/Ticket";
// import PermissionProvider from "../providers/PermissionProvider";
import TicketsFilter from "../components/tickets/TicketsFilter";
// import Games from "../components/settings/games/Games";
import { SlCalender } from "react-icons/sl";

export const routes = [
    {
        id: 1,
        title: "إدارة طاقم العمل",
        name: "user-management",
        url: "/users",
        // icon: <FaUsers />,
        children: [
            {
                id: 1,
                title: "المديرين",
                name: "managers",
                url: "/users/managers",
                // icon: <FaUserTie />,
                // element: (
                //     <PermissionProvider
                //         key={"managers"}
                //         permissions_list={["users.user"]}
                //     >
                //         <Managers />
                //     </PermissionProvider>
                // ),
                permissions: "unadjustable",
            },
            // {
            //     id: 2,
            //     title: "الموظفين",
            //     name: "staff",
            //     url: "/users/employees",
            //     icon: <MdPerson />,
            //     element: (
            //         <PermissionProvider
            //             key={"employees"}
            //             permissions_list={["users.employee"]}
            //         >
            //             <Employees />
            //         </PermissionProvider>
            //     ),
            // },
            // {
            //     id: 3,
            //     title: "المشرفين",
            //     name: "moderators",
            //     url: "/users/moderators",
            //     icon: <MdSupervisorAccount />,
            //     element: (
            //         <PermissionProvider
            //             key={"moderators"}
            //             permissions_list={["users.moderator"]}
            //         >
            //             <Moderators />
            //         </PermissionProvider>
            //     ),
            // },
            // {
            //     id: 4,
            //     title: "الصلاحيات",
            //     name: "permissions",
            //     url: "/users/permissions",
            //     icon: <MdSecurity />,
            //     element: <Permissions />,
            //     permissions: [
            //         { id: 1, value: "تعديل الصلاحيات", name: "permissions" },
            //     ],
            // },
        ],
    },
    {
        id: 2,
        title: "إعدادات النظام",
        name: "system-settings",
        url: "/settings",
        // icon: <FaCog />,
        children: [
            {
                id: 1,
                title: "الألعاب",
                url: "/settings/games",
                // icon: <BiSolidCategory />,
                // element: (
                //     <PermissionProvider
                //         key={"games"}
                //         permissions_list={["games.game"]}
                //     >
                //         <Games />,
                //     </PermissionProvider>
                // ),
            },
        ],
    },
    {
        id: 3,
        title: "التذاكر",
        name: "tickets",
        url: "/tickets",
        // icon: <FaMoneyBill />,
        children: [
            {
                id: 1,
                title: "إضافة تذكرة",
                name: "add-ticket",
                url: "/tickets/add-ticket",
                // icon: <FaTicketAlt />,
                // element: (
                //     <PermissionProvider
                //         key={"tickets"}
                //         permissions_list={["tickets.ticket"]}
                //     >
                //         <Ticket />,
                //     </PermissionProvider>
                // ),
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
