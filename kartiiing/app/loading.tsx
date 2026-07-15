import { PageWrapper } from "@/components/shared/PageWrapper";
import { Loader } from "@/components/shared/Loader";

export default function AppLoading() {
  return (
    <PageWrapper>
      <div className="mt-12">
        <Loader />
      </div>
    </PageWrapper>
  );
}
