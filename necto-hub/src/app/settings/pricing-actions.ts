'use server';

import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { logActivity } from '@/lib/activity';

// ============================================================================
// Project Type Actions
// ============================================================================

export async function createProjectType(formData: FormData): Promise<string | null> {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return 'Unauthorized';

  const name = (formData.get('name') as string)?.trim();
  const basePrice = parseFloat(formData.get('basePrice') as string);
  const baseDescription = (formData.get('baseDescription') as string)?.trim();
  const sortOrder = parseInt(formData.get('sortOrder') as string) || 0;

  if (!name) return 'Name is required';
  if (isNaN(basePrice) || basePrice < 0) return 'Base price must be >= 0';
  if (!baseDescription) return 'Base description is required';

  try {
    const pt = await prisma.hubProjectType.create({
      data: { name, basePrice, baseDescription, sortOrder },
    });
    await logActivity('created', 'project_type', pt.id, name);
    revalidatePath('/settings');
    revalidatePath('/calculator');
    return null;
  } catch (e: any) {
    if (e.code === 'P2002') return 'A project type with this name already exists';
    return 'Failed to create project type';
  }
}

export async function updateProjectType(formData: FormData): Promise<string | null> {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return 'Unauthorized';

  const id = formData.get('id') as string;
  const name = (formData.get('name') as string)?.trim();
  const basePrice = parseFloat(formData.get('basePrice') as string);
  const baseDescription = (formData.get('baseDescription') as string)?.trim();
  const sortOrder = parseInt(formData.get('sortOrder') as string) || 0;

  if (!name) return 'Name is required';
  if (isNaN(basePrice) || basePrice < 0) return 'Base price must be >= 0';
  if (!baseDescription) return 'Base description is required';

  try {
    await prisma.hubProjectType.update({
      where: { id },
      data: { name, basePrice, baseDescription, sortOrder },
    });
    await logActivity('updated', 'project_type', id, name);
    revalidatePath('/settings');
    revalidatePath('/calculator');
    return null;
  } catch (e: any) {
    if (e.code === 'P2002') return 'A project type with this name already exists';
    return 'Failed to update project type';
  }
}

export async function toggleProjectTypeActive(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return;

  const id = formData.get('id') as string;
  const pt = await prisma.hubProjectType.findUnique({ where: { id } });
  if (!pt) return;

  await prisma.hubProjectType.update({
    where: { id },
    data: { isActive: !pt.isActive },
  });

  const action = pt.isActive ? 'deactivated' : 'activated';
  await logActivity(action, 'project_type', id, pt.name);
  revalidatePath('/settings');
  revalidatePath('/calculator');
}

export async function deleteProjectType(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return;

  const id = formData.get('id') as string;
  const pt = await prisma.hubProjectType.findUnique({ where: { id } });
  if (!pt) return;

  await prisma.hubProjectType.delete({ where: { id } });
  await logActivity('deleted', 'project_type', id, pt.name);
  revalidatePath('/settings');
  revalidatePath('/calculator');
}

// ============================================================================
// Feature Actions
// ============================================================================

export async function createFeature(formData: FormData): Promise<string | null> {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return 'Unauthorized';

  const projectTypeId = formData.get('projectTypeId') as string;
  const name = (formData.get('name') as string)?.trim();
  const price = parseFloat(formData.get('price') as string);
  const supportsQuantity = formData.get('supportsQuantity') === 'true';
  const unitLabel = (formData.get('unitLabel') as string)?.trim() || null;
  const sortOrder = parseInt(formData.get('sortOrder') as string) || 0;

  if (!name) return 'Name is required';
  if (isNaN(price) || price < 0) return 'Price must be >= 0';

  try {
    const feature = await prisma.hubProjectTypeFeature.create({
      data: { projectTypeId, name, price, supportsQuantity, unitLabel, sortOrder },
    });
    await logActivity('created', 'project_type_feature', feature.id, name);
    revalidatePath('/settings');
    revalidatePath('/calculator');
    return null;
  } catch (e: any) {
    if (e.code === 'P2002') return 'A feature with this name already exists for this type';
    return 'Failed to create feature';
  }
}

export async function updateFeature(formData: FormData): Promise<string | null> {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return 'Unauthorized';

  const id = formData.get('id') as string;
  const name = (formData.get('name') as string)?.trim();
  const price = parseFloat(formData.get('price') as string);
  const supportsQuantity = formData.get('supportsQuantity') === 'true';
  const unitLabel = (formData.get('unitLabel') as string)?.trim() || null;
  const sortOrder = parseInt(formData.get('sortOrder') as string) || 0;

  if (!name) return 'Name is required';
  if (isNaN(price) || price < 0) return 'Price must be >= 0';

  try {
    await prisma.hubProjectTypeFeature.update({
      where: { id },
      data: { name, price, supportsQuantity, unitLabel, sortOrder },
    });
    await logActivity('updated', 'project_type_feature', id, name);
    revalidatePath('/settings');
    revalidatePath('/calculator');
    return null;
  } catch (e: any) {
    if (e.code === 'P2002') return 'A feature with this name already exists for this type';
    return 'Failed to update feature';
  }
}

export async function toggleFeatureActive(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return;

  const id = formData.get('id') as string;
  const feature = await prisma.hubProjectTypeFeature.findUnique({ where: { id } });
  if (!feature) return;

  await prisma.hubProjectTypeFeature.update({
    where: { id },
    data: { isActive: !feature.isActive },
  });

  const action = feature.isActive ? 'deactivated' : 'activated';
  await logActivity(action, 'project_type_feature', id, feature.name);
  revalidatePath('/settings');
  revalidatePath('/calculator');
}

export async function deleteFeature(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return;

  const id = formData.get('id') as string;
  const feature = await prisma.hubProjectTypeFeature.findUnique({ where: { id } });
  if (!feature) return;

  await prisma.hubProjectTypeFeature.delete({ where: { id } });
  await logActivity('deleted', 'project_type_feature', id, feature.name);
  revalidatePath('/settings');
  revalidatePath('/calculator');
}
