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
  transactionCount: number;
}

export function DeleteAllTransactionsDialog({ customerId, customerName, transactionCount }: DeleteAllTransactionsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const deleteAllTransactions = useMutation(api.transactions.deleteAllTransactions);

  const handleDeleteAll = async () => {
    setIsDeleting(true);
    try {
      await deleteAllTransactions({ customerId });
      toast.success("All transactions deleted", {
        description: `Successfully cleared all transactions for ${customerName}.`,
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
          <Button variant="outline" className="flex-1 sm:flex-none border-red-200 hover:bg-red-50 hover:text-red-700 text-red-600 dark:border-red-800 dark:hover:bg-red-950 dark:text-red-400" disabled={transactionCount === 0}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear All
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
            Are you sure you want to delete all <strong>{transactionCount}</strong> transactions for <strong>{customerName}</strong>?
            <br /><br />
            This will reset the customer's balance to 0 and permanently remove all payment and due records. This action cannot be undone.
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
            onClick={handleDeleteAll}
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
                Delete All
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
