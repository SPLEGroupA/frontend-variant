import AppearanceSettings from '@/commons/appearance/AppearanceSettings'
import React, {useEffect} from 'react'
import { useContext } from 'react'
import HeaderContext from '@/commons/components/Header/HeaderContext'

const AdminPage = () => {
  const { setTitle } = useContext(HeaderContext);
  useEffect(() => setTitle("Admin Page"));
  return (
    <div className="prose max-w-full mx-auto p-6">
      <AppearanceSettings />
    </div>
  )
}

export default AdminPage
