import type { EmployeeDocument } from '@pompeitech/mock-data'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  toast
} from '@pompeitech/vesuvius-ui'
import { DownloadIcon, FileTextIcon } from 'lucide-react'
import { DOCUMENT_TYPE_LABEL, dateFormatter } from '../../_shared/format'
import { IconRow } from '../../_shared/icon-row'

/** This employee's uploaded documents — contract, ID, certificates, and so on. */
export function DocumentsCard({ documents }: { documents: EmployeeDocument[] }) {
  const sorted = [...documents].sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
      </CardHeader>
      <CardContent className="divide-y">
        {sorted.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No documents on file.</p>
        ) : (
          sorted.map(document => (
            <IconRow
              key={document.id}
              icon={FileTextIcon}
              title={document.name}
              subtitle={`Uploaded ${dateFormatter.format(new Date(document.uploadedAt))}`}
              trailing={
                <>
                  <Badge variant="outline">{DOCUMENT_TYPE_LABEL[document.type]}</Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() =>
                      toast.info(`Downloading "${document.name}" isn't wired up in this demo.`)
                    }
                  >
                    <DownloadIcon />
                    <span className="sr-only">Download {document.name}</span>
                  </Button>
                </>
              }
            />
          ))
        )}
      </CardContent>
    </Card>
  )
}
