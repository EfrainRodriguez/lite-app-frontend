import { Typography, IconButton, Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import { Company } from '@/models/company.model';

interface CompanyMobileContentProps {
  data: Company;
  onEdit?: (customer: Company) => void;
  onDelete?: (customer: Company) => void;
}

const CompanyMobileContent = ({
  data,
  onEdit = () => {},
  onDelete = () => {}
}: CompanyMobileContentProps) => {
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
            NIT: <strong> {data?.nit}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Phone: <strong>{data?.phone}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Address: <strong>{data?.address}</strong>
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

export default CompanyMobileContent;
