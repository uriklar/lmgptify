import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Page({ params }: { params: { slug: string } }) {
  const res = await prisma.search.findFirst({
    where: { slug: params.slug },
  });

  if (!res) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <h1 className="">{res.prompt}</h1>
      <p className="">{res.answer}</p>
    </div>
  );
}
