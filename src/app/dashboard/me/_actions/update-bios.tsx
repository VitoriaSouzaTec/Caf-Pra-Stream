// app/dashboard/_actions/update-bio.ts
"use server";

import { z } from "zod";

import { auth } from "@/lib/auth"; 
import { prisma } from "@/lib/prisma"; 

const updateBioSchema = z.object({
  // A biografia pode ser vazia, mas não maior que 255
  bio: z.string().max(255, "A biografia deve ter no máximo 255 caracteres.").optional(),
});

type UpdateBioFormData = z.infer<typeof updateBioSchema>;

export async function updateBio(data: UpdateBioFormData) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Usuário não autenticado." };
  }

  const result = updateBioSchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  // Se o usuário apagar todo o texto, salvamos como null no banco
  const bioToSave = result.data.bio?.trim() || null; 

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { bio: bioToSave },
    });

    return { success: true };
  } catch (err) {
    console.error("Erro ao atualizar a bio:", err);
    return { error: "Falha ao salvar a biografia." };
  }
}