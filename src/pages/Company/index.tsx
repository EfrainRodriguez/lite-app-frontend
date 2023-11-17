import { motion } from 'framer-motion';
import { IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import PageHeader from '@/components/PageHeader';
import Table from '@/components/Table';
import { Company as CompanyModel } from '@/models/company.model';
import { useGetCompaniesQuery } from '@/redux/services/company.service';

import CompanyMobileContent from './components/CompanyMobileContent';

const motionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

const Company = () => {
  const { data, isLoading } = useGetCompaniesQuery('');

  const cellSchema = [
    {
      key: 'tableIndex',
      label: '#',
      render: (value: number) => value + 1
    },
    {
      key: 'nit',
      label: 'NIT'
    },
    {
      key: 'name',
      label: 'Name'
    },
    {
      key: 'address',
      label: 'Address'
    },
    {
      key: 'phone',
      label: 'Phone'
    },
    {
      key: 'actions',
      label: 'Actions',
      columnProps: {
        align: 'right' as any
      },
      cellProps: {
        align: 'right' as any,
        width: '20%'
      },
      render: (value: any, item: CompanyModel) => (
        <>
          <Tooltip title="Edit" arrow>
            <IconButton
              aria-label="edit"
              onClick={() => {}}
              size="large"
              sx={{ mr: 1 }}
            >
              <Edit fontSize="inherit" color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" arrow>
            <IconButton
              aria-label="delete"
              onClick={() => {}}
              size="large"
              sx={{ mr: 1 }}
            >
              <Delete fontSize="inherit" color="error" />
            </IconButton>
          </Tooltip>
        </>
      )
    }
  ];

  const handleShowCreate = () => {};

  return (
    <>
      <motion.div {...motionProps}>
        <PageHeader
          title="Company"
          subtitle="Here are listed all the companies that are registered in the system."
          hasButton={true}
          buttonLabel="Create Company"
          onClick={handleShowCreate}
        />
      </motion.div>
      <motion.div {...motionProps}>
        <Table
          cellSchema={cellSchema}
          sourceData={(data || []).map((item, index) => ({
            ...item,
            tableIndex: index
          }))}
          renderMobileContent={(item) => (
            <CompanyMobileContent
              data={item}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          )}
        />
      </motion.div>
    </>
  );
};

export default Company;
