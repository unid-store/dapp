import { WithToast } from "@/components/feedback/WithToast";
import { Button } from "@/components/ui/Button";

export const ConnectButton = () => (
  <WithToast
    title={"Not implemented yet"}
    subtitle={"Stay tuned as we implement walletconnect v2 soon!"}
  >
    <Button className="w-auto h-auto p-2">Connect 🔗</Button>
  </WithToast>
);
