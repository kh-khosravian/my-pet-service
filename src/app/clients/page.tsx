import { revalidatePath } from "next/cache";
import { getClients } from "../../Services/Clients/ClientService";
import { InsertClientModal } from "./InsertModal";
import { createClient } from "@/Services/Clients/ClientService";
import {
  CustomTable,
  CustomTableHeaderProps,
  CustomTableRowProps,
} from "@/components/table/table";

type clientPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ClientsPage({ searchParams }: clientPageProps) {
  const { page, pageSize, orderby, direction } = await searchParams;
  const pageNum = isNaN(parseInt((page as string) || "1", 10))
    ? 1
    : parseInt((page as string) || "1", 10);
  const pageSizeNum = isNaN(parseInt((pageSize as string) || "10", 10))
    ? 10
    : parseInt((pageSize as string) || "10", 10);

  const orderByObj =
    typeof orderby === "string"
      ? { [orderby]: direction === "desc" ? "desc" : "asc" }
      : undefined;

  console.log("Fetching clients with params:", {
    page: pageNum,
    pageSize: pageSizeNum,
    orderBy: orderByObj,
  });
  const { clients, count } = await getClients({
    skip: (pageNum - 1) * +pageSizeNum,
    take: pageSizeNum,
    orderBy: orderByObj,
  });

  async function createNewClient(formData: FormData) {
    "use server";

    const values = Object.fromEntries(formData.entries());
    console.log("Server action:", values);

    // await db.client.create({ data: values });

    console.log("Creating new client:", values);
    const newItem = await createClient({
      displayName: values.displayName as string,
      email: (values.email as string) || null,
      phone: (values.phone as string) || null,
      address: (values.address as string) || null,
      city: (values.city as string) || null,
      country: (values.country as string) || null,
      zipCode: (values.zipCode as string) || null,
    });

    revalidatePath("/clients");
  }

  const headers: CustomTableHeaderProps[] = [
    {
      label: "Display Name",
      align: "text-left",
      width: "2/6",
      sortable: "displayName",
    },
    { label: "Email", align: "text-left", width: "2/6", sortable: "email" },
    { label: "Phone", align: "text-left", width: "1/7", sortable: "phone" },
    { label: "", align: "text-left", width: "1/7" },
  ];

  const bodyChildren: CustomTableRowProps[] = clients.map((client) => ({
    cells: [
      { value: client.displayName, align: "text-left" },
      { value: client.email || "N/A", align: "text-left" },
      { value: client.phone || "N/A", align: "text-left" },
      {
        value: (
          <div className="flex justify-end">
            <button className="text-blue-500 hover:text-blue-700">Edit</button>
          </div>
        ),
        align: "text-left",
      },
    ],
  }));

  return (
    <>
      <div className="mx-4 md:mx-6 my-4 p-2 rounded-md shadow-sm border-l-4 border-blue-500 bg-blue-50 flex justify-between items-center">
        <div className="order-first font-bold">Your clients ({count})</div>
        <InsertClientModal action={createNewClient} />
      </div>

      {count === 0 ? (
        <p className="mx-4 md:mx-6 my-2 p-2 text-xl font-bold bg-yellow-50 border-yellow-500 text-yellow-800 rounded-md text-center shadow-sm">
          No Clients Found
        </p>
      ) : (
        <div className="shadow-sm rounded-lg overflow-hidden mx-2 md:mx-6">
          <CustomTable
            upperCaseHeader={true}
            headerBold={true}
            headers={headers}
            rows={bodyChildren}
            enablePagination={true}
            totalCount={count}
          ></CustomTable>
        </div>
      )}
    </>
  );
}
