import NotebookContainer from '@/containers/notebook/index.container';

export default async function NotebookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const notebookId = parseInt(id, 10);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] p-6 pb-2 overflow-hidden">
      <div className="flex-1 min-h-0">
        <NotebookContainer notebookId={notebookId} />
      </div>
    </div>
  );
}
