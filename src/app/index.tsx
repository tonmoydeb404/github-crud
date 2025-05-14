import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

type Props = {};

const App = (props: Props) => {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center">
      <SignedOut>
        <Button asChild>
          <SignInButton />
        </Button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </main>
  );
};

export default App;
