import React, { useState } from "react";
import clsx from "classnames";
import styles from '../../../styles/components/responsiveTable.module.css';
import { getFieldValue } from "../forms.helper";
import { getBtnAction } from "../write-form/action-btn";
import Pagination from "./pagination";
import CrudActions from '../crud-layout/crudActions';
import { Button, Input, InputGroup, InputLeftElement, InputRightElement, Tooltip } from "@chakra-ui/react";
import { Search2Icon, SmallCloseIcon } from "@chakra-ui/icons";


const ResponsiveTable = ({
    config,
    data,
    responsiveSize,
    setFeedbackError,
    setModalData,
    actions,

    setModalConfig,
    isOpen,
    onClose,
    onOpen,

    navigateToPage
}) => {

    const [filter, setFilter] = useState('');
    const [alertSearch, setAlertSearch] = useState(false);

    const handleSearch = () => {
        if (filter.length < 3) {
            setAlertSearch(true);
        } else {
            navigateToPage(data && data?.number ? data?.number : 0, filter);
        }
    }

    const handleChange = (event) => {
        setFilter(event.target.value);
        if (alertSearch && event.target.value.length >= 3) {
            setAlertSearch(false);
        }
    }

    const handleClearSearch = () => {
        setFilter('');
    }

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

            <div className="col-12 col-md-6 d-md-none">
                {actions && <CrudActions actions={actions} />}
            </div>
            <div className="row mt-3">
                <div className="col-12 col-md-6">
                    <InputGroup size='md'>
                        {
                            filter.length > 0 &&
                            <InputLeftElement width='2rem'>
                                <Button h='1.75rem' ml='1rem' size='md' onClick={() => handleClearSearch()}>
                                    <SmallCloseIcon />
                                </Button>
                            </InputLeftElement>
                        }
                        <Input
                            value={filter}
                            onChange={handleChange}
                            pr='4.5rem'
                            pl={filter.length > 0 ? '3rem' : '0.5rem'}
                            type={'text'}
                            placeholder='Enter password'
                        />
                        <InputRightElement width='4.5rem'>
                            <Tooltip label='I am always open' placement='top' isOpen={alertSearch}>
                                <Button h='1.75rem' size='md' onClick={() => handleSearch()}>
                                    <Search2Icon />
                                </Button>
                            </Tooltip>
                        </InputRightElement>
                    </InputGroup>
                </div>
                <div className="col-12 col-md-6 d-none d-md-block">
                    {actions && <CrudActions actions={actions} />}
                </div>
            </div>
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
                                                                            () => { },
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
                {
                    (!data || data.content.length <= 0) &&
                    <div className="col-12 text-center">
                        Nenhum resultado encontrado!
                    </div>
                }
                <div className="col-12 my-5" style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {
                        data && data.content.length > 0 &&
                        <Pagination
                            totalPages={data?.totalPages}
                            pageNumber={data?.number}
                            pageSize={data?.numberOfElements}
                            navigate={(page) => navigateToPage(page, filter)}
                        />
                    }
                </div>
            </div>
        </>
    );
}

export default ResponsiveTable;