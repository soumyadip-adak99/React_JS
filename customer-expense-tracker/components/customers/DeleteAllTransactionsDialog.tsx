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

interface DeleteAllTransactionsDialogProps {
  customerId: Id<"customers">;
  customerName: string;
  hasTransactions: boolean;
}

export function DeleteAllTransactionsDialog({ customerId, customerName, hasTransactions }: DeleteAllTransactionsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const deleteAllTransactions = useMutation(api.transactions.deleteAllTransactionsByCustomer);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAllTransactions({ customerId });
      toast.success("Transactions deleted", {
        description: `All transactions for ${customerName} have been removed.`,
      });
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete transactions");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button variant="destructive" className="flex-1 sm:flex-none shadow-sm" disabled={!hasTransactions}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete All Transactions
          </Button>
        }
      />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-destructive">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Delete All Transactions
          </DialogTitle>
          <DialogDescription className="pt-2">
            Are you absolutely sure you want to delete all transactions for <strong>{customerName}</strong>?
            This action cannot be undone. This will permanently delete all their recorded transactions and reset their balance data on our servers.
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
                Delete All Permanently
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
