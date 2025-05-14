import React from 'react';
import { FileText, Download, Presentation as FilePresentation, FileText as FileText2, File } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Document } from '../../types';
import { format } from 'date-fns';

interface DocumentCardProps {
  document: Document;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  const getDocumentIcon = () => {
    switch (document.category) {
      case 'report':
        return <FileText className="h-6 w-6 text-primary-600" />;
      case 'presentation':
        return <FilePresentation className="h-6 w-6 text-secondary-600" />;
      case 'legal':
        return <FileText2 className="h-6 w-6 text-error-600" />;
      default:
        return <File className="h-6 w-6 text-neutral-600" />;
    }
  };

  const getDocumentCategoryLabel = () => {
    switch (document.category) {
      case 'report':
        return 'Financial Report';
      case 'presentation':
        return 'Presentation';
      case 'legal':
        return 'Legal Document';
      default:
        return 'Other';
    }
  };

  const getCategoryBadgeVariant = () => {
    switch (document.category) {
      case 'report':
        return 'primary';
      case 'presentation':
        return 'secondary';
      case 'legal':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card hover className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {getDocumentIcon()}
            <CardTitle className="text-lg">{document.title}</CardTitle>
          </div>
          <Badge variant={getCategoryBadgeVariant()} size="sm">
            {getDocumentCategoryLabel()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <p className="text-sm text-neutral-600">{document.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t border-neutral-200 pt-4">
        <div className="text-xs text-neutral-500">
          <div>Uploaded: {format(new Date(document.uploadDate), 'MMM d, yyyy')}</div>
          <div>Size: {document.fileSize}</div>
        </div>
        <Button 
          size="sm" 
          variant="outline"
          icon={<Download className="h-4 w-4" />}
        >
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;