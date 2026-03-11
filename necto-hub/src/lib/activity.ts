import prisma from './prisma';
import { getSession } from './auth';

export async function logActivity(
  action: string,
  entityType: string,
  entityId?: string,
  entityName?: string,
  details?: string
) {
  try {
    const session = await getSession();
    if (!session) return;

    await prisma.hubActivityLog.create({
      data: {
        userId: session.id,
        userName: session.name,
        action,
        entityType,
        entityId: entityId || null,
        entityName: entityName || null,
        details: details || null,
      },
    });
  } catch {
    // Don't fail the main operation if logging fails
  }
}
