"use client"

import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { string, z } from "zod"
import createPayment from '../_actions/create-payment'

const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  message: z.string().min(1, "A mensagem é obrigatória"),
  price: z.enum(["15", "25", "35"], {
    required_error: "O valor é obrigatório",
  }),
})

type FormData = z.infer<typeof formSchema>

interface formDonateProps{
  slug: string; 
  creatorId: string;
}


export function FormDonate({slug, creatorId}: formDonateProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
      price: undefined,
    },
  })

 async function onSubmit(data: FormData) {
  const priceInCents = Number(data.price) * 100;

  const checkout = await createPayment({
      name: data.name,
      message: data.message,
      creatorId: creatorId,
      slug: slug,
      price: priceInCents,
    })

    console.log(checkout)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {/* CAMPO NOME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seu Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome (Opcional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* CAMPO MENSAGEM */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem</FormLabel>
              <FormControl>
                <textarea
                  placeholder="Deixe uma mensagem de apoio!"
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/*  CAMPO VALOR (PRICE) */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor (R$)</FormLabel>
              <FormControl>
                <select
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...field}
                >
                  <option value="15">R$15</option>
                  <option value="25">R$25</option>
                  <option value="35">R$35</option>
                </select>
              </FormControl>
              <FormDescription>
                Selecione um dos valores fixos (R$15, R$25, R$35).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600">
          Fazer Doação
        </Button>
      </form>
    </Form>
  )
}
