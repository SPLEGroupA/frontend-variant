import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router";
import { useParams } from "@/commons/hooks/useParams"

import environment from '@/commons/utils/environment'

import StaticPageBuilder from '@/staticPage/components/StaticPageBuilder'
import data from "../data/static-page-db.json";

const StaticPageEdit = () => {
  const { staticPageId } = useParams()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [htmlData, setHtmlData] = useState()
  const [cssData, setCssData] = useState()

  useEffect(() => {
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
        setHtmlData(staticPage.htmlData)
        setCssData(staticPage.cssData)
        setIsLoading(false)
        setIsError(false)
        setErrorMessage('')
      } catch (e) {
        setIsLoading(false)
        setIsError(true)
        setErrorMessage(
          e?.response?.statusText || 'Failed, please try again later!'
        )
      }
    }

    fetchData()
  }, [staticPageId])

  const actionRedirectToDetailPage = () => {
    navigate(`/${staticPageId}`)
  }

  if (isLoading) return <p>Loading....</p>

  if (isError) return <p>Error - {errorMessage}</p>

  return (
    <StaticPageBuilder
      staticId={staticPageId}
      initialComponentData={htmlData}
      initialStyleData={cssData}
      isEditMode={true}
      actionRedirectToDetailPage={actionRedirectToDetailPage}
    />
  )
}

export default StaticPageEdit
