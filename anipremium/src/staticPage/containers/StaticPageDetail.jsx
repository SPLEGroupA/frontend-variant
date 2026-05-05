import axios from "axios";
import { useState, useEffect } from "react";
import ReactHTMLParser from "html-react-parser";
import { useNavigate } from "react-router";
import { useParams } from "@/commons/hooks/useParams"

import environment from "@/commons/utils/environment";
import { Button } from "@/commons/components";
import { FiEdit } from "react-icons/fi";
import { useAuth } from "@/commons/auth";
import data from "../data/static-page-db.json";

const StaticPageDetail = ({ slug = "" }) => {
  const { staticPageId } = useParams();
  const navigate = useNavigate();
  const { checkPermission } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [htmlData, setHtmlData] = useState();

  const handleEditStaticPage = () => {
    navigate(`/static-page/edit/${slug || staticPageId}`);
  };

  // References: https://stackoverflow.com/a/60533623
  useEffect(() => {
    const head = document.head;
    const style = document.createElement("style");
    const setStyleElement = (cssData = "") => {
      style.innerHTML = cssData;

      head.appendChild(style);
    };

    const fetchData = async () => {
      try {
        let staticPage;
        let staticPages;
        if (localStorage.getItem("static-page-db")) {
          const storedData = localStorage.getItem("static-page-db");
          staticPages = JSON.parse(storedData);          
        } else {
          staticPages = data;
        }
        const key = slug || staticPageId;
        staticPage = staticPages["static-data"].find((item => item.id === key));
                
        if (!staticPage) {
          throw new Error("Static page not found");
        }
        setStyleElement(staticPage.cssData);
        setHtmlData(staticPage.htmlData);
        setIsLoading(false);
        setIsError(false);
        setErrorMessage("");
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
        setErrorMessage(e?.response?.statusText || "Failed, please try again later!");
      }
    };

    fetchData();

    return () => {
      if (head.contains(style)) head.removeChild(style);
    };
  });

  if (isLoading) return <p>Loading....</p>;

  if (isError) return <p>Error - {errorMessage}</p>;

  return (
    <>
      {checkPermission("administrator") && (
        <Button
          className="fixed bottom-6 right-6 shadow-md"
          variant="primary"
          onClick={handleEditStaticPage}
        >
          <span className="flex items-center gap-2">
            <FiEdit className="w-5 h-5" /> Edit
          </span>
        </Button>
      )}
      {htmlData && ReactHTMLParser(htmlData)}
    </>
  );
};

export default StaticPageDetail;
