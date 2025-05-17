"use client";

import CreateForm from "./create-form";
import RepoList from "./repositories";

type Props = {};

const AppView = (props: Props) => {
  return (
    <div>
      <CreateForm />
      <RepoList />
    </div>
  );
};

export default AppView;
