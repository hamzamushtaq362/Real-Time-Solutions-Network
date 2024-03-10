import { useTranslation } from 'react-i18next';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function SubTable({ headings, headingStyles, children }) {
  const { t } = useTranslation();

  return (
    (<TableContainer component={Paper} sx={{boxShadow: 'none'}}>
      <Table
        sx={{ minWidth: 650, borderCollapse: 'collapse', }}
        aria-label={t("simple table")}
      >
        <TableHead>
          <TableRow>
            {headings?.map((item, index) => (
              <TableCell
                key={index}
                style={{ fontsize: '12px', color: '#5d5d5b' }}
                sx={headingStyles}
              >
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {children}

          {/* {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell className='t t-bold'>{row.name}</TableCell>
              <TableCell className='t t-bold'>{row.calories}</TableCell>
              <TableCell className='t t-bold'>{row.fat}</TableCell>
              <TableCell className='t t-bold'>{row.carbs}</TableCell>
              <TableCell className='t t-bold'>{row.protein}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>)
  );
}
