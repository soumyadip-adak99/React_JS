"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, Users, ArrowUpRight, ArrowDownRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AddCustomerForm } from "@/components/forms/AddCustomerForm";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  const stats = useQuery(api.customers.getDashboardStats);
  const customers = useQuery(api.customers.getCustomers);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  if (stats === undefined || customers === undefined) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your customers and track payments</p>
        </div>
        
        <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
          <DialogTrigger
            render={
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" /> Add Customer
              </Button>
            }
          />
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <AddCustomerForm onSuccess={() => setIsAddCustomerOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">To Receive</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">₹{stats.totalReceiving.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Total outstanding balance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Received</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalPaid.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Lifetime payments received</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground mt-1">Active customers</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <h2 className="text-xl font-semibold">Customer Directory</h2>
          <div className="relative w-full sm:w-64 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search customers..."
              className="w-full pl-8 bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        {customers.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-muted/20">
            <Users className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
            <h3 className="text-lg font-medium">No customers yet</h3>
            <p className="text-muted-foreground text-sm mt-1">Add your first customer to start tracking payments.</p>
            <Button variant="outline" className="mt-4" onClick={() => setIsAddCustomerOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Customer
            </Button>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-muted/20">
            <Search className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
            <h3 className="text-lg font-medium">No customers found</h3>
            <p className="text-muted-foreground text-sm mt-1">Try adjusting your search query.</p>
            <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCustomers.map((customer) => (
              <Link key={customer._id} href={`/customer/${customer._id}`}>
                <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full group relative overflow-hidden">
                  <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-9 w-9 border">
                        <AvatarFallback className="bg-primary/5 text-primary">
                          {customer.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base group-hover:text-primary transition-colors">{customer.name}</CardTitle>
                        {customer.phone && (
                          <p className="text-xs text-muted-foreground">{customer.phone}</p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="flex justify-between items-end mt-2">
                      <div>
                        <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-1">Current Balance</p>
                        <p className={`text-lg font-bold ${customer.balance > 0 ? "text-primary" : ""}`}>
                          ₹{customer.balance.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Total Paid</p>
                        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">₹{customer.totalPaid.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
      

    </div>
  );
}
