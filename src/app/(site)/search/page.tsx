import { PageHeader, PageLayout, PageTitle } from "@/components/page-layout";
import { SearchForm } from "@/components/forms";

import { getSearchItems } from "@/services/search.service";
import { SearchItems } from "@/components/pages/search";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: Props) {
  const searchQuery = searchParams.q ?? "";

  const searchResult = await getSearchItems(searchQuery);

  return (
    <PageLayout className="space-y-0">
      <PageHeader className="mb-3">
        <PageTitle>Search</PageTitle>
      </PageHeader>
      <SearchForm />
      <div className="pt-3 2xl:pt-5">
        <ScrollArea className="md:h-[270px] lg:h-[370px] 2xl:h-[540px]">
          <SearchItems items={searchResult} />
        </ScrollArea>
      </div>
    </PageLayout>
  );
}
