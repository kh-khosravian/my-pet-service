import { PrismaClient, Client, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getClientById = async (id: string): Promise<Client | null> => {
  try {
    const client = await prisma.client.findUnique({ where: { id } });
    if (!client) return null;
    // Directly return the client object as it matches the type
    return client;
  } catch (error) {
    console.error("Error fetching client:", error);
    throw new Error("Could not fetch client");
  }
};

export const getClients = async (
  filter: clientFilter
): Promise<{ clients: Client[]; count: number }> => {
  try {
    const count = await prisma.client.count({
      where: filter.where,
    });
    if (count === 0) {
      return { clients: [], count: 0 };
    }

    const clients = await prisma.client.findMany({
      skip: filter.skip,
      take: filter.take,
      orderBy: filter.orderBy,
      where: filter.where,
    });
    // Directly return the clients array as it matches the type
    return { clients, count };
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error("Could not fetch clients");
  }
};

export const createClient = async (
  data: Prisma.ClientCreateInput
): Promise<Client | undefined> => {
  try {
    return prisma.client.create({
      data,
    });
  } catch (error) {
    console.error("Error creating client:", error);
    return undefined; // Return undefined as per the original code
  }
};

export const updateClient = async (
  id: string,
  data: Prisma.ClientUpdateInput
): Promise<Client | undefined> => {
  try {
    return prisma.client.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error("Error updating client:", error);
    return undefined; // Return undefined as per the original code
  }
};

export interface clientFilter {
  skip?: number;
  take?: number;
  orderBy?: Prisma.ClientOrderByWithRelationInput;
  where?: Prisma.ClientWhereInput;
}
