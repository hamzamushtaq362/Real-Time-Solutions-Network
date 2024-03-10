import React, { useState } from 'react';
import { Box } from '@mui/material';
import { StyledInput, FixedPaymentDialog } from '~/components';
import { Dropdown } from 'components/Dropdown/Dropdown';
import { COLLAB_PAYMENT_TYPES, COLLAB_PAYMENT_MODE } from '~/constants';

export const RoleMenuRow = ({ role, handleRoleItemChange, index }) => {
  const [openFixedPaymentDialog, setOpenFixedPaymentDialog] = useState(false);
  return (
    <>
      <FixedPaymentDialog
        open={openFixedPaymentDialog}
        handleClose={() => setOpenFixedPaymentDialog(false)}
      />
      <Box
        key={role.skill}
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          columnGap: '5px',
          marginBottom: '20px',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Dropdown
            options={Object.values(COLLAB_PAYMENT_MODE)}
            selectedItem={role.paymentMode}
            setSelectedItem={(value) => {
              handleRoleItemChange('paymentMode', value, index);
              if (value === COLLAB_PAYMENT_MODE.FixedPayment) {
                setOpenFixedPaymentDialog(true);
              }
            }}
            width="100%"
            height={60}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            columnGap: '5px',
            flex: 1,
          }}
        >
          {role.paymentMode !== COLLAB_PAYMENT_MODE.NoPayment ? (
            <>
              {role.paymentMode === COLLAB_PAYMENT_MODE.RevenueSharing ? (
                <>
                  <StyledInput
                    placeholder="%"
                    type="number"
                    value={
                      role.amount >= 0 && role.amount <= 99
                        ? parseInt(role.amount)
                        : 0
                    }
                    onChange={(e) => {
                      handleRoleItemChange('amount', e.target.value, index);
                    }}
                  />
                </>
              ) : (
                <>
                  <Box sx={{ flex: 1 }}>
                    <Dropdown
                      options={Object.keys(COLLAB_PAYMENT_TYPES)}
                      selectedItem={role.paymentType}
                      setSelectedItem={(value) =>
                        handleRoleItemChange('paymentType', value, index)
                      }
                      width="100%"
                      height={60}
                    />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <StyledInput
                      defaultValue={0}
                      value={role.amount}
                      placeholder="Amount"
                      type="number"
                      onChange={(e) => {
                        handleRoleItemChange('amount', e.target.value, index);
                      }}
                    />
                  </Box>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </>
  );
};
