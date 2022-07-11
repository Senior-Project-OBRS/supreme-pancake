import React from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';

const Styles = styled.div`
    padding: 1rem;
  
    table {
      border-spacing: 0;
      border: 2px solid black;
  
      tr {
        :last-child {
          td {
            border-bottom: 0;
          }
        }
      }
  
      th,
      td {
        margin: 0;
        padding: 0.5rem;
        border-bottom: 2px solid black;
        border-right: 2px solid black;
  
        :last-child {
          border-right: 0;
        }
      }
    }
  `

export default Table = ({ columns, data, defaultColumn, updateMyData, sortItemBy }) => {
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        
    } = useTable({ 
            columns, 
            data,
            defaultColumn,
            
            initialState: {
                sortBy: [
                    {
                        id: sortItemBy,
                        desc: false
                    }
                ]
            },
            
            updateMyData,
            sortItemBy
        });
    
      
    return (
        <React.Fragment>
            <Styles>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {     
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell,index) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </Styles>
        </React.Fragment>
    );
};