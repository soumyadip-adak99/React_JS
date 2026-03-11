"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { format } from "date-fns";

const formSchema = z.object({
  amount: z.coerce.number().min(1, "Amount must be greater than 0"),
  note: z.string().optional(),
  date: z.string().min(1, "Date is required"),
});

interface AddTransactionFormProps {
  customerId: string;
  type: "due" | "payment";
  onSuccess?: () => void;
}

export function AddTransactionForm({ customerId, type, onSuccess }: AddTransactionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addTransaction = useMutation(api.transactions.addTransaction);

  const form = useForm<z.input<typeof formSchema>, any, z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      note: "",
      date: format(new Date(), "yyyy-MM-dd"),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await addTransaction({
        customerId: customerId as Id<"customers">,
        type,
        amount: values.amount,
        note: values.note,
        date: values.date,
      });
      toast.success(type === "due" ? "Due added successfully!" : "Payment recorded successfully!");
      form.reset({ ...form.getValues(), amount: 0, note: "" });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add transaction");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount (₹)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0.00" {...field} value={field.value as number | string} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : (type === "due" ? "Add Due" : "Record Payment")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
