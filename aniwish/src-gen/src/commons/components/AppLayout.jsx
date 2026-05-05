import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import useAppearanceStore from "@/commons/appearance/store";
import environment from "@/commons/utils/environment";
import { Toaster } from "react-hot-toast";
import { ImSpinner } from "react-icons/im";
import { INTERFACE_KITS } from "@/commons/constants/interface";
import useTypography from "./Typography";
import Footer from "./Footer";
import HeaderContext from "./Header/HeaderContext";
import Header from "./Header";
import Sidebar from "./Navigation/Sidebar";

const AppLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { interfaceKit, colorTheme, setAppearance } = useAppearanceStore();
  const typography = useTypography();
  const [title, setTitle] = useState("Home");

  useEffect(() => {
    if (!colorTheme) {
      setIsLoading(true);
      axios
        .get(`${environment.staticServerApi}/appearance`)
        .then((res) => setAppearance(res.data))
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    }
  }, []);

  const isRounded = INTERFACE_KITS[interfaceKit]?.rounded ?? true;

  if (isLoading)
    return (
      <div className="w-screen h-screen grid place-items-center">
        <ImSpinner className="w-12 h-12 animate-spin" />
      </div>
    );

  return (
    <div
      data-theme={colorTheme}
      className={`flex relative ${typography} ${
        isRounded ? "rounded-true" : "rounded-false"
      }`}
    >
      <Sidebar />
      <div className="min-h-screen w-screen flex flex-col pl-80">
        <HeaderContext.Provider value={{ title, setTitle }}>
          <Header />
          <div className="flex-1 bg-base-200">{children}</div>
          <Footer />
        </HeaderContext.Provider>
      </div>

      <Toaster />
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
