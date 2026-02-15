import NotebookContainer from '@/containers/notebook/index.container'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function NotebookDetailPage({ params }: PageProps) {
  const { id } = await params
  return <NotebookContainer notebookId={Number(id)} />
}
