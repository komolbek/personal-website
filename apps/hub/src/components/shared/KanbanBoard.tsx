'use client';

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useState, useTransition } from 'react';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatDate } from '@/lib/utils';
import { useI18n } from '@/components/i18n/I18nProvider';

type Lead = {
  id: string;
  name: string;
  contactPerson: string | null;
  phone: string | null;
  telegram: string | null;
  source: string;
  status: string;
  followUp: string | null;
  notes: string | null;
};

type Column = {
  value: string;
  label: string;
  leads: Lead[];
};

export function KanbanBoard({
  columns: initialColumns,
  slug,
}: {
  columns: Column[];
  slug: string;
}) {
  const { t, locale } = useI18n();
  const [columns, setColumns] = useState(initialColumns);
  const [isPending, startTransition] = useTransition();

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceCol = columns.find((c) => c.value === source.droppableId);
    const destCol = columns.find((c) => c.value === destination.droppableId);
    if (!sourceCol || !destCol) return;

    const lead = sourceCol.leads[source.index];
    if (!lead) return;

    // Optimistic update
    const newColumns = columns.map((col) => {
      if (col.value === source.droppableId) {
        return { ...col, leads: col.leads.filter((_, i) => i !== source.index) };
      }
      if (col.value === destination.droppableId) {
        const newLeads = [...col.leads];
        newLeads.splice(destination.index, 0, { ...lead, status: destination.droppableId });
        return { ...col, leads: newLeads };
      }
      return col;
    });
    setColumns(newColumns);

    // Persist to server
    startTransition(async () => {
      try {
        await fetch(`/api/leads/${draggableId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: destination.droppableId, slug }),
        });
      } catch {
        // Revert on error
        setColumns(initialColumns);
      }
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div key={column.value} className="flex-shrink-0 w-64">
            <div className="flex items-center gap-2 mb-3 px-1">
              <StatusBadge status={column.value} />
              <span className="text-xs text-muted-foreground">({column.leads.length})</span>
            </div>
            <Droppable droppableId={column.value}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`space-y-2 min-h-[100px] rounded-lg p-2 transition-colors ${
                    snapshot.isDraggingOver ? 'bg-primary/5 border-2 border-dashed border-primary/30' : 'bg-muted/30'
                  }`}
                >
                  {column.leads.map((lead, index) => (
                    <Draggable key={lead.id} draggableId={lead.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`transition-shadow ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                        >
                          <Card className="p-3 bg-background cursor-grab active:cursor-grabbing">
                            <div className="font-medium text-sm">{lead.name}</div>
                            {lead.contactPerson && (
                              <div className="text-xs text-muted-foreground mt-1">{lead.contactPerson}</div>
                            )}
                            {lead.phone && (
                              <div className="text-xs text-muted-foreground">{lead.phone}</div>
                            )}
                            {lead.telegram && (
                              <div className="text-xs text-muted-foreground">{lead.telegram}</div>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                                {lead.source.replace(/_/g, ' ')}
                              </span>
                            </div>
                            {lead.followUp && (
                              <div className="text-xs mt-2 text-amber-600">
                                {t('kanban.followUp', { date: formatDate(lead.followUp, locale) })}
                              </div>
                            )}
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
      {isPending && (
        <div className="text-xs text-muted-foreground text-center">{t('kanban.updating')}</div>
      )}
    </DragDropContext>
  );
}
