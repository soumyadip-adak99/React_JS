# API Documentation

This application exposes a complete REST API via Next.js API Routes (which internally interact with the Convex database) and also provides Convex Client Hooks for direct frontend interaction.

Below is the detailed specification of all available endpoints, including exact request bodies, parameter types, and response structures.

---

## REST API Endpoints

Base URL: `http://localhost:3000/api` (or your production domain).
All responses have a `Content-Type: application/json` header.

### 1. Customers Endpoints

#### `GET /api/customers`
Retrieves a list of all customers, including their calculated balance, total dues, and total payments.
- **Method:** `GET`
- **Response Structure (200 OK):**
  ```json
  [
    {
      "_id": "jh79q2j12j4h2",
      "_creationTime": 1700000000000,
      "name": "John Doe",
      "phone": "1234567890",
      "notes": "Premium customer",
      "createdAt": 1700000000000,
      "totalDue": 1500,
      "totalPaid": 500,
      "balance": 1000
    }
  ]
  ```

#### `GET /api/customers/[id]`
Retrieves full details of a specific customer, including their complete transaction history.
- **Method:** `GET`
- **Path Parameter:** `id` (Customer ID)
- **Response Structure (200 OK):**
  ```json
  {
    "_id": "jh79q2j12j4h2",
    "_creationTime": 1700000000000,
    "name": "John Doe",
    "phone": "1234567890",
    "notes": "Premium customer",
    "createdAt": 1700000000000,
    "totalDue": 1500,
    "totalPaid": 500,
    "balance": 1000,
    "transactions": [
      {
        "_id": "j576h12h32h",
        "_creationTime": 1700000050000,
        "customerId": "jh79q2j12j4h2",
        "type": "due",
        "amount": 1500,
        "note": "Initial Purchase",
        "date": "2023-10-27T00:00:00Z",
        "createdAt": 1700000050000
      }
    ]
  }
  ```
- **Error Response (404 Not Found):** `{ "error": "Customer not found" }`

#### `POST /api/customers`
Creates a new customer.
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "Jane Smith",         // Required (String)
    "phone": "9876543210",        // Optional (String)
    "notes": "Regular Customer"   // Optional (String)
  }
  ```
- **Response Structure (201 Created):**
  ```json
  {
    "success": true,
    "customerId": "jh79q2j12j4h2"
  }
  ```
- **Error Response (400 Bad Request):** `{ "error": "Name is required" }`

#### `DELETE /api/customers/[id]`
Deletes a specific customer and permanently deletes **all** their associated transactions.
- **Method:** `DELETE`
- **Path Parameter:** `id` (Customer ID)
- **Response Structure (200 OK):**
  ```json
  { "success": true }
  ```

---

### 2. Transactions Endpoints

#### `POST /api/transactions`
Adds a new transaction (either a `due` or a `payment`) for a specific customer.
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "customerId": "jh79q2j12j4h2", // Required (String)
    "type": "payment",             // Required (String: "payment" or "due")
    "amount": 500,                 // Required (Number)
    "date": "2023-10-27",          // Required (String)
    "note": "Cash payment"         // Optional (String)
  }
  ```
- **Response Structure (201 Created):**
  ```json
  {
    "success": true,
    "transactionId": "j576h12h32h"
  }
  ```
- **Error Response (400 Bad Request):** `{ "error": "Missing required fields (customerId, type, amount, date)" }`

#### `DELETE /api/transactions/[id]`
Permanently deletes a specific transaction by its ID.
- **Method:** `DELETE`
- **Path Parameter:** `id` (Transaction ID)
- **Response Structure (200 OK):**
  ```json
  { "success": true }
  ```

#### `DELETE /api/customers/[id]/transactions`
Permanently clears/deletes **all** transactions associated with a specific customer. The customer's balance will be effectively reset to 0.
- **Method:** `DELETE`
- **Path Parameter:** `id` (Customer ID)
- **Response Structure (200 OK):**
  ```json
  {
    "success": true,
    "message": "All transactions cleared successfully"
  }
  ```

---

### 3. Dashboard Stats Endpoints

#### `GET /api/stats`
Retrieves aggregated statistics for the entire application (used for the dashboard).
- **Method:** `GET`
- **Response Structure (200 OK):**
  ```json
  {
    "totalCustomers": 15,
    "totalReceiving": 10500, // Balance still to be received (totalDue - totalPaid)
    "totalDue": 25000,       // Total sum of all 'due' transactions
    "totalPaid": 14500       // Total sum of all 'payment' transactions
  }
  ```

---

### 4. System Endpoints

#### `GET /api/health`
Checks the health and basic connectivity of the backend API server.
- **Method:** `GET`
- **Response Structure (200 OK):**
  ```json
  {
    "message": "OK"
  }
  ```

---

## Convex React Hooks (Next.js Frontend Usage)

If you are developing inside the Next.js frontend, use the Convex React hooks directly instead of the REST API to benefit from real-time database updates and lower latency.

### Customers (`api.customers`)

1. **`getCustomers` (Query)**
   ```javascript
   const customers = useQuery(api.customers.getCustomers);
   ```
2. **`getCustomerById` (Query)**
   ```javascript
   const customer = useQuery(api.customers.getCustomerById, { id: "customer_id_here" });
   ```
3. **`createCustomer` (Mutation)**
   ```javascript
   const createCustomer = useMutation(api.customers.createCustomer);
   await createCustomer({ name: "Jane", phone: "123", notes: "Note" });
   ```
4. **`deleteCustomer` (Mutation)**
   ```javascript
   const deleteCustomer = useMutation(api.customers.deleteCustomer);
   await deleteCustomer({ id: "customer_id_here" });
   ```
5. **`getDashboardStats` (Query)**
   ```javascript
   const stats = useQuery(api.customers.getDashboardStats);
   ```

### Transactions (`api.transactions`)

1. **`addTransaction` (Mutation)**
   ```javascript
   const addTransaction = useMutation(api.transactions.addTransaction);
   await addTransaction({
     customerId: "customer_id_here",
     type: "payment", // "payment" | "due"
     amount: 500,
     date: "2023-10-27",
     note: "Note" // optional
   });
   ```
2. **`deleteTransaction` (Mutation)**
   ```javascript
   const deleteTransaction = useMutation(api.transactions.deleteTransaction);
   await deleteTransaction({ id: "transaction_id_here" });
   ```
3. **`deleteAllTransactions` (Mutation)**
   ```javascript
   const deleteAllTransactions = useMutation(api.transactions.deleteAllTransactions);
   await deleteAllTransactions({ customerId: "customer_id_here" });
   ```
