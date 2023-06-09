import { WithToast } from "@/components/feedback/WithToast";
import { Button } from "@/components/ui/Button";

export const ConnectButton = () => (
  <WithToast
    title={"Not implemented yet"}
    subtitle={"Stay tuned as we implement walletconnect v2 soon!"}
  >
    <Button variant={"default"}>Connect 🔗</Button>
  </WithToast>
);
