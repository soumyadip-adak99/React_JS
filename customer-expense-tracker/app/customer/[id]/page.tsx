"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft, Plus, CreditCard, ReceiptIndianRupee, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddTransactionForm } from "@/components/forms/AddTransactionForm";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { DeleteCustomerDialog } from "@/components/customers/DeleteCustomerDialog";
import { DeleteTransactionDialog } from "@/components/customers/DeleteTransactionDialog";

export default function CustomerPage() {
  const params = useParams();
  const id = params.id as Id<"customers">;
  
  const customer = useQuery(api.customers.getCustomerById, { id });
  
  const [isDueOpen, setIsDueOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  if (customer === null) {
    return (
      <div className="flex flex-col h-[50vh] items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">Customer not found</h2>
        <Button variant="outline" nativeButton={false} render={<Link href="/" />}>
          <>Back to Dashboard</>
        </Button>
      </div>
    );
  }

  if (customer === undefined) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6 flex flex-row items-center justify-between">
        <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/" />} className="mb-4 -ml-2 text-muted-foreground hover:text-foreground">
          <>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </>
        </Button>
        <div className="mb-4">
          <DeleteCustomerDialog customerId={id} customerName={customer.name} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <Card className="flex-1">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarFallback className="text-xl bg-primary/10 text-primary font-medium">
                    {customer.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-foreground tracking-tight">{customer.name}</h1>
                  <div className="flex items-center text-muted-foreground mt-1 space-x-4">
                    {customer.phone && (
                      <div className="flex items-center text-sm">
                        <Phone className="mr-1.5 h-3.5 w-3.5" />
                        {customer.phone}
                      </div>
                    )}
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-1.5 h-3.5 w-3.5" />
                      Added {format(new Date(customer.createdAt), "MMM d, yyyy")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {customer.notes && (
               <div className="mt-6 pt-4 border-t border-border/50 text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
                 <strong className="text-foreground/80 font-medium block mb-1">Notes:</strong> 
                 {customer.notes}
               </div>
            )}
          </CardContent>
        </Card>

        <Card className="w-full md:w-[350px] bg-primary/5 border-primary/20 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <CardHeader className="pb-2">
            <CardTitle className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary mb-5 tracking-tight">₹{customer.balance.toLocaleString()}</div>
            <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t border-primary/10">
              <div>
                <p className="text-muted-foreground mb-1 text-[11px] uppercase tracking-wider font-semibold">Remaining Due</p>
                <p className="font-semibold text-destructive text-lg">₹{(customer.totalDue - customer.totalPaid).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1 text-[11px] uppercase tracking-wider font-semibold">Total Paid</p>
                <p className="font-semibold text-emerald-600 dark:text-emerald-400 text-lg">₹{customer.totalPaid.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Transaction History</h2>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
            <DialogTrigger
              render={
                <Button variant="outline" className="flex-1 sm:flex-none border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 text-emerald-600 dark:border-emerald-800 dark:hover:bg-emerald-950 dark:text-emerald-400">
                  <CreditCard className="mr-2 h-4 w-4" /> Record Payment
                </Button>
              }
            />
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Record Payment for {customer.name}</DialogTitle>
              </DialogHeader>
              <AddTransactionForm 
                customerId={id} 
                type="payment" 
                onSuccess={() => setIsPaymentOpen(false)} 
              />
            </DialogContent>
          </Dialog>

          <Dialog open={isDueOpen} onOpenChange={setIsDueOpen}>
            <DialogTrigger
              render={
                <Button className="flex-1 sm:flex-none">
                  <ReceiptIndianRupee className="mr-2 h-4 w-4" /> Add Due
                </Button>
              }
            />
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Due for {customer.name}</DialogTitle>
              </DialogHeader>
              <AddTransactionForm 
                customerId={id} 
                type="due" 
                onSuccess={() => setIsDueOpen(false)} 
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="rounded-md border-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-[120px]">Date</TableHead>
                <TableHead className="w-[100px]">Type</TableHead>
                <TableHead>Note</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customer.transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center">
                      <ReceiptIndianRupee className="h-8 w-8 text-muted-foreground/30 mb-2" />
                      <p>No transactions recorded yet.</p>
                      <p className="text-xs mt-1">Add a due or record a payment to get started.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                customer.transactions.map((tx: any) => (
                  <TableRow key={tx._id} className="group">
                    <TableCell className="font-medium text-sm">
                      {format(new Date(tx.date), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={tx.type === "payment" ? "default" : "destructive"}
                        className={tx.type === "payment" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 pointer-events-none" : "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 pointer-events-none"}
                      >
                        {tx.type === "payment" ? "Paid" : "Due"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-[200px] truncate text-sm">
                      {tx.note || "-"}
                    </TableCell>
                    <TableCell className={`text-right font-bold tracking-tight ${tx.type === "payment" ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}>
                      {tx.type === "payment" ? "-" : "+"}₹{tx.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <DeleteTransactionDialog
                        transactionId={tx._id}
                        type={tx.type}
                        amount={tx.amount}
                        date={tx.date}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
      
      {/* Mobile FABs */}
      <div className="sm:hidden fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <Button 
          size="icon" 
          variant="outline"
          className="h-12 w-12 rounded-full shadow-lg border-emerald-200 bg-background text-emerald-600 dark:border-emerald-800"
          onClick={() => setIsPaymentOpen(true)}
        >
          <CreditCard className="h-5 w-5" />
        </Button>
        <Button 
          size="icon" 
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={() => setIsDueOpen(true)}
        >
          <ReceiptIndianRupee className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
