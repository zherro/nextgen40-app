import React from "react";
import clsx from "classnames";
import styles from '../../../styles/components/responsiveTable.module.css';
import { getFieldValue } from "../forms.helper";
import { getBtnAction } from "../write-form/action-btn";
import Pagination from "./pagination";


const ResponsiveTable = ({
    config,
    data,
    responsiveSize,
    setFeedbackError,
    setModalData,

    setModalConfig,
    isOpen,
    onClose,
    onOpen,

    navigateToPage
}) => {

    const getStyleTable = (responsiveIn) => {
        let resposiveWhen = responsiveIn && responsiveIn !== undefined ? responsiveIn : 700;

        return clsx({
            [styles[`rwd-table`]]: true,
            [styles[`rwd-table-${resposiveWhen}`]]: true,
        })
    };

    const getStyleColumn = (responsiveIn) => {
        let resposiveWhen = responsiveIn && responsiveIn !== undefined ? responsiveIn : 0;

        return clsx({
            [styles[`rwd-hide-${resposiveWhen}`]]: true,
        })
    };

    return (
        <>
            <div className="row mt-3">
                <div className="col-12">
                    <table className={getStyleTable(responsiveSize)}>
                        <thead>
                            <tr>
                                {
                                    config?.head?.map((header, idx) => {
                                        return (
                                            <th key={idx} className={getStyleColumn(header?.hideWhen)}>
                                                <b>{header?.title}</b>
                                                {/* <img src="../../assets/up-arrow.svg" width="15" /> */}
                                            </th>
                                        );
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.content?.map((dataRow, idx) => {
                                    return (
                                        <tr key={idx}>
                                            {
                                                config?.rows?.map((row, idxr) => {
                                                    return (
                                                        <td data-title={config?.head[idxr]?.title}
                                                            key={idxr}
                                                            className={getStyleColumn(config?.head[idxr]?.hideWhen)}
                                                            data-th={config?.head[idxr]?.title}
                                                        >
                                                            {/* <img className="user-icon" src="../../assets/user.svg" /> */}
                                                            {row?.type !== 'action' ? getFieldValue(row, dataRow) : ''}
                                                            {
                                                                row?.type == 'action' &&
                                                                <div
                                                                    style={{
                                                                        display: 'flex'
                                                                    }}
                                                                >
                                                                    {
                                                                        row?.actions?.map((action, idxa) => getBtnAction(
                                                                                () => {},
                                                                                action,
                                                                                ('' + idx) + idxa,
                                                                                dataRow,
                                                                                setFeedbackError,

                                                                                setModalConfig,
                                                                                isOpen,
                                                                                onClose,
                                                                                onOpen,
                                                                                setModalData
                                                                            )
                                                                        )
                                                                    }
                                                                </div>
                                                            }
                                                        </td>
                                                    );
                                                })
                                            }
                                        </tr>

                                    );
                                })
                            }

                            {/* <td className="responsive-table__body__text responsive-table__body__text--status">
                                                        <span className="status-indicator status-indicator--active"></span>Active
                                                    </td> */}
                        </tbody>
                    </table>
                </div>
                <div className="col-12 my-5" style={{display: 'flex', justifyContent: 'space-around'}}>
                    <Pagination
                        totalPages={data?.totalPages}
                        pageNumber={data?.number}
                        pageSize={data?.numberOfElements}
                        navigate={(page) => navigateToPage(page)}
                    />
                </div>
            </div>
        </>
    );
}

export default ResponsiveTable;