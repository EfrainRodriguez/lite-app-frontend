import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import Modal from '@/components/Modal';
import PageHeader from '@/components/PageHeader';
import Table from '@/components/Table';
import { Company as CompanyModel } from '@/models/company.model';
import {
  useGetCompaniesQuery,
  useDeleteCompanyMutation,
  useCreateCompanyMutation,
  useUpdateCompanyMutation
} from '@/redux/services/company.service';

import CompanyMobileContent from './components/CompanyMobileContent';
import CompanyForm from './components/CompanyForm';
import { CompanyFormDto } from './components/CompanyForm/dtos/companyFormDto';

const motionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

const Company = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<CompanyModel | null>(
    null
  );

  const { data, isLoading } = useGetCompaniesQuery('');
  const [deleteCompany, { isLoading: isDeleting }] = useDeleteCompanyMutation();
  const [createCompany, { isLoading: isCreateLoading }] =
    useCreateCompanyMutation();
  const [updateCompany, { isLoading: isUpdateLoading }] =
    useUpdateCompanyMutation();

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
      render: (_value: any, item: CompanyModel) => (
        <>
          <Tooltip title="Edit" arrow>
            <IconButton
              aria-label="edit"
              onClick={() => {
                setSelectedCompany(item);
                setShowCreateModal(true);
              }}
              size="large"
              sx={{ mr: 1 }}
            >
              <Edit fontSize="inherit" color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" arrow>
            <IconButton
              aria-label="delete"
              onClick={() => {
                setSelectedCompany(item);
                setShowDeleteModal(true);
              }}
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

  const handleDeleteCompany = () => {
    if (selectedCompany) {
      deleteCompany(selectedCompany.id)
        .unwrap()
        .then(() => {
          setShowDeleteModal(false);
        });
    }
  };

  const handleCreateCompany = (data: CompanyFormDto) => {
    createCompany(data)
      .unwrap()
      .then(() => {
        setShowCreateModal(false);
      });
  };

  const handleEditCompany = (data: CompanyFormDto) => {
    if (selectedCompany) {
      updateCompany({ ...data, id: selectedCompany.id })
        .unwrap()
        .then(() => {
          setShowCreateModal(false);
        });
    }
  };

  return (
    <>
      <motion.div {...motionProps}>
        <PageHeader
          title="Company"
          subtitle="Here are listed all the companies that are registered in the system."
          hasButton={true}
          buttonLabel="Create Company"
          onClick={() => {
            setSelectedCompany(null);
            setShowCreateModal(true);
          }}
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
              onDelete={() => {
                setSelectedCompany(item);
                setShowDeleteModal(true);
              }}
            />
          )}
          hasPagination
          isLoading={isLoading}
        />
      </motion.div>
      <Modal open={showCreateModal} hasActionButtons={false}>
        <CompanyForm
          isLoading={isCreateLoading || isUpdateLoading}
          initialValues={(selectedCompany ?? {}) as CompanyFormDto}
          onSubmit={
            selectedCompany !== null ? handleEditCompany : handleCreateCompany
          }
        />
      </Modal>
      <Modal
        open={showDeleteModal}
        okButtonText="Delete"
        isLoading={isDeleting}
        title="Are you sure you want to delete this company?"
        onCancel={() => {
          setShowDeleteModal(false);
        }}
        onOk={handleDeleteCompany}
      />
    </>
  );
};

export default Company;
