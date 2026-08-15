import { locationQuerySchema, searchLocations } from "@/lib/locations/search";

export const runtime = "nodejs";

function contextFor(result: ReturnType<typeof searchLocations>[number]) {
  return [result.parent, result.municipality, result.district, result.province]
    .filter((value): value is string => Boolean(value))
    .filter((value, index, values) => values.indexOf(value) === index)
    .join(" · ");
}

export function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q") ?? "";
  const parsedQuery = locationQuerySchema.safeParse(query);

  if (!parsedQuery.success) {
    return Response.json(
      { suggestions: [], error: parsedQuery.error.issues[0]?.message },
      {
        status: 400,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }

  const suggestions = searchLocations(parsedQuery.data, 8).map((result) => ({
    id: result.id,
    name: result.name,
    typeLabel: result.typeLabel,
    context: contextFor(result),
    href: `/properties?q=${encodeURIComponent(result.name)}`,
  }));

  return Response.json(
    { suggestions },
    {
      headers: {
        "Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
      },
    },
  );
}
