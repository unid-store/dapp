// @NOTE remove vercel analytics if migrated
import { Analytics } from "@vercel/analytics/react";

import { Upload } from "@/components/upload/Upload";

const Home = () => (
  <>
    <Upload />
    <Analytics />
  </>
);

export default Home;
