"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
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

interface DeleteCustomerDialogProps {
  customerId: Id<"customers">;
  customerName: string;
}

export function DeleteCustomerDialog({ customerId, customerName }: DeleteCustomerDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  
  const deleteCustomer = useMutation(api.customers.deleteCustomer);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteCustomer({ id: customerId });
      toast.success("Customer deleted", {
        description: `${customerName} and their transactions have been perfectly removed.`,
      });
      setIsOpen(false);
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete customer");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button variant="destructive" size="sm" className="shadow-sm">
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        }
      />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-destructive">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Delete Customer
          </DialogTitle>
          <DialogDescription className="pt-2">
            Are you absolutely sure you want to delete <strong>{customerName}</strong>?
            This action cannot be undone. This will permanently delete this customer
            and entirely remove all their recorded transactions and data from our servers.
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
                Delete Permanently
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
