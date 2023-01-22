import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import React from "react";
import FormTitle  from './formTitle';

const CrudLayout = ({ title, actions, pieces, children }) => {

    return (
        <>
            { title && <FormTitle>{ title }</FormTitle> }
            <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
                {
                    pieces?.map((piece, idx) => {
                        return (
                            <BreadcrumbItem key={idx}>
                                <BreadcrumbLink href={piece?.link ? piece.link : '#'}>{piece?.name}</BreadcrumbLink>
                            </BreadcrumbItem>
                        )
                    })
                }
            </Breadcrumb>
            { children }
        </>
    );
}

export default CrudLayout; 