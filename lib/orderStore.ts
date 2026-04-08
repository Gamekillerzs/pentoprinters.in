export type OrderStatus = "pending" | "accepted" | "declined" | "under-printing" | "printed";

export type PrintOrder = {
  id: string;
  customerName: string;
  customerEmail?: string;
  documentName: string;
  fileContentBase64?: string;
  fileMimeType?: string;
  serviceName: string;
  printMode: string;
  paperQuality: string;
  quantity: number;
  size: string;
  submittedAt: string;
  status: OrderStatus;
  storedFileName?: string;
};

type OrderStore = {
  orders?: PrintOrder[];
};

const globalOrderStore = globalThis as unknown as OrderStore;

if (!globalOrderStore.orders) {
  globalOrderStore.orders = [
    {
      id: "ORD-1001",
      customerName: "Aarav Shah",
      customerEmail: "aarav@example.com",
      documentName: "Project Report.pdf",
      fileMimeType: "application/pdf",
      serviceName: "Brochures & Magazines",
      printMode: "Color",
      paperQuality: "Premium",
      quantity: 50,
      size: "A4",
      submittedAt: new Date().toISOString(),
      status: "pending"
    },
    {
      id: "ORD-1002",
      customerName: "Mia Carter",
      customerEmail: "mia@example.com",
      documentName: "Presentation Deck.pptx",
      fileMimeType:
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      serviceName: "Business Cards",
      printMode: "Black & White",
      paperQuality: "Standard",
      quantity: 100,
      size: "A5",
      submittedAt: new Date().toISOString(),
      status: "accepted"
    }
  ];
}

function getStore() {
  return globalOrderStore.orders as PrintOrder[];
}

export function listOrders() {
  return [...getStore()].sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

export function findOrderById(id: string) {
  return getStore().find((item) => item.id.toLowerCase() === id.toLowerCase()) ?? null;
}

export function listOrdersByCustomerEmail(email: string) {
  const normalized = email.toLowerCase();
  return listOrders().filter((order) => order.customerEmail?.toLowerCase() === normalized);
}

export function createOrder(input: {
  customerName: string;
  customerEmail?: string;
  documentName: string;
  fileContentBase64?: string;
  fileMimeType?: string;
  serviceName: string;
  printMode: string;
  paperQuality: string;
  quantity: number;
  size: string;
  storedFileName?: string;
}) {
  const store = getStore();
  const next = store.length + 1001;
  const order: PrintOrder = {
    id: `ORD-${next}`,
    customerName: input.customerName,
    customerEmail: input.customerEmail,
    documentName: input.documentName,
    fileContentBase64: input.fileContentBase64,
    fileMimeType: input.fileMimeType,
    serviceName: input.serviceName,
    printMode: input.printMode,
    paperQuality: input.paperQuality,
    quantity: input.quantity,
    size: input.size,
    submittedAt: new Date().toISOString(),
    status: "pending",
    storedFileName: input.storedFileName
  };
  store.unshift(order);
  return order;
}

export function updateOrderStatus(id: string, status: OrderStatus) {
  const order = findOrderById(id);
  if (!order) {
    return null;
  }
  order.status = status;
  return order;
}
