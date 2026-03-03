import { notFound } from 'next/navigation'
import NotebookContainer from '@/containers/notebook/index.container'

export default async function NotebookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const notebookId = parseInt(id, 10)

  if (isNaN(notebookId)) notFound()

  return <NotebookContainer notebookId={notebookId} />
}
