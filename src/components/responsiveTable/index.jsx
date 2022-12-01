import React from "react";
import clsx from "classnames";
import styles from '../../styles/components/responsiveTable.module.css';


const ResponsiveTable = ({
    data
}) => {

    const getStyleCell = (id, grid, gridRow) => {
        return clsx({
            [styles[`responsive-table__body__text`]]: true,
            [styles[`responsive-table__body__text--${id}`]]: true,
            [styles[`responsive-table__grid--${grid}`]]: true,
            [styles[`responsive-table__grid_row--${gridRow}`]]: true,
        })
    };

    return (
        <>
            <div className="row">
                <table className="col-12 responsive-table">
                    <thead className="responsive-table__head">
                        <tr className="responsive-table__row">
                            {
                                data?.head?.map((header, idx) => {
                                    return (
                                        <th key={idx} className="responsive-table__head__title responsive-table__head__title--name">
                                            <b>{header?.title}</b>
                                            {/* <img src="../../assets/up-arrow.svg" width="15" /> */}
                                        </th>
                                    );
                                })
                            }
                        </tr>
                    </thead>
                    <tbody className="responsive-table__body">
                        {
                            data?.rows?.map((row, idx) => {
                                return (
                                    <tr key={idx} className="responsive-table__row">
                                        {
                                            row?.map((r, idxr) => {
                                                return (
                                                    <td data-title={data?.head[idxr]?.title}
                                                        key={idxr}
                                                        className={getStyleCell(r.id, r.grid, r.gridRow)} >
                                                        {/* <img className="user-icon" src="../../assets/user.svg" /> */}
                                                        {r?.text ? r.text : r?.action(row.value)}
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
        </>
    );
}

export default ResponsiveTable;