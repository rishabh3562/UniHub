import { FaUserGroup } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa";
import { MdVideoChat } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { HiMiniPhoto } from "react-icons/hi2";
import { MdOutlineWork } from "react-icons/md";


export const CardFields = [
    {
        key: 1,
        title: "Alumnus",
        icon: <FaUserGroup size={40} />,
        route: "/alumnilist"
    },
    {
        key: 2,
        title: "Students",
        icon: <FaGraduationCap size={40} />,
        route: "/studentlist"
    },
    {
        key: 3,
        title: "RFMW",
        icon: <AiFillMessage size={40} />,
        route: "/all-rfmw"
    },
    {
        key: 4,
        title: "Photos",
        icon: <HiMiniPhoto size={40} />,
        route: "/all-photos"
    },
]