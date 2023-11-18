import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

import Modal from '@/components/Modal';
import PageHeader from '@/components/PageHeader';
import Table from '@/components/Table';
import { Product as ProductModel } from '@/models/product.model';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
  useUpdateProductMutation
} from '@/redux/services/product.service';
import { useGetCompaniesQuery } from '@/redux/services/company.service';
import { useGetCategoriesQuery } from '@/redux/services/category.service';

import ProductMobileContent from './components/ProductMobileContent';
import ProductForm from './components/ProductForm';
import { ProductFormDto } from './components/ProductForm/dtos/productFormDto';
import useIsAdmin from '@/hooks/useIsAdmin';

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

  const { enqueueSnackbar } = useSnackbar();

  const { isAdmin } = useIsAdmin();

  const { data, isLoading } = useGetProductsQuery('');
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [createProduct, { isLoading: isCreateLoading }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdateLoading }] =
    useUpdateProductMutation();
  const { data: companies } = useGetCompaniesQuery('');
  const { data: categories } = useGetCategoriesQuery('');

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
              onClick={() => {
                setSelectedProduct({
                  ...item,
                  company: companies?.find((c) => c.id === item.company),
                  categories: categories?.find((c) => c.id === item.categories)
                });
                setShowCreateModal(true);
              }}
              disabled={!isAdmin}
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
              disabled={!isAdmin}
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

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct.id)
        .unwrap()
        .then(() => {
          setShowDeleteModal(false);
          enqueueSnackbar('Product deleted successfully', {
            variant: 'success'
          });
        })
        .catch(() => {
          enqueueSnackbar('Error deleting product', {
            variant: 'error'
          });
        });
    }
  };

  const handleCreateProduct = (data: ProductFormDto) => {
    createProduct(data)
      .unwrap()
      .then(() => {
        setShowCreateModal(false);
        enqueueSnackbar('Product created successfully', {
          variant: 'success'
        });
      })
      .catch(() => {
        enqueueSnackbar('Error creating product', {
          variant: 'error'
        });
      });
  };

  const handleEditProduct = (data: ProductFormDto) => {
    if (selectedProduct) {
      updateProduct({ ...data, id: selectedProduct.id })
        .unwrap()
        .then(() => {
          setShowCreateModal(false);
          enqueueSnackbar('Product updated successfully', {
            variant: 'success'
          });
        })
        .catch(() => {
          enqueueSnackbar('Error updating product', {
            variant: 'error'
          });
        });
    }
  };

  return (
    <>
      <motion.div {...motionProps}>
        <PageHeader
          title="Product"
          subtitle="Here are listed all the products that are registered in the system."
          hasButton={isAdmin}
          buttonLabel="Create Product"
          onClick={() => {
            setSelectedProduct(null);
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
            <ProductMobileContent
              data={item}
              onEdit={() => {
                if (isAdmin) {
                  setSelectedProduct(item);
                  setShowCreateModal(true);
                }
              }}
              onDelete={() => {
                if (isAdmin) {
                  setSelectedProduct(item);
                  setShowDeleteModal(true);
                }
              }}
            />
          )}
          hasPagination
          isLoading={isLoading}
        />
      </motion.div>
      <Modal
        open={showCreateModal}
        hasActionButtons={false}
        onClose={() => setShowCreateModal(false)}
      >
        <ProductForm
          isLoading={isCreateLoading || isUpdateLoading}
          companies={companies ?? []}
          categories={categories ?? []}
          initialValues={(selectedProduct ?? {}) as ProductFormDto}
          onSubmit={
            selectedProduct !== null ? handleEditProduct : handleCreateProduct
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
        onClose={() => setShowDeleteModal(false)}
        onOk={handleDeleteProduct}
      />
    </>
  );
};

export default Product;
