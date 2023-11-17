import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import Modal from '@/components/Modal';
import PageHeader from '@/components/PageHeader';
import Table from '@/components/Table';
import { Product as ProductModel } from '@/models/product.model';
import {
  useGetProductsQuery,
  useDeleteProductMutation
} from '@/redux/services/product.service';

import ProductMobileContent from './components/ProductMobileContent';

const motionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

const Product = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(
    null
  );

  const { data, isLoading } = useGetProductsQuery('');
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const cellSchema = [
    {
      key: 'tableIndex',
      label: '#',
      render: (value: number) => value + 1
    },
    {
      key: 'name',
      label: 'Name'
    },
    {
      key: 'code',
      label: 'Code'
    },
    {
      key: 'characteristics',
      label: 'Characteristics'
    },
    {
      key: 'price',
      label: 'Price',
      render: (value: number) => `$${value.toLocaleString()}`
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
      render: (_value: any, item: ProductModel) => (
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
              onClick={() => {
                setSelectedProduct(item);
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

  const handleShowCreate = () => {};

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct.id)
        .unwrap()
        .then(() => {
          setShowDeleteModal(false);
        });
    }
  };

  return (
    <>
      <motion.div {...motionProps}>
        <PageHeader
          title="Product"
          subtitle="Here are listed all the products that are registered in the system."
          hasButton={true}
          buttonLabel="Create Product"
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
            <ProductMobileContent
              data={item}
              onEdit={() => {}}
              onDelete={() => {
                setSelectedProduct(item);
                setShowDeleteModal(true);
              }}
            />
          )}
          hasPagination
          isLoading={isLoading}
        />
      </motion.div>
      <Modal
        open={showDeleteModal}
        okButtonText="Delete"
        isLoading={isDeleting}
        title="Are you sure you want to delete this company?"
        onCancel={() => {
          setShowDeleteModal(false);
        }}
        onOk={handleDeleteProduct}
      />
    </>
  );
};

export default Product;
