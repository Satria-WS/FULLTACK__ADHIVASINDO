import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SvgIcon } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom"; //navigate

// Components
import Modul from "./Modul";
import Perserta from "./Perserta";
import Settings from "./Settings";

// icon dashboard
import { MdDashboard } from "react-icons/md";
import { MdOutlineViewModule } from "react-icons/md";
import Group from "../../assets/group.png";
import { IoIosSettings } from "react-icons/io";

const GroupIcon: React.FC = () => {
  return <img className="w-7" src={Group} alt="Logo" />;
};

const Dashboard = () => {
  const navigate = useNavigate();

  // State to track which content to show
  const [currentContent, setCurrentContent] = useState("dashboard");

  // Function to render the appropriate content
  const renderContent = () => {
    switch (currentContent) {
      case "dashboard":
        return <div>Dashboard Content</div>;
      case "modul":
        return <Modul />;
      case "peserta":
        return <Perserta />;
      case "settings":
        return <Settings />;
      default:
        return <div>Dashboard Content</div>;
    }
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  const imageBase64 =
    "iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAMAAABMOI/cAAAArlBMVEX///////7Q5Kze7Mmk0WWu1XeMxiv4+/SSyDV/wADK46eVyT+FwxLx9+fG1+ZBerAAUp0FYaZ/o8j19//D4JKpv9cARZkpa6o2cq4AUZ0ATJsfaazV4tuGwx/R3+oAWKGzyN0zb7K015NzmcCt1XHD35m80OKaudUAVZ/O3N2Hp8/m9M7q8PbZ6r4ATpxfi7rq8PmPrs7s9tlii8KgvbuSyUpcoUszfm4scYBdjK38/ZJYAAABLElEQVR4AXVShXrDIBiEOmvcYaPexsnS+fu/2P58cbsIcMcdijrAaBoY4cWMtFzNCOvNdpgBD7w78jIeqCD2kiQPSEXVdMO0iLTf9njbcT3KXt8kTla4k3Y4nhA6HbXzhXCy7lg8BQFOlF5v4Lk3loePcBGgBjTccU6WqIJRdVEYjWLC+abikwN8D/uRoGPgohWEpZUAnqOgTLezQLwvCZfW9cJUeqSCapp7pIoscelWZdks0POHnYnjkT22INwrIdPcpCh9cRSPJyxFrtadMb/soQbicCdSs/m+cwIZkIujuZE29UbihBllLWcfYFi2m2XrZpX5uYFF4EoAxigtwvsiTyhbAeWPIsn5hvwBYEMS9nPDVU7lKL3q72J4t3DxGn/y5K072TPXMBkQ/xksF0y7KdnqAAAAAElFTkSuQmCC";

  const iconDashboard = [
    {
      id: 1,
      icon: <MdDashboard />,
      label: "Dashboard",
      content: "dashboard",
    },
    {
      id: 2,
      icon: <MdOutlineViewModule />,
      label: "Modules",
      content: "modul",
    },
    {
      id: 3,
      icon: <GroupIcon />,
      label: "Peserta",
      content: "peserta",
    },
    {
      id: 4,
      icon: <IoIosSettings />,
      label: "Settings",
      content: "settings",
    },
  ];

  return (
    <>
      {/* header */}
      <header className="pb-3">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ backgroundColor: "white" }}>
            <Toolbar>
              <IconButton edge="start" aria-label="open drawer" sx={{ mr: 2 }}>
                <MenuIcon sx={{ fontSize: 30 }} />
              </IconButton>
              <SvgIcon>
                <image
                  href={`data:image/png;base64,${imageBase64}`}
                  height="26px"
                  width="26px"
                  alt="Icon"
                />
              </SvgIcon>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  color: "black",
                }}
              >
                adhivasindo
              </Typography>
              <Typography
                variant="h7"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  fontWeight: "700",
                  color: "black",
                }}
              >
                LEARNING MANAGEMENT SYSTEM
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
      </header>
      {/* container */}
      <div className=" flex flex-row">
        {/* left-sidebar */}
        <div className=" relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
          <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
            {iconDashboard.map((item, index) => (
              <>
                <button
                  onClick={() => setCurrentContent(item.content)}
                  key={index}
                  className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                >
                  <div className="mr-4">
                    <IconButton>
                      {item.icon} {/* Render the icon */}
                    </IconButton>
                    <span>{item.label}</span> {/* Render the name */}
                  </div>
                </button>
              </>
            ))}
          </nav>
        </div>
        {/* center-bar */}
        <div className="flex-1">
          {/* content route here on dashboard */}
          {renderContent()}
        </div>
        {/* right-siderbar */}
        <div className="flex-0 bg-black">
          <div className="flex">test</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
