import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const [adminRole] = await Promise.all([
    prisma.role.upsert({
      where: { name: "user" },
      update: {},
      create: { name: "user" },
    }),
    prisma.role.upsert({
      where: { name: "admin" },
      update: {},
      create: { name: "admin" },
    }),
  ]);

  const adminPermissions = ["list_users", "create_user"];

  for (const action of adminPermissions) {
    await prisma.permission.upsert({
      where: {
        roleId_action: {
          roleId: adminRole.id,
          action,
        },
      },
      update: {},
      create: {
        action,
        roleId: adminRole.id,
      },
    });
  }

  console.log("Roles e permissões básicas criadas com sucesso.");
}

main()
  .catch((e) => {
    console.error("Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
