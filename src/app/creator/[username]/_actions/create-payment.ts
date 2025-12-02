"use server"

import { prisma } from "@/lib/prisma"
import { z } from "zod"


const createPaymentSchema = z.object({
  slug: z.string().min(1, "Slug do creator é obrigatório"),
  name: z.string().min(1, "O nome é obrigatório"),
  message: z.string().min(1, "A mensagem é obrigatória"),
  price: z.number().min(15, "Selecione um preço maior que R$15"), // 
  creatorId: z.string(),
})

type CreatePaymentSchema = z.infer<typeof createPaymentSchema>

export default async function createPayment(data: CreatePaymentSchema) {
  const schema = createPaymentSchema.safeParse(data)

  if (!schema.success) {
    return {
      data: null,
      error: schema.error.issues[0].message,
    }
  }

  try {
    const creator = await prisma.user.findUnique({
        where:{
            id: data.creatorId
        }
    })


    return {
      data: { success: true },
      error: null,
    }
  } catch (err) {
    console.error(err)

    return {
      data: null,
      error: "Falha ao criar o pagamento, tente mais tarde",
    }
  }
}
