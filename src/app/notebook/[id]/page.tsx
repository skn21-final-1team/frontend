import NotebookContainer from '@/containers/notebook/index.container';
import { ExtensionCard } from '@/containers/notebook/bookalpie/components';

export default async function NotebookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const notebookId = parseInt(id, 10);

  return (
    <div className="flex flex-col h-screen p-6 pb-2 overflow-hidden">
      <div className="flex-shrink-0 ml-4 mb-1">
        <ExtensionCard notebookId={notebookId} />
      </div>
      <div className="flex-1 min-h-0">
        <NotebookContainer notebookId={notebookId} />
      </div>
    </div>
  );
}
