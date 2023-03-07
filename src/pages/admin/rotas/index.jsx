import React from "react";
import DefaultLayout from "@/components/layouts/default-layout";
import { ROUTINE, TASK } from "./setup";
import SoftEngineContainer from "src/soft-engine";

const AdminRotaPage = ({
    errorConfig, config
}) => {

    return (
        <>
            <SoftEngineContainer
                taskConfig={config}
            />
        </>
    )
}

export async function getServerSideProps({ req, res }) {
    // const res = await fetch("https://api.com");
    // const data = await res.json();


    let data = null;
    let error = null;

    try {
        const response = await fetch(
            `${process.env.SOFT_FLOW_API}/config/task/${ROUTINE}/${TASK}`,
            {
                method: 'GET',
                headers: {
                    'AppKey': process.env.SOFT_FLOW_APP_KEY,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.ok) {
            data = await response.json();

            return {
                props: {
                    errorConfig: error,
                    config: data
                },
            };
        }

        if (response.status >= 300) {
            error = {
                error: 'There was an error'
            };
        }

    } catch (e) {
        console.log("ERRRRo");
        console.log(e);
        error = {
            error: 'There was an error'
        };
    }
}

AdminRotaPage.getLayout = DefaultLayout;

export default AdminRotaPage;