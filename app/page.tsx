// @NOTE remove vercel analytics if migrated
import { Analytics } from "@vercel/analytics/react";

import { Upload } from "@/components/upload/Upload";
import { ServiceProviderOpts } from "@/components/options/ServiceProviderOpts";

const Home = () => (
  <>
    <Upload />
    <ServiceProviderOpts />
    <Analytics />
  </>
);

export default Home;
