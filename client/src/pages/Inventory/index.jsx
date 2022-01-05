import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useData, useUser } from '../../react-query';
import { PartsTable, PartForm, SideNavbar } from "../../components";
import './style.scss';

const InventoryHome = () => {
    const queryClient = useQueryClient();
    const { user } = useUser();
    const showPartForm = useData('showPartForm');

    // REDIRECTS
    if (!user) {
        return <Redirect to={'/login'} />
    }

    const Header = () => {
        return (
            <div className={"main-header"}>
                <h1 onClick={() => window.location.reload()}>Inventory</h1>

                <div className={"button-area"}>
                    <p className={"btn"} onClick={() => {
                        queryClient.refetchQueries('parts');
                        queryClient.setQueryData('showPartForm', false);
                    }}>View All</p>

                    <p className={"btn"} onClick={() => {
                        queryClient.setQueryData('showPartForm', false);
                    }}>View Low Stock</p>

                    <p className={"btn"} onClick={() => {
                        queryClient.setQueryData('submissionType', 'new');
                        queryClient.setQueryData('showPartForm', true);
                    }}>Create New</p>
                </div>
            </div>
        )
    }


    return (
        <>
            <header>
                <SideNavbar/>
            </header>

            <main className={"container"}>
                <Header />
                {showPartForm ? (
                    <PartForm />
                ) : (
                    <PartsTable />
                )}
            </main>
        </>
    )

}

export default InventoryHome;

// TODO: For some reason, 'parts' stopped refreshing when editing unless I hard reload the page. Something to do with authentication? It worked fine before.