import React from 'react'
import AdminSidebar from './components/AdminSidebar'
import useDocumentTitle from '../pureFunctions/useDocumentTitle'
import AdminHeader from './components/AdminHeader'

const AdminController = () => {

    useDocumentTitle("Sociopuff : Admin");
    return (
        <div>
            <AdminHeader />
            <AdminSidebar />

        </div>
    )
}

export default AdminController;