import { SearchForm } from "@/components/forms";
import { PageHeader, PageLayout, PageTitle } from "@/components/page-layout";

export default function Loading() {
  return (
    <PageLayout className="space-y-0">
      <PageHeader className="mb-3">
        <PageTitle>Search</PageTitle>
      </PageHeader>
      <SearchForm />
    </PageLayout>
  );
}
