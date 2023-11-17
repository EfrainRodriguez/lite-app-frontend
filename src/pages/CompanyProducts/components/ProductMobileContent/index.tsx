import { Typography, IconButton, Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import { Product } from '@/models/product.model';

interface ProductMobileContentProps {
  data: Product;
  onEdit?: (customer: Product) => void;
  onDelete?: (customer: Product) => void;
}

const ProductMobileContent = ({
  data,
  onEdit = () => {},
  onDelete = () => {}
}: ProductMobileContentProps) => {
  const handleEdit = () => {
    onEdit(data);
  };

  const handleDelete = () => {
    onDelete(data);
  };
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" flexDirection="column">
          <Typography variant="h6">{data?.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            Code: <strong> {data?.code}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Characteristics: <strong>{data?.characteristics}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: <strong>{data?.price}</strong>
          </Typography>
        </Box>
        <Box mt={0.5} display="flex" alignItems="end">
          <Box>
            <IconButton size="small" onClick={handleEdit}>
              <Edit />
            </IconButton>
            <IconButton size="small" color="error" onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductMobileContent;
