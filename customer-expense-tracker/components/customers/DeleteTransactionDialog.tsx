"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface DeleteTransactionDialogProps {
  transactionId: Id<"transactions">;
  type: "payment" | "due";
  amount: number;
  date: string;
}

export function DeleteTransactionDialog({ transactionId, type, amount, date }: DeleteTransactionDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const deleteTransaction = useMutation(api.transactions.deleteTransaction);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTransaction({ id: transactionId });
      toast.success("Transaction deleted", {
        description: `The ${type} of ₹${amount.toLocaleString()} has been removed from the records.`,
      });
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete transaction");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-destructive">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Delete Transaction
          </DialogTitle>
          <DialogDescription className="pt-2">
            Are you sure you want to delete this {type} of <strong>₹{amount.toLocaleString()}</strong> from {format(new Date(date), "MMM d, yyyy")}?
            <br /><br />
            This will permanently recalculate the customer's balance. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 flex gap-2 sm:justify-end">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-full sm:w-auto"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Transaction
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
